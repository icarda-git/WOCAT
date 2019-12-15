

import { Client } from 'elasticsearch'
import { Queue } from 'bull'
import { Request, RequestAPI, CoreOptions, RequiredUriUrl, Response } from 'request'
import { Harvester } from '../../interfaces';
import * as config from '../../../../config/index.json';
import * as mappings from '../../../../config/mapping.json';
let mapto: any = mappings;
const request = <RequestAPI<Request, CoreOptions, RequiredUriUrl>>require('request');
import Bull from 'bull'
import * as _ from 'underscore'
const ISO = require('iso-3166-1')
const langISO = require('iso-639-1')
var regions = require('country-data').regions;
var lookup = require('country-data').lookup;
var moment = require('moment');
export class common implements Harvester {
    repo: any
    url = ''
    esClient: Client;
    repeatJobs: Queue;
    fetchQueue: Queue;
    indexQueue: Queue;
    fetchJobTitle: string = "Fetch Data"
    indexJobTitle: string = "Index Data"
    attempts: number = 0;
    apikey = "2176c299d31d4f9edfa2540ce7164221858394b8"
    constructor(repo: any) {
        this.repo = repo;
        this.fetchJobTitle += " from " + this.repo.name
        this.indexJobTitle += " from " + this.repo.name
        this.fetchQueue = new Bull(this.repo.name + '_fetch', {
            limiter: {
                max: 100,
                duration: 9000
            },
            settings: {
                retryProcessDelay: 10000
            },
            redis: config.redis
        });
        this.indexQueue = new Bull(this.repo.name + '_index', { redis: config.redis });

        this.repeatJobs = new Bull(this.repo.name + '_repeat', { redis: config.redis });

        this.esClient = new Client(this.conf());

        this.url = this.repo.itemsEndPoint + this.repo.code;
    }

    conf() {
        return { host: config.elasticsearch.host }
    }
    fetch = (job: any, done: any) => {
        job.progress(20);
        let url = job.data.url
        request({
            headers: { "Authorization": `Token ${this.apikey}` },
            url,
            method: "GET",

        }, (error, response, body) => {
            job.progress(50);
            if (!error) {
                if (response.statusCode == 200) {
                    let data: any = JSON.parse(body)
                    if (data.next)
                        done(null, data.next);
                    if (data.results.length == 0) {
                        let error = new Error('no data exist on page ' + job.data.page + ' and offset ');
                        error.name = "NoData"
                        done(error);
                    }
                    else {
                        data.results.forEach((element: any) => {
                            this.indexQueue.add(this.indexJobTitle, { data: element })
                        });
                        this.fetchQueue.add(this.fetchJobTitle, { url: data.next }, { attempts: this.attempts })
                        job.progress(100);
                        done();
                    }
                } else {
                    let error = new Error('something wrong happened')
                    error.stack = <any>JSON.stringify(response.toJSON());
                    done(error);
                }
            }
            else
                done(error);
        });
    }


    index = (job: any, done: any) => {
        job.progress(20);


        let finaldata: Array<any> = [];

        request({
            headers: { "Authorization": `Token ${this.apikey}` },
            url: this.repo.itemsEndPoint + job.data.data.code,
            method: "GET",

        }, (error, response, body) => {
            job.progress(50);
            if (!error) {
                if (response.statusCode == 200) {
                    let data: any = JSON.parse(body)
                    let formated = this.format(data, job.data.data.code);
                    finaldata.push({ index: { _index: config.temp_index, _type: config.index_type, _id: job.data.data.code } });
                    finaldata.push(formated);
                    this.esClient.bulk({
                        refresh: 'wait_for',
                        body: finaldata
                    }, (err: Error, resp: any) => {
                        job.progress(90);
                        if (err)
                            done(err)
                        resp.items.forEach((item: any) => {
                            if (item.index.status != 200 && item.index.status != 201) {
                                let error = new Error('error update or create item ' + item.index._id);
                                error.stack = JSON.stringify(item);
                                console.log(item)
                            }
                        })
                        job.progress(100);
                        done(null, resp.items)

                    })

                }
            } else
                done(error)

        });

    }

    format(jsonData: any, code: string) {

        let finalObj: any = {}
        finalObj['id'] = code;

        finalObj['slm_type'] = code.split('_')[0]
        this.traverse(jsonData, (obj: any, key: any, val: any) => {
            if (key == "value" && val && val[0] && obj.label && obj.label != 'Select category(ies) / code(s)') {
                if (val[0].key && val[0].values) {
                    finalObj[val[0].key] = val[0].values
                }


                if (Array.isArray(val)) {
                    val.forEach(element => {
                        if (element.key && element.value) {
                            if (finalObj[element.key] && !Array.isArray(finalObj[element.key]))
                                finalObj[element.key] = [finalObj[element.key]]
                            if (Array.isArray(finalObj[element.key])) {
                                if (finalObj[element.key].indexOf(element.value) === -1 && element.value)
                                    finalObj[element.key].push(element.value)
                            } else
                                finalObj[element.key] = element.value
                        }

                    });
                }
            }

            // if (key == "value" && val && val[0] && obj.label && obj.label == 'Select category(ies) / code(s)') {
            //     if (val[0].key && val[0].values && !finalObj['clean_' + val[0].key]) {
            //         finalObj['clean_' + val[0].key] = val[0].values
            //     }
            //     else if (val[0].key && val[0].values && finalObj['clean_' + val[0].key])
            //         finalObj['clean_' + val[0].key] = [...finalObj['clean_' + val[0].key], ...val[0].values]

            // }

            if (key == "user_id" && val && val.value) {

                finalObj['SLM specialist'] = []
                val.value.forEach((element: any) => {
                    if (element.value)
                        finalObj['SLM specialist'].push(element.value)
                });


            }
            if (key == "location_map") {

                finalObj['map_points'] = [];
                if (val.value[0] && val.value[0].value)
                    JSON.parse(val.value[0].value).features.forEach((element: any) => {
                        finalObj['map_points'].push(element.geometry.coordinates[0] + ',' + element.geometry.coordinates[1] + ',' + finalObj.id + ',' + finalObj.Name.replace(",", ""))
                    });
            }
            if (key == 'date_documentation') {
                if (val.value && val.value[0] && val.value[0].value)
                    if (moment(val.value[0].value).isValid())
                        finalObj['date_documentation'] = moment(val.value[0].value).format("YYYY-MM-DD")
            }

            if (key == 'qg_location') {
                finalObj['Country'] = [];
                finalObj['regions'] = [];

                val.children.country.value.forEach((element: any) => {
                    finalObj['Country'].push(element.value);
                });
                let countries = finalObj['Country'].filter((element: any) => finalObj['Country'].indexOf(element) != -1)
                countries.forEach((country: string) => {
                    let result = lookup.countries({ name: country })[0];
                    if (result && result.alpha2) {
                        let region: any = Object.values(regions).filter((regions: any) => regions.countries.indexOf(result.alpha2) >= 0)[0]
                        finalObj['regions'].push(region.name)
                    } else
                        console.log(country)

                });


            }
        })
        if (finalObj['slm_type'] != 'approaches' && finalObj['First name(s)'] && finalObj['Lastname / surname'])
            finalObj['SLM specialist'].push(finalObj['First name(s)'] + finalObj['Lastname / surname'])

        if (finalObj['Land use type'])
            finalObj['Land use type'] = finalObj['Land use type'].map((element: any) => element[0])

        if (finalObj['SLM measures'])
            finalObj['SLM measures'] = finalObj['SLM measures'].map((element: any) => element[0])

        if (finalObj['Degradation type'])
            finalObj['Degradation type'] = finalObj['Degradation type'].map((element: any) => element[0])




        return finalObj;
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1);
    }

    mapIsoToLang = (value: string) => langISO.validate(value) ? langISO.getName(value) : value
    mapIsoToCountry = (value: string) => ISO.whereAlpha2(value) ? ISO.whereAlpha2(value).country : this.capitalizeFirstLetter(value)


    mapIt(value: any, addOn = null): string {

        value = addOn == "country" ? this.mapIsoToCountry(value) : value
        value = addOn == "language" ? this.mapIsoToLang(value) : value

        return mapto[value] ? mapto[value] : value
    }
    getArrayOrValue(values: Array<any>) {
        if (values.length > 1)
            return values
        else
            return values[0]
    }

    async traverse(o: any, fn: (obj: any, prop: string, value: any) => void) {
        for (const i in o) {
            fn.apply(this, [o, i, o[i]]);
            if (o[i] !== null && typeof (o[i]) === 'object') {
                this.traverse(o[i], fn);
            }
        }
    }

}
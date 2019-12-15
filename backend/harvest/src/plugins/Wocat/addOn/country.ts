import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())

import * as _ from 'underscore'

const ISO = require('iso-3166-1')
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const mapIsoToCountry = (langArr: Array<any>) => langArr.map((lang: string) => {
    return lang.length == 2 && ISO.whereAlpha2(lang)  ? ISO.whereAlpha2(lang).country : capitalizeFirstLetter(lang)
}
)

let country = "country"
let finallcountryArray: Array<any> = []
function clear(value: string) {
    finallcountryArray.push(value.toLowerCase());
}


export function fixCountries() {
    return new Promise((resolve, reject) => {
        let allRecords = []
        // first we do a search, and specify a scroll timeout
        es_client.search({
            index: config.temp_index,
            type: config.index_type,
            scroll: '1m',
            body: {
                size: 100,
                _source: country,
                sort: [
                    { "_id": "desc" }
                ],
                query: {
                    exists: {
                        "field": country + ".keyword"
                    }
                }
            }
        }, function getMoreUntilDone(error: Error, response: any) {
            if (error)
                reject(error)
            let finaldata: Array<any> = [];
            // collect all the records
            response.hits.hits.forEach((doc: any) => {
                finallcountryArray = [];
                allRecords.push(doc);
                let mappedLang
                if (_.isArray(doc._source[country]) && doc._source[country].length > 0)
                    doc._source[country].forEach((element: any) => {
                        clear(element);
                    });
                else if (typeof doc._source[country] == 'string')
                    clear(doc._source[country])
                else
                    return;
                mappedLang = mapIsoToCountry(finallcountryArray);
                let obj: any = {}
                obj[country] = mappedLang
                finaldata.push(
                    { "update": { "_id": doc._id, "_type": config.index_type, "_index": config.temp_index } }
                )
                finaldata.push({ "doc": obj })

            })
            es_client.bulk({
                refresh: 'wait_for',
                body: finaldata
            }).then((data) => {
                if (response.hits.total !== allRecords.length) {
                    // now we can call scroll over and over
                    es_client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '1m'
                    }, getMoreUntilDone);
                } else {
                    resolve('All countries done ' + allRecords.length);
                }
            }).catch((e: Error) => {
                console.log(`Failed while updating document with formatted country, `, e.message)
                if (response.hits.total !== allRecords.length) {
                    // now we can call scroll over and over
                    es_client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '1m'
                    }, getMoreUntilDone);
                } else {
                    resolve('All countries done ' + allRecords.length);
                }
            })

        });

    })

}
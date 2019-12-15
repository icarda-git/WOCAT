import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';

function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())

import * as _ from 'underscore'
function replaceAll(target: string, search: string, replacement: string) {
    return target.split(search).join(replacement); //target.replace(new RegExp(search, 'g'), replacement);
}
const ISO = require('iso-639-1')
const mapIsoToLang = (langArr: Array<any>) => langArr.map(lang => ISO.validate(lang) ? ISO.getName(lang) : lang)
let language = "language"
export function fixLanguage() {
    return new Promise((resolve, reject) => {
        let allRecords = []
        let finallangArray: Array<any> = []
        function clear(value: string) {
            var temp = replaceAll(value, ' ', '')
            temp = replaceAll(temp, ',', '**')
            temp = replaceAll(temp, '|', '**')
            var tempArray = temp.split('**');
            tempArray.forEach(element => {
                finallangArray.push(element);
            });
        }
        // first we do a search, and specify a scroll timeout
        es_client.search({
            index: config.final_index,
            type: config.index_type,
            scroll: '1m',
            body: {
                size: 100,
                _source: language,
                sort: [
                    { "_id": "desc" }
                ],
                query: {
                    exists: {
                        "field": language + ".keyword"
                    }
                }
            }
        }, function getMoreUntilDone(error: Error, response: any) {
            if (error)
                throw error
            let finaldata: Array<any> = [];
            // collect all the records
            response.hits.hits.forEach((doc: any) => {
                finallangArray = [];
                allRecords.push(doc);
                let mappedLang
                if (_.isArray(doc._source[language]) && doc._source[language].length > 0)
                    doc._source[language].forEach((element: any) => {
                        clear(element);
                    });
                else if (typeof doc._source[language] == 'string')
                    clear(doc._source[language])
                else
                    return;
                mappedLang = mapIsoToLang(finallangArray);
                let obj: any = {}
                obj[language] = mappedLang
                finaldata.push(
                    { "update": { "_id": doc._id, "_type": config.index_type, "_index": config.final_index } }
                )
                finaldata.push({ "doc": obj })
            })
            es_client.bulk({
                refresh: false,
                body: finaldata
            }).then(() => {
                if (response.hits.total !== allRecords.length) {
                    // now we can call scroll over and over
                    es_client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '1m'
                    }, getMoreUntilDone);
                } else {
                    resolve('All languages done ' + allRecords.length);
                }
            }).catch((e: Error) => {
                console.log(`Failed while updating document with formatted language, `, e.message)
                if (response.hits.total !== allRecords.length) {
                    // now we can call scroll over and over
                    es_client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '1m'
                    }, getMoreUntilDone);
                } else {
                    resolve('All languages done ' + allRecords.length);
                }
            })
        });
    });
}


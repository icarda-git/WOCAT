let Client = require('node-rest-client').Client;

let client = new Client();
import { Client as elasticsearch, SearchResponse } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())

import { AddOn } from './AddOn'


export class Altmetric extends AddOn {
    jobName: string = 'Altmetric'
    handlesIds: any;
    constructor() {
        super();
    }

    init(prefix: string) {
        console.log("init Altmetric " + prefix)
        this.generateCache().then((d) => {
            this.handlesIds = d
            this.queue.add(this.jobName, { page: 1, prefix }).then(() => {
            }).catch(e => console.log(e));
        })
    }



    index = (job: any, done: any) => {
        let prefix = job.data.prefix;
        let page = job.data.page;
        job.progress(20);
        let Allindexing: Array<any> = []
        client.get("https://api.altmetric.com/v1/citations/at?num_results=100&handle_prefix=" + prefix + "&page=" + page, (data: any) => {
            if (data.results) {
                data.results.forEach((element: any) => {
                    let altmetric = {
                        score: element.score,
                        readers: element.readers_count,
                        mentions: element.cited_by_accounts_count
                    }
                    if (this.handlesIds[element.handle]) {
                        Allindexing.push({ update: { _index: config.final_index, _type: config.index_type, _id: this.handlesIds[element.handle] } });
                        Allindexing.push({ "doc": { altmetric } });
                    }
                });
                job.progress(80);
                es_client.bulk({
                    refresh: 'wait_for',
                    body: Allindexing
                }).then((currentResult: any) => {
                    if (page < Math.ceil(parseInt(data.query.total) / 100))
                        this.queue.add(this.jobName, { page: page + 1, prefix }).then(() => {
                            job.progress(100);
                            done(null, currentResult.items)
                        }).catch(e => done(e));
                    else {
                        job.progress(100);
                        done(null, "Data Finished")
                    }
                }).catch((e: any) => {
                    this.queue.add(this.jobName, { page: page + 1, prefix }).then(() => {
                        done(e);
                    }).catch(e => done(e));

                })
            }
        });
    }

    generateCache() {
        return new Promise((resolve, reject) => {
            let allRecords: any = [];
            let total = 0;

            let elastic_data = {
                index: config.final_index,
                type: config.index_type,
                body: {
                    size: 500,
                    _source: ["handle"],
                    query: {
                        "exists": { "field": "handle" }
                    }
                },
                scroll: '10m'
            };

            es_client.search(elastic_data, function getMoreUntilDone(error, response: SearchResponse<any>) {
                if (error == null) {
                    let handleID = response.hits.hits.map((d: any) => {

                        if (d._source.handle) {
                            let obj: any = {};
                            obj[d._source.handle] = d._id
                            return obj
                        }

                    })
                    allRecords = [...allRecords, ...handleID];
                    if (total === 0) {
                        total = response.hits.total;
                    }
                    if (response.hits.total !== allRecords.length) {
                        es_client.scroll({
                            scrollId: <string>response._scroll_id,
                            scroll: '10m'
                        }, getMoreUntilDone);
                    } else {
                        let finalobj: any = {};
                        allRecords.forEach((element: any) => {
                            finalobj[Object.keys(element)[0]] = Object.values(element)[0]
                        });

                        resolve(finalobj)
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

}
import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
import { AddOn } from './AddOn';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())

const nodeClient = require('node-rest-client');
const Client = new nodeClient.Client();

export class DownloadsAndViews extends AddOn {
    jobName: string = "Downloads and Views"
    constructor() {
        super();
    }

    init(link:string) {
        console.log("init DownloadsAndViews "+link)
        this.queue.add(this.jobName, { page: 1, link }).then(() => {
        }).catch(e => console.log(e));
    }


    index = (job: any, done: any) => {
        let link = job.data.link;
        let page = job.data.page;
        job.progress(20);
        const cgspacenumbersUrl = link + '/rest/statistics/items';
        const limit = 100;
        let toUpdateIndexes: Array<any> = [];
        Client.get(`${cgspacenumbersUrl}?page=${page}&limit=${limit}`, (stats: any) => {
            if (stats.statistics && stats.statistics.length > 0) {
                stats.statistics.forEach((stat: any) => {
                    const numbers = {
                        views: parseInt(stat.views),
                        downloads: parseInt(stat.downloads),
                        score: parseInt(stat.views) + parseInt(stat.downloads)
                    };

                    //TODO: CGSPACE_ must change 
                    toUpdateIndexes.push({ update: { _index: config.final_index, _type: config.index_type, _id: "CGSPACE_" + stat.id } });
                    toUpdateIndexes.push({ "doc": { numbers } })
                });
                es_client.bulk({
                    refresh: 'wait_for',
                    body: toUpdateIndexes
                }).then((currentResult: any) => {
                    this.queue.add(this.jobName, { page: page + 1, link }).then(() => {
                        done(null, currentResult.items)
                    }).catch(e => done(e));
                }).catch((e: any) => {
                    this.queue.add(this.jobName, { page: page + 1, link }).then(() => {
                        done(e)
                    }).catch(e => done(e));
                })
            }
            else {
                done(null, "Done updating downloads and views");
            }
        });

    }

}

import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
import { AddOn } from './AddOn';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())

const NodeClient = require('node-rest-client')
const nodeClient = new NodeClient.Client();

const melnumbersUrl = 'https://mel.cgiar.org/dspace/getdspaceitemsvisits/dspace_item_ids/'
export class DownloadsAndViewsMEL extends AddOn {
    jobName: string = "Downloads and Views MEL"
    constructor() {
        super();
    }
    init() {

console.log("init DownloadsAndViewsMEL")

        es_client.search({
            index: config.final_index,
            scroll: '5m',
            body: { size: 100, query: { match: { 'repo.keyword': 'MELSPACE' } } }
        }).then(async (melInitBatch: any) => {
            const scrollId = melInitBatch._scroll_id
            const batch = await this.getNextBatch(scrollId)
            this.queue.add(this.jobName, { publicationsToUpdate: batch.hits.hits, scrollId: scrollId }).then(() => {
            }).catch(e => console.log(e));
        })
    }

    index = (job: any, done: any) => {
        let publicationsToUpdate = job.data.publicationsToUpdate;
        let scrollId = job.data.scrollId;
        try {
           // console.dir(publicationsToUpdate);
            const statRequest = nodeClient.get(
                melnumbersUrl + publicationsToUpdate.map((p: any) => p._source.id).join(','),
                { headers: { 'Content-Type': 'application/json' }, timeout: 120000 },
                (stats: any) => {
                    let finaldata: Array<any> = [];
                    if (stats && stats.data && stats.data.length > 0)
                        stats.data.forEach((stat: any) => {
                            let dspace_id = publicationsToUpdate.find((p: any) => p._source.id == stat.dspace_item_id)._id;

                            if (dspace_id) {
                                finaldata.push(
                                    { "update": { "_id": dspace_id, "_type": config.index_type, "_index": config.final_index } }
                                )
                                finaldata.push({ "doc": { numbers: { views: parseInt(stat.views), downloads: parseInt(stat.downloads), score: parseInt(stat.views) + parseInt(stat.downloads) } } })

                            } else {
                                //console.log('could not map item ID: ' + stat.dspace_item_id)
                            }
                        })


                    es_client.bulk({
                        refresh: 'wait_for',
                        body: finaldata
                    }).then(async (result) => {
                        const batch = await this.getNextBatch(scrollId)
                        if (batch.hits.hits.length === 0) {
                            done(null, "data finish")
                        } else
                            this.queue.add(this.jobName, { publicationsToUpdate: batch.hits.hits, scrollId }).then(() => {
                                done(null, result.items)
                            }).catch(e => done(e));
                    }).catch(async (err: Error) => {
                        const batch = await this.getNextBatch(scrollId)
                        this.queue.add(this.jobName, { publicationsToUpdate: batch.hits.hits, scrollId }).then(() => {
                            done(err)
                        }).catch(e => done(e));
                    });
                })
            statRequest.on('error', (err: Error) => done(err))
        } catch (err) {
            done(err)
        }

    }

    getNextBatch = (scrollId: string) => es_client.scroll({ scroll: '5m', scrollId })


}

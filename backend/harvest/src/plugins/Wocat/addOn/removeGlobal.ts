import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())
/**
 * This script changes all instances of "Global" region to be null. See issue #60
 */


export function removeGlobal() {
    return new Promise((resolve, reject) => {
        es_client.updateByQuery({
            index: config.final_index,
            type: config.index_type,
            waitForCompletion: true,
            conflicts: "proceed",
            body: {
                query: {
                    bool: {
                        must: [
                            { match: { 'region.keyword': 'Global' } }
                        ]
                    }
                },
                script: {
                    source: "ctx._source.region = null"
                }
            }
        })
            .then(() => resolve('Done updating "Global" region to null.'))
            .catch(err => { console.log('Error while updating "Global" region to null'); reject(err); })

    })

}
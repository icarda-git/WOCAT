import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())
/**
 * This script changes all instances of "Global" region to be null. See issue #60
 */


export function removeSponsorship() {
    return new Promise((resolve, reject) => {

        es_client.updateByQuery({
            index: config.final_index,
            type: config.index_type,
            waitForCompletion: true,
            conflicts: "proceed",
            body: {
                "script": {
                    "source": "ctx._source.sponsorship = null"
                },
                "query": {
                    "match": { "sponsorship": "Not Applicable" }
                }
            }
        })
            .then(() => resolve('Done updating "Not Applicable"  to null.'))
            .catch(err => { console.log('Error while updating "Not Applicable to null'); reject(err); })

    })

}
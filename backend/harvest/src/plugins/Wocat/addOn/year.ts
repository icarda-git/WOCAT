import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())
/**
 * This script changes all instances of "Global" region to be null. See issue #60
 */


export function year() {
    return new Promise((resolve, reject) => {
        es_client.updateByQuery({
            index: config.temp_index,
            type: config.index_type,
            refresh:true,
            waitForCompletion: true,
            body: {
                query: {
                    exists: {
                        "field": "date"
                    }
                },
                script: {
                    source: `ctx._source.year = ctx._source.date.substring(0,4);`
                }
            }
        })
            .then(() => resolve('Done updating "years".'))
            .catch((err:Error) => reject(err.message))

    })

}

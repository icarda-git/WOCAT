import { Client as elasticsearch } from 'elasticsearch'
import * as config from '../../../../../config/index.json';
function cnf() {
    return { host: config.elasticsearch.host };
}
const es_client = new elasticsearch(cnf())
/**
 * This script changes all instances of "Global" region to be null. See issue #60
 */


export function fixDate() {
    return new Promise((resolve, reject) => {
        es_client.updateByQuery({
            index: config.temp_index,
            type: config.index_type,
            refresh: true,
            waitForCompletion: true,
            body: {
                query: {
                    exists: {
                        "field": "date"
                    }
                },
                script: {
                    source: `if(ctx._source.date.length() == 4){ ctx._source.date = ctx._source.date + "-01-01"  }else if(ctx._source.date.length() == 7){ ctx._source.date = ctx._source.date + "-01"  }`
                }
            }
        })
            .then(() => resolve('Done fixing "date".'))
            .catch((err: Error) => reject(err))

    })

}

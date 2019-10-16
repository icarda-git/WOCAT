
import { Client } from 'elasticsearch';
import * as config from '../../config/index.json'

function cnf() {
    return { host: config.elasticsearch.host, requestTimeout: 100000 };
}
const es_client = new Client(cnf())

/*
    This script moves all indexed items from the index "items-temp" to config.final_index.
    In the process, the "items" alias will point to "items-temp", and when the re-indexing is done, 
    "items" will point back to config.final_index.
*/

function connect(resolve: any, reject: any) {
    es_client.ping({
        maxRetries: 50,
        // ping usually has a 3000ms timeout
        requestTimeout: 3000,
    }).then(async () => {

        try {
            let exitstTemp = await es_client.indices.exists({ index: config.final_index }).catch(e => false)
            if (!exitstTemp) {
                await es_client.indices.create({ index: config.final_index })
                console.log("created index final")
            }

            let existFinal = await es_client.indices.exists({ index: "items-temp" }).catch(e => false)
            if (!existFinal) {
                await es_client.indices.create({ index: "items-temp" })
                console.log("created index temp")
            }
            resolve(true)
        } catch (e) {
            reject(e)
        }

    }).catch((e) => {
        setTimeout(() => {
            connect(resolve, reject);
        }, 2000);

        console.log("reconnect")
    });
}

export function makeIndexesIfNotExist() {
    return new Promise((resolve, reject) => {
        connect(resolve, reject);
    });

}


export async function reindex() {
    try {
        console.log("reindex function is called")

        await es_client.indices.updateAliases({
            body: {
                actions: [
                    { remove: { index: config.final_index, alias: 'items' } },
                    { add: { index: config.temp_index, alias: 'items' } }
                ]
            }
        }).then(d => console.log("updateAliases done "))



        await es_client.indices.delete({
            index: config.final_index,
            ignoreUnavailable: true
        }).then(d => console.log("delete done "))


        await es_client.indices.create({
            index: config.final_index,

        }).then(d => console.log("create done "))


        await es_client.reindex({
            waitForCompletion: true,
            body: {
                "conflicts": "proceed",
                source: {
                    index: config.temp_index
                },
                dest: { index: config.final_index }
            }
        }).then(d => console.log("reindex done "))


        await es_client.indices.updateAliases({
            body: {
                actions: [
                    { remove: { index: config.temp_index, alias: 'items' } },
                    { add: { index: config.final_index, alias: 'items' } }
                ]
            }
        }).then(d => console.log("updateAliases done "))


        await es_client.indices.delete({
            index: config.temp_index,
            ignoreUnavailable: true
        }).then(d => console.log(" delete done "))

        await es_client.indices.create({
            index: config.temp_index,
        }).then(d => console.log("create done "))

        console.log("Index All Done ");

    } catch (e) {
        if (e.body.failures)
            console.dir(e.body.failures);
        else
            console.dir(e);
    }

}

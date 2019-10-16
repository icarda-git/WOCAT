
import * as config from '../../config/index.json'
import { plugins } from './plugins'
import cluster from 'cluster';
import { EventEmitter } from 'events';
import { reindex, makeIndexesIfNotExist } from './reindex';

if (cluster.isMaster) {
    makeIndexesIfNotExist().then(() => {
        let emmiter = new EventEmitter()
        let finishjobs: Array<any> = [];
        emmiter.on('drained', (data) => {
            finishjobs.push(data)
            console.log(finishjobs.length, "<====>", config.repositories.length)
            console.log("-----------------------------------");
            if (finishjobs.length == config.repositories.length) {
                finishjobs = [];
                console.log("All indexing finished");
                reindex();      
            }
        })
        config.repositories.forEach((repo) => {
            let job = new plugins[repo.type](repo)
            job.init();
            let timeout: any = null;
            job.indexQueue.on('global:drained', () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    console.log("global:drained");
                    emmiter.emit('drained', job.repo);
                }, 60000);
            });
        })
        const numCPUs = 1;
        // Create a worker for each CPU
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        // Listen for dying workers
        cluster.on('exit', function () {
            cluster.fork();
        });
    }).catch(e => console.log(e))
} else {
    config.repositories.forEach((repo) => {
        new plugins[repo.type](repo).process();
    });
}

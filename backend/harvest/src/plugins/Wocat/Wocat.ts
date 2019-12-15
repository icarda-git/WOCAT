
import { common } from "./common";
import * as config from '../../../../config/index.json';
import { Job, Queue } from "bull";
export class Wocat extends common {
    startPage: number = 0; // starting page 
    pipe: number = 1; // how many jobs to be added at ones 
    repeatName: string = 'Repeat indexing with Cron ' + config.cron + ' for ' + this.repo.name;
    constructor(repo: any) {
        super(repo);
    }
    init() {
        this.clean().then(() => {
        this.fetchQueue.add(this.fetchJobTitle, { url:this.url }, { attempts: this.attempts })
        });
        // this.repeatJobs.add(this.repeatName, {}, { repeat: { cron: config.cron } }).then(() => {
        //     console.log(this.repeatName);
        // }).catch(e => console.log(e));
        // console.log("init " + this.repo.name);
        // if (this.repo.startPage)
        //     this.startPage = this.repo.startPage
        // if (this.repo.allCores)
        //     this.pipe = require('os').cpus().length * 2;
        // this.repeatJobs.getDelayed().then(async (jobs) => {
        //     if (jobs.length == 0) {
        //         if (config.startOnFirstInit)
        //             this.addJobs();
        //         this.repeatJobs.add(this.repeatName, {}, { repeat: { cron: config.cron } }).then(() => {
        //             console.log(this.repeatName);
        //         }).catch(e => console.log(e));
        //     }
        // })
    }
    addJobs() {
        this.clean().then(() => {
            for (let i = 0; i < this.pipe; i++) {
                setTimeout(() => {
                    this.fetchQueue.add(this.fetchJobTitle, { page: this.startPage + i, pipe: this.pipe }, { attempts: this.attempts })
                }, 1000 * i);
            }
        })
    }

    clean() {
        let cleners: Array<Promise<any>> = [];
        cleners.push(this.fetchQueue.clean(0, 'completed'))
        cleners.push(this.fetchQueue.clean(0, 'active'))
        cleners.push(this.fetchQueue.clean(0, 'failed'))
        cleners.push(this.fetchQueue.clean(0, 'wait'))
        cleners.push(this.indexQueue.clean(0, 'completed'))
        cleners.push(this.indexQueue.clean(0, 'active'))
        cleners.push(this.indexQueue.clean(0, 'failed'))
        cleners.push(this.indexQueue.clean(0, 'wait'))
        return Promise.all(cleners)
    }
    cleanr(Q: Queue) {
        let cleners: Array<Promise<any>> = [];
        cleners.push(Q.clean(0, 'completed'))
        cleners.push(Q.clean(0, 'active'))
        cleners.push(Q.clean(0, 'failed'))
        return Promise.all(cleners)
    }
    process() {
        this.repeatJobs.process(this.repeatName, 1, (job, done) => {
            this.addJobs();
            done(null)
        })
        this.fetchQueue.process(this.fetchJobTitle, 1, this.fetch)
        this.indexQueue.process(this.indexJobTitle, 1, this.index)

    }
}
import Bull, { Queue, ProcessCallbackFunction, Job, DoneCallback } from 'bull'

import * as config from '../../../../../config/index.json';

export class AddOn {
    handlers: Array<string> = [];
    queueName: string = "addOns";
    queue: Queue;
    jobName: string = "add on job"
    index: ProcessCallbackFunction<Job> = (job: Job, done: DoneCallback) => { done() };
    constructor() {
        this.queue = new Bull(this.queueName, {
            settings:{
                drainDelay:10000,
            },
            redis: config.redis
        });
    }


    process(jobName: string, index: any) {
        if (this.handlers.indexOf(jobName) == -1) {
            this.handlers.push(jobName);
            this.queue.process(jobName, 1, index)
        }
    }
    clean() {
        let cleners: Array<Promise<any>> = [];
        cleners.push(this.queue.clean(0, 'completed'))
        cleners.push(this.queue.clean(0, 'active'))
        cleners.push(this.queue.clean(0, 'failed'))
        cleners.push(this.queue.clean(0, 'wait'))
        return Promise.all(cleners)
    }
}
import { Worker } from 'bullmq';

const redisConnection = {
  host: 'redis',
  port: 6379
};

const myWorker = new Worker(
  'conversation',
  async ({ name, data }) => {
    console.log('job name: ' + name + '; job value: ' + data.value);
  },
  { connection: redisConnection }
);

myWorker.on('completed', (job) => {
  console.log('Job \'' + job.name + '\' completed.');
});

myWorker.on('drained', () => {
  console.log('Jobs drained.');
});

myWorker.on('failed', (jobId: string, error: Error) => {
  console.error('myWorker :: ERROR; jobId = ' + jobId);
  console.error(error);
});

import express from 'express';
import { Client } from 'pg';
import { QueueScheduler, Queue } from 'bullmq';

interface IPingResponse {
  [propName: string]: string | number | undefined | null;
}

const redisConnection = {
  host: 'redis',
  port: 6379
};

// const myScheduler = new QueueScheduler('conversation', { connection: redisConnection });
const myQueue = new Queue('conversation', { connection: redisConnection });

async function addJobs(){
  await myQueue.add('myJobName 1', { value: 'bar' });
  await myQueue.add('myJobName 2', { value: 'baz' });
}

addJobs();

const PORT = process.env.PORT || 3000;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
});

const app = express();

app.get('/ping', async (req, res) => {
  const pgStatus = await client.query('SELECT 1 + 1').then(() => 'up').catch(() => 'down');
  const jobStates = ['waiting', 'active', 'completed', 'failed', 'delayed'];

  const response: IPingResponse = {
    environment: process.env.NODE_ENV,
    postgres_db: pgStatus,
    pong: 'OK'
  };

  for (let i = 0; i < jobStates.length; i += 1) {
    const state = jobStates[i];
    const status = await myQueue.getJobCounts(state);
    response[state + '_jobs'] = status[state];
  }

  res.send(response);
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log('Started at http://localhost:' + PORT);
  });
})();

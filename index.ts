import { createClient } from 'redis';
import showdown from 'showdown';
import express from 'express';
import useragent from 'express-useragent';
import requestIP from 'request-ip';
import dayjs from 'dayjs';
import crypto from 'crypto';

import { markdownSeeds } from './seeds.js';
import { log } from './utils/log.js';

const PORT = 8000;
const client = await createClient({
  url: process.env.REDIS_URL,
})
  .on('error', err => {
    console.log(err);
  })
  .connect();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(useragent.express());

app.get('/', (req, res) => {
  res.render('index', {
    referrer: req.headers.referrer || req.headers.referer,
  });
});

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  const markdown = await client.get(`post:${postId}`);

  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown ?? '');

  res.render('post', {
    postId: postId,
    referrer: req.headers.referrer || req.headers.referer,
    content: html,
  });
});

app.get('/analytics', async (req, res) => {
  const visitCount = await client.get('visitCount') ?? '0';
  const refKeys = await client.keys('ref:*');

  const refs: Array<{ url: string; count: string}> = [];

  for (let key of refKeys) {
    const url = key.split('ref:')[1] ?? '';
    const count = await client.get(key) ?? '0';

    refs.push({ url, count });
  }

  res.render('analytics', {
    visitCount,
    refs,
  });
});

// 방문 기록 api
app.get('/hit', async (req, res) => {
  const userAgent = req.useragent;

  if (userAgent && userAgent.isBot) {
    console.log('Bot traffic');
    return;
  }

  const ipAddress = requestIP.getClientIp(req);
  const today = dayjs().format('YYYY-MM-DD'); // 일 단위 체크
  // const today = dayjs().format('YYYY-MM-DDTHH:mm:ss'); // 초 단위 체크(테스트용)

  const ipHash = crypto.createHash('md5').update(`${ipAddress}-${today}`).digest('hex');
  const ref = req.query.ref ? req.query.ref.toString() : undefined;

  await log(client, ipHash, ref);
});


// 초기 데이터 세팅 용
app.get('/seeds', async (req, res) => {
  const entries = markdownSeeds.entries();
  for (let [index, seed] of entries) {
    await client.set(`post:${index + 1}`, seed);
  }

  res.send('Success');
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

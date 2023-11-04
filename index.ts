import { createClient } from 'redis';
import showdown from 'showdown';
import express from 'express';

import { markdownSeeds } from './seeds.js';

const PORT = 8000;

const client = await createClient()
  .on('error', err => {
    console.log(err);
  })
  .connect();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  const markdown = await client.get(`post:${postId}`);

  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown ?? '');

  res.render('post', {
    postId: postId,
    content: html,
  });
});

app.get('/hit', (req, res) => {
  console.log('Hello World');
});

// 초기 세팅 용
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

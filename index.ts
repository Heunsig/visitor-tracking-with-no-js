import { createClient } from 'redis';
import showdown from 'showdown';
import express from 'express';

const PORT = 8000;

const client = await createClient()
  .on('error', err => {
    console.log(err);
  })
  .connect();

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // console.log('Referrer', req.headers.referer);
  res.render('index');
});

app.get('/posts/:postId', async (req, res) => {
  const content = await client.get('post:1');

  let converter = new showdown.Converter();
  let markdown = content;
  let html = converter.makeHtml(markdown ?? '');

  res.render('post', {
    content: html,
  });
});

app.get('/hit', (req, res) => {
  console.log('Hello World');
  // res.render('index');
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

import { createClient } from 'redis';
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

app.get('/posts/:postId', (req, res) => {
  // console.log('id', req.params.postId);
  res.render('post');
});

app.get('/hit', (req, res) => {
  console.log('Hello World');
  // res.render('index');
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

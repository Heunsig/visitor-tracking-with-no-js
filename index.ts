import { createClient } from 'redis';
import express from 'express';

const PORT = 8000;

const client = await createClient()
  .on('error', err => {
    console.log(err);
  })
  .connect();

const app = express();

app.get('/', (req, res) => {
  console.log('Hello World');
  res.send('Hello From Express with TS');
});


app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

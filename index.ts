import express from 'express';

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello From Express with TS');
});


app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

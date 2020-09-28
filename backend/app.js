const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const postsRoutes = require('./routes/posts');

const env = {
  user: 'Sasha',
  pass: 'hugeM%40tch89',
  db: 'aaPersonal',
};
mongoose
  .connect(
    `mongodb+srv://${env.user}:${env.pass}@aapersonalcluster.k0bio.mongodb.net/${env.db}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log('Connected to db'))
  .catch(() => console.log('Db connection failed!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts/', postsRoutes);

module.exports = app;

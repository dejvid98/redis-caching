const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./db');
const redis = require('redis-node');
const app = express();

const client = redis.createClient();

app.use(cors());
app.use(express.json());
app.use(bodyparser());
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  // Checks to see if list of users from database is cached,
  // if yes, then it returns cached value,
  // if not, sets it into cache;
  client.hget('users', 'userlist', async (err, status) => {
    if (!status) {
      const dbResp = await db.query('SELECT * FROM USERPROFILE');
      client.hset('users', 'userlist', JSON.stringify(dbResp.rows));
      res.send(dbResp.rows);
      return;
    } else {
      res.send(JSON.parse(status));
      return;
    }
  });
});

app.get('/cache', (req, res) => {
  client.hget('users', 'userlist', (err, status) => {
    res.send(JSON.parse(status));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

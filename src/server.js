require('dotenv').config();
const express = require('express');
const app = express();
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const { publishHeartbeat } = require('./producer');

require('express-ws')(app);
const logger = require('morgan', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
});

app.use(express.json());
app.use(logger('common'));

const task = cron.schedule('*/1 * * * *', () => {
  const date = new Date();
  publishHeartbeat(`I'm alive at ${date}`);
});
task.start();

app.ws('/heartbeat', function (ws, req) {
  setInterval(() => {
    ws.send('test');
  }, 6000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { logger };

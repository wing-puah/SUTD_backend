/* eslint-disable quotes */
const enableWs = require('express-ws');

module.exports = (app) => {
  enableWs(app);

  app.ws('/ws', function (ws) {
    ws.on('message', function (msg) {
      const replies = [
        "I'm glad we hit it off well!",
        'Would you like a cup of coffee?',
        "That's interesting to hear.",
        'Nice to meet you!',
        'Have a good day!',
      ];

      const reply = replies[Math.floor(Math.random() * replies.length)];
      ws.send(reply);
    });
  });

  return app;
};

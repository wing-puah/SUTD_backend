const amqplib = require('amqplib');

const queue = 'signup';

(async () => {
  const client = await amqplib.connect('amqp://localhost:5672');
  const channel = await client.createChannel();
  await channel.assertQueue(queue);
  const message = { hello: 'world' };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    contentType: 'application/json',
  });
})();

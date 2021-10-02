const amqplib = require('amqplib');

const queue = 'signup';

(async () => {
  const client = await amqplib.connect('amqp://localhost:5672');
  const channel = await client.createChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
})();

const amqplib = require('amqplib');

const queue = 'heartbeat';

(async () => {
  try {
    const client = await amqplib.connect(process.env.CLOUDAMQP_URL);
    const channel = await client.createChannel();
    await channel.assertQueue(queue);

    channel.consume(queue, async (msg) => {
      console.log('msg', JSON.parse(msg.content));
    });
  } catch (error) {
    //
  }
})();

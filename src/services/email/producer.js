const amqplib = require('amqplib');

const queue = 'signup';

async function queueNewUserEmail(email) {
  const client = await amqplib.connect(process.env.CLOUDAMQP_URL);
  const channel = await client.createChannel();
  await channel.assertQueue(queue);
  const message = { email };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    contentType: 'application/json',
  });
}

module.exports = { queueNewUserEmail };

const amqplib = require('amqplib');

const queue = 'heartbeat';

async function publishHeartbeat(heartbeatMessage) {
  const client = await amqplib.connect(process.env.CLOUDAMQP_URL);
  const channel = await client.createChannel();
  await channel.assertQueue(queue);

  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ message: heartbeatMessage })), {
    contentType: 'application/json',
  });
}

module.exports = { publishHeartbeat };

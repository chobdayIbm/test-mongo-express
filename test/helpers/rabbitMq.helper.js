import amqp from 'amqplib';


export default class RabbitMqHelper {
  constructor() {
  }

  async start() {
    const RABBIT_MQ_URI = process.env.RABBIT_MQ_URI || 'amqp://localhost'
    this.connection = await amqp.connect(RABBIT_MQ_URI);
  }


  /**
   * Start the server and establish a connection
   */
  async setupListener(exchangeName, exchangeType, routingKey, messages) {
    try {
      const channel = await this.connection.createChannel();
      await channel.assertExchange(exchangeName, exchangeType, {durable: false})
      const queue = await channel.assertQueue('', {exclusive: true})
      const binding = await channel.bindQueue(queue.queue, exchangeName, routingKey);
      
      channel.consume(queue.queue, function(msg) {
          messages.push(JSON.parse(msg.content.toString()))
          console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
          noAck: true
      });
      return binding

    } catch(e) {
        throw e
    }
  }

  /**
   * Close the connection and stop the server
   */
  handleMessage() {
    this.connection.close();
    return this.server.stop();
  }

  /**
   * Delete all collections and indexes
   */
  async close() {
    await this.connection.close()
  }

}
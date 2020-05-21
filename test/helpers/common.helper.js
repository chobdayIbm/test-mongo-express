import MongoHelper from './mongo.helper'
import RabbitMqHelper from './rabbitMq.helper'

const mongoHelper = new MongoHelper()
const rabbitMqHelper = new RabbitMqHelper()



module.exports = {
    mongoHelper,
    rabbitMqHelper
}

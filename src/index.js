var server = require("./server");
var handlers = require("./handlers")
var database = require("./database")

var port = 9090;
var connectionString = process.env.MONGO_URI;

database.initialize(connectionString);
const serverObj = server.start(port, handlers.setupHandlers);

module.exports = serverObj
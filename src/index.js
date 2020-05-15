var server = require("./server");
var handlers = require("./handlers")
var database = require("./database")

var port = 9090;
var connectionString = "mongodb://localhost/exampleDb";

database.initialize(connectionString);
server.start(port, handlers.setupHandlers);

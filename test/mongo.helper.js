import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongooseDocument } from "mongoose";


export default class MongoHelper {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }


  /**
   * Start the server and establish a connection
   */
  async start() {
    const url = await this.server.getUri();
    process.env.MONGO_URI = url;
    console.log(`set ${process.env.MONGO_URI}`)
    this.connection = await MongoClient.connect(
      url,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    this.db = this.connection.db(await this.server.getDbName());
    return this.connection
  }

  /**
   * Close the connection and stop the server
   */
  stop() {
    this.connection.close();
    return this.server.stop();
  }

  /**
   * Delete all collections and indexes
   */
  async cleanup() {
    const collections = await this.db.listCollections().toArray();
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(collection => this.db.collection(collection).drop())
    );
  }

  /**
   * Manually insert a document into the database and return the created document
   * @param {string} collectionName
   * @param {Object} document
   */
  async createDoc(collectionName, document) {
    const { ops } = await this.db
      .collection(collectionName)
      .insertOne(document);
    return ops[0];
  }

  async list(collectionName) {
    const result = await this.db
      .collection(collectionName)
      .find();
    console.log(await result.toArray())
    return result;
  }
}
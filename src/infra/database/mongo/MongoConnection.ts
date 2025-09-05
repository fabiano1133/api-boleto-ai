import { MongoClient } from "mongodb";
import { databaseConfig } from "@/infra/config/database.config";
import { dbConnection } from "mongodb-paginate";

export class MongoConnection {
  private static instance: MongoClient;

  private constructor() {}

  public static getInstance(): MongoClient {
    const { MONGO_URI } = databaseConfig;

    if (!MongoConnection.instance) {
      const uri = MONGO_URI;

      if (!uri) {
        throw new Error("URI Mongo is not defined");
      }

      MongoConnection.instance = new MongoClient(uri);

      dbConnection.url = uri;
    }
    return MongoConnection.instance;
  }
}

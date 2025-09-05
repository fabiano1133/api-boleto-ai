import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";

export class CreateMongoDatabaseFactory {
  static async make(): Promise<MongoDatabaseAdapter> {
    const mongo = new MongoDatabaseAdapter();
    await mongo.connect();
    return mongo;
  }
}

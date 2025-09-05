import { DatabasePort } from "@/app/ports/out/DatabasePort";
import { Tenant } from "@/domain/entities/Tenant";
import { Ticket } from "@/domain/entities/Ticket";
import { Collection, MongoClient } from "mongodb";
import { MongoConnection } from "./MongoConnection";
import Customer from "@/domain/entities/Customer";

export class MongoDatabaseAdapter implements DatabasePort {
  private client: MongoClient;

  constructor() {
    this.client = MongoConnection.getInstance();
  }

  async connect(): Promise<void> {
    try {
      await this.client.db("admin").command({ ping: 1 });
      console.log("Connection to mongodb successful!🚀");
    } catch (error) {
      console.log(
        "An error occurred while trying to connect to mongo. Trying again...⏳"
      );
      await this.client.connect();
    }
  }
  getTicketCollection(): Collection<Ticket> {
    const collection = this.client.db().collection<Ticket>("tickets");
    collection.createIndex({ id: 1 }, { unique: true });
    collection.createIndex({ status: 1 });

    return collection;
  }
  getTenantCollection(): Collection<Tenant> {
    const collection = this.client.db().collection<Tenant>("tenants");
    collection.createIndex({ id: 1 }, { unique: true });
    collection.createIndex({ email: 1 }, { unique: true });

    return collection;
  }

  getCustomerCollection(): Collection<Customer> {
    const collection = this.client.db().collection<Customer>("customers");
    collection.createIndex({ id: 1 }, { unique: true });
    collection.createIndex({ cpfCnpj: 1 }, { unique: true });

    return collection;
  }
}

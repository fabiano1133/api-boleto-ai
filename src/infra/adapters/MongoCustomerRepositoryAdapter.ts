import { DatabasePort } from "@/app/ports/out/DatabasePort";
import { InsertOneResult } from "mongodb";
import { CustomerRepositoryPort } from "@/app/ports/out/CustomerRepositoryPort";
import Customer from "@/domain/entities/Customer";

export class MongoCustomerRepositoryAdapter implements CustomerRepositoryPort {
  constructor(private readonly collection: DatabasePort) {}

  async save(customer: Customer): Promise<InsertOneResult> {
    try {
      const collection = this.getCustomerCollection();

      const document = await collection.insertOne(customer);

      return document;
    } catch (error) {
      throw error;
    }
  }

  private getCustomerCollection() {
    return this.collection.getCustomerCollection();
  }
}

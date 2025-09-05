import { TenantRepositoryPort } from "@/app/ports/out/TenatRepositoryPort";
import { Tenant } from "@/domain/entities/Tenant";
import { DatabasePort } from "@/app/ports/out/DatabasePort";
import { toEntity } from "../database/mongo/mappers/toEntity";
import { InsertOneResult } from "../../../node_modules/mongodb/mongodb";

export class MongoTenantRepositoryAdapter implements TenantRepositoryPort {
  constructor(private readonly collection: DatabasePort) {}

  async save(tenant: Tenant): Promise<InsertOneResult> {
    try {
      const collection = this.getTenantCollection();

      const document = await collection.insertOne(tenant);

      return document;
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<Tenant[]> {
    try {
      const collection = this.getTenantCollection();

      const document = await collection
        .aggregate([
          {
            $lookup: {
              from: "tickets",
              localField: "id",
              foreignField: "tenantId",
              as: "tickets",
            },
          },
        ])
        .toArray();

      const doc = await toEntity(document as Tenant[]);

      return doc;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<Tenant | null> {
    try {
      const collection = this.getTenantCollection();

      const document = await collection
        .aggregate([
          {
            $match: { id },
          },
          {
            $lookup: {
              from: "tickets",
              localField: "id",
              foreignField: "tenantId",
              as: "tickets",
            },
          },
        ])
        .toArray();

      const doc = await toEntity(document as Tenant[]);

      return doc.length ? doc[0] : null;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Tenant | null> {
    try {
      const collection = this.getTenantCollection();

      const document = await collection.findOne({ email });
      return document;
    } catch (error) {
      throw error;
    }
  }

  private getTenantCollection() {
    return this.collection.getTenantCollection();
  }
}

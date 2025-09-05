import { Filter } from "@/app/ports/in/FindTicketsUseCasePort";
import { DatabasePort } from "@/app/ports/out/DatabasePort";
import { TicketRepositoryPort } from "@/app/ports/out/TicketRepositoryPort";
import { Ticket } from "@/domain/entities/Ticket";
import { InsertOneResult } from "mongodb";
import { UpdateTicketDTO } from "../presentation/http/controllers/ticket/DTOs/UpdateTicketDTO";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";
import { UpdateTicketStatusDTO } from "../presentation/http/controllers/ticket/DTOs/UpdateTicketStatusDTO";

export interface Metadata {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class MongoTicketRepositoryAdapter implements TicketRepositoryPort {
  constructor(private readonly mongoDatabase: DatabasePort) {}
  async findTickets(tenantId: string): Promise<Ticket[]> {
    try {
      const collection = this.getTicketCollection();

      const document = collection.find({ tenantId });

      return document.toArray();
    } catch (error) {
      throw error;
    }
  }

  async save(ticket: Ticket): Promise<InsertOneResult> {
    try {
      const collection = this.getTicketCollection();

      const document = await collection.insertOne(ticket);

      return document;
    } catch (error) {
      throw error;
    }
  }

  async findTicketsByStatusCron(status: PaymentStatusEnum): Promise<Ticket[]> {
    try {
      const collection = this.getTicketCollection();

      const tickets = collection.find({ status });

      return tickets.toArray();
    } catch (error) {
      throw error;
    }
  }

  async findTicketsByFilter(
    tenantId: string,
    filter: Filter
  ): Promise<{ data: Ticket[]; metadata: Metadata }> {
    try {
      const collection = this.getTicketCollection();

      const page = Number(filter.page) > 0 ? Number(filter.page) : 1;
      const limit = Number(filter.limit) > 0 ? Number(filter.limit) : 10;
      const skip = (page - 1) * limit;

      const matchStage: Record<string, any> = {
        tenantId,
      };

      if (filter?.status) {
        matchStage.status = {};

        if (filter.status) {
          matchStage.status = `${filter.status}`;
        }
      }

      const totalItems = await collection.countDocuments(matchStage);

      const document = await collection
        .aggregate([
          {
            $match: matchStage,
          },
          {
            $addFields: {
              statusPriority: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$status", "À Vencer"] }, then: 1 },
                    { case: { $eq: ["$status", "Vencido"] }, then: 2 },
                  ],
                  default: 99,
                },
              },
            },
          },
          {
            $lookup: {
              from: "tenants",
              localField: "tenantId",
              foreignField: "id",
              as: "tenant",
            },
          },
          { $unwind: "$tenant" },
          { $sort: { statusPriority: 1, expirationDate: 1 } },
          { $skip: skip },
          { $limit: limit },
        ])
        .toArray();

      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: document as Ticket[],
        metadata: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findTicketById(id: string): Promise<Ticket> {
    try {
      const collection = this.getTicketCollection();

      const ticket = collection.findOne({ id });

      return ticket as unknown as Ticket;
    } catch (error) {
      throw error;
    }
  }

  async findTicketsByStatus(
    tenantId: string,
    status: PaymentStatusEnum
  ): Promise<Ticket[]> {
    try {
      const collection = this.getTicketCollection();

      const tickets = collection.find({ tenantId, status });

      return tickets.toArray();
    } catch (error) {
      throw error;
    }
  }

  async updateTicketById(id: string, data: UpdateTicketDTO): Promise<void> {
    try {
      const collection = this.getTicketCollection();

      await collection.updateOne({ id }, { $set: data });
    } catch (error) {
      throw error;
    }
  }

  async updateStatusTicketById(
    id: string,
    data: UpdateTicketStatusDTO
  ): Promise<void> {
    try {
      const collection = this.getTicketCollection();

      await collection.findOneAndUpdate({ id }, { $set: data });
    } catch (error) {
      throw error;
    }
  }

  private getTicketCollection() {
    return this.mongoDatabase.getTicketCollection();
  }
}

// if (filter.startDate) {
//   matchStage.expirationDate.$gte = new Date(
//     `${filter.startDate}T00:00:00.000Z`
//   );
// }

// if (filter.endDate) {
//   matchStage.expirationDate.$lte = new Date(
//     `${filter.endDate}T23:59:59.999Z`
//   );
// }

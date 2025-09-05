import { Ticket } from "@/domain/entities/Ticket";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";
import { Metadata } from "@/infra/adapters/MongoTicketRepositoryAdapter";

export interface Filter {
  startDate?: Date;
  endDate?: Date;
  status?: PaymentStatusEnum;
  page?: number;
  limit?: number;
}

export interface FindTicketsUseCasePort {
  execute(
    tenantId: string,
    filter?: Filter
  ): Promise<{ data: Ticket[]; metadata: Metadata }>;
}

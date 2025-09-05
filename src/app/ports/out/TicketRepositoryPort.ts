import { Ticket } from "@/domain/entities/Ticket";
import { Filter } from "../in/FindTicketsUseCasePort";
import { Metadata } from "@/infra/adapters/MongoTicketRepositoryAdapter";
import { UpdateTicketDTO } from "@/infra/presentation/http/controllers/ticket/DTOs/UpdateTicketDTO";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";
import { UpdateTicketStatusDTO } from "@/infra/presentation/http/controllers/ticket/DTOs/UpdateTicketStatusDTO";

export interface TicketRepositoryPort {
  save(data: Ticket): Promise<any>;
  findTicketsByFilter(
    tenantId: string,
    filter?: Filter
  ): Promise<{ data: Ticket[]; metadata: Metadata }>;
  findTickets(tenantId: string): Promise<Ticket[]>;
  findTicketsByStatus(
    tenantId: string,
    status: PaymentStatusEnum
  ): Promise<Ticket[]>;
  findTicketById(id: string): Promise<Ticket>;
  updateTicketById(id: string, data: UpdateTicketDTO): Promise<void>;
  updateStatusTicketById(
    id: string,
    data: UpdateTicketStatusDTO
  ): Promise<void>;
}

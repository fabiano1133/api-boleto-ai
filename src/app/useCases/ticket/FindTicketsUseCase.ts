import { Ticket } from "@/domain/entities/Ticket";
import {
  Filter,
  FindTicketsUseCasePort,
} from "../../ports/in/FindTicketsUseCasePort";
import { TicketRepositoryPort } from "../../ports/out/TicketRepositoryPort";
import { Metadata } from "@/infra/adapters/MongoTicketRepositoryAdapter";

export class FindTicketsUseCase implements FindTicketsUseCasePort {
  constructor(private readonly ticketRepository: TicketRepositoryPort) {}
  async execute(
    tenantId: string,
    filter?: Filter
  ): Promise<{ data: Ticket[]; metadata: Metadata }> {
    return await this.ticketRepository.findTicketsByFilter(tenantId, filter);
  }
}

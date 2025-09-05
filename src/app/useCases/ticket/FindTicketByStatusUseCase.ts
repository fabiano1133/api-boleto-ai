import { Ticket } from "@/domain/entities/Ticket";
import { TicketRepositoryPort } from "../../ports/out/TicketRepositoryPort";
import { FindTicketsByStatusCasePort } from "@/app/ports/in/FindTicketsByStatusUseCasePort";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";

export class FindTicketByStatusUseCase implements FindTicketsByStatusCasePort {
  constructor(private readonly ticketRepository: TicketRepositoryPort) {}
  async execute(
    tenantId: string,
    status: PaymentStatusEnum
  ): Promise<Ticket[]> {
    return await this.ticketRepository.findTicketsByStatus(tenantId, status);
  }
}

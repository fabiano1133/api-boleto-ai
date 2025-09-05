import { UpdateTicketStatusUseCasePort } from "@/app/ports/in/UpdateTicketStatusUseCasePort";
import { TicketRepositoryPort } from "@/app/ports/out/TicketRepositoryPort";
import { Ticket } from "@/domain/entities/Ticket";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";
import { updateTicketStatus } from "@/domain/services/TicketStatusUpdate";

export class UpdateTicketStatusUseCase
  implements UpdateTicketStatusUseCasePort
{
  constructor(private readonly ticketRepository: TicketRepositoryPort) {}
  async execute(id: string, status: PaymentStatusEnum): Promise<void> {
    const ticket = await this.ticketRepository.findTicketById(id);

    const updateTicketStatusService = updateTicketStatus(ticket, status);

    return this.ticketRepository.updateStatusTicketById(
      id,
      updateTicketStatusService
    );
  }
}

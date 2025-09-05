import { UpdateTicketUseCasePort } from "@/app/ports/in/UpdateTicketUseCasePort";
import { TicketRepositoryPort } from "@/app/ports/out/TicketRepositoryPort";
import { UpdateTicketDTO } from "@/infra/presentation/http/controllers/ticket/DTOs/UpdateTicketDTO";

export class UpdateTicketUseCase implements UpdateTicketUseCasePort {
  constructor(private readonly ticketRepository: TicketRepositoryPort) {}
  async execute(id: string, data: UpdateTicketDTO): Promise<void> {
    const { title, expirationDate, status, value } = data;

    const updatedTicket = {
      title,
      status,
      value,
      expirationDate: new Date(expirationDate),
    };

    return this.ticketRepository.updateTicketById(id, updatedTicket);
  }
}

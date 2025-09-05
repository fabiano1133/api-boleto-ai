import { Ticket } from "@/domain/entities/Ticket";

export interface CreateTicketUseCasePort {
  execute(data: Ticket): Promise<Ticket>;
}

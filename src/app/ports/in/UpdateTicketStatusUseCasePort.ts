import { Ticket } from "@/domain/entities/Ticket";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";

export interface UpdateTicketStatusUseCasePort {
  execute(id: string, status: PaymentStatusEnum): Promise<void>;
}

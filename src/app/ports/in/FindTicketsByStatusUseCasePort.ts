import { Ticket } from "@/domain/entities/Ticket";
import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";

export interface FindTicketsByStatusCasePort {
  execute(tenantId: string, status: PaymentStatusEnum): Promise<Ticket[]>;
}

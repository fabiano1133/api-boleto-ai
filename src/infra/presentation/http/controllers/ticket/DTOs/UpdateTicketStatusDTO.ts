import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";

export interface UpdateTicketStatusDTO {
  status: PaymentStatusEnum;
}

import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";

export interface UpdateTicketDTO {
  title: string;
  expirationDate: Date;
  value: number;
  status: PaymentStatusEnum;
}

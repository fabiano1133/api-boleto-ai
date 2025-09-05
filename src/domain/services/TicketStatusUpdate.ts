import { Ticket } from "../entities/Ticket";
import { PaymentStatusEnum } from "../enum/PaymentStatusEnum";
import { BoletoStatusChangeNotAllowedException } from "../error/BoletoStatusChangeNotAllowedException";

export const updateTicketStatus = (
  ticket: Ticket,
  status: PaymentStatusEnum
) => {
  if (ticket.status === PaymentStatusEnum.PAID) {
    throw new BoletoStatusChangeNotAllowedException(
      "Não é permitido alterar o status de um boleto com status Pago"
    );
  }
  return {
    ...ticket,
    status,
  };
};

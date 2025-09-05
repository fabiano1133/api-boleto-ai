import { MongoTicketRepositoryAdapter } from "@/infra/adapters/MongoTicketRepositoryAdapter";
import { PaymentStatusEnum } from "../enum/PaymentStatusEnum";
import { updateTicketStatus } from "./TicketStatusUpdate";
import cron from "node-cron";

export class JobFindTicketsByStatus {
  constructor(
    private readonly mongoTicketRepository: MongoTicketRepositoryAdapter
  ) {}

  async cron(): Promise<void> {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    cron.schedule("0 0 * * *", async () => {
      const tickets = await this.mongoTicketRepository.findTicketsByStatusCron(
        PaymentStatusEnum.PENDENT
      );

      tickets.forEach(async (ticket) => {
        const expirationDate = new Date(ticket.expirationDate);
        expirationDate.setHours(0, 0, 0, 0);

        const isExpired = expirationDate < now;
        const isPending = ticket.status !== "Pago";

        if (isExpired && isPending) {
          const updateTicketStatusService = updateTicketStatus(
            ticket,
            PaymentStatusEnum.EXPIRED
          );
          await this.mongoTicketRepository.updateStatusTicketById(
            ticket.id as string,
            updateTicketStatusService
          );
          console.log(
            `Boleto(s) ${ticket.id} alterado(s) para status "Vencido".`
          );
          return;
        } else {
          console.log(`Nenhum boleto vencido`);
        }
      });
    });
  }
}

// # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

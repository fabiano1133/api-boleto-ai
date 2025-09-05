import { UpdateTicketDTO } from "@/infra/presentation/http/controllers/ticket/DTOs/UpdateTicketDTO";

export interface UpdateTicketUseCasePort {
  execute(id: string, data?: UpdateTicketDTO): Promise<void>;
}

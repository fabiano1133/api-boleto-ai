import { IController } from "../../presentation/http/protocols/IController";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { MongoTicketRepositoryAdapter } from "../../adapters/MongoTicketRepositoryAdapter";
import { FindTicketsUseCase } from "@/app/useCases/ticket/FindTicketsUseCase";
import { FindTicketsController } from "../../presentation/http/controllers/ticket/FindTicketsController";
import { UpdateTicketUseCase } from "@/app/useCases/ticket/UpdateTicketUseCase";
import { UpdateTicketController } from "../../presentation/http/controllers/ticket/UpdateTicketController";

export class UpdateTicketFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const ticketRepository = new MongoTicketRepositoryAdapter(mongoDatabase);
    const updateTicketUseCase = new UpdateTicketUseCase(ticketRepository);
    return new UpdateTicketController(updateTicketUseCase);
  }
}

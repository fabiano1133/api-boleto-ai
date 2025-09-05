import { IController } from "../../presentation/http/protocols/IController";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { MongoTicketRepositoryAdapter } from "../../adapters/MongoTicketRepositoryAdapter";
import { FindTicketsUseCase } from "@/app/useCases/ticket/FindTicketsUseCase";
import { FindTicketsController } from "../../presentation/http/controllers/ticket/FindTicketsController";

export class FindTicketsFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const ticketRepository = new MongoTicketRepositoryAdapter(mongoDatabase);
    const findTickestUseCase = new FindTicketsUseCase(ticketRepository);
    return new FindTicketsController(findTickestUseCase);
  }
}

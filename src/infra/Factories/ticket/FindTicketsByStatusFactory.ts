import { IController } from "../../presentation/http/protocols/IController";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { MongoTicketRepositoryAdapter } from "../../adapters/MongoTicketRepositoryAdapter";
import { FindTicketsUseCase } from "@/app/useCases/ticket/FindTicketsUseCase";
import { FindTicketsController } from "../../presentation/http/controllers/ticket/FindTicketsController";
import { FindTicketByStatusUseCase } from "@/app/useCases/ticket/FindTicketByStatusUseCase";
import { FindTicketsByStatusController } from "../../presentation/http/controllers/ticket/FindTicketsByStatusController";

export class FindTicketsByStatusFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const ticketRepository = new MongoTicketRepositoryAdapter(mongoDatabase);
    const findTicketsByStatusUseCase = new FindTicketByStatusUseCase(
      ticketRepository
    );
    return new FindTicketsByStatusController(findTicketsByStatusUseCase);
  }
}

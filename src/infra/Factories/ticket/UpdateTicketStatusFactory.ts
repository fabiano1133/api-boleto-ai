import { IController } from "../../presentation/http/protocols/IController";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { MongoTicketRepositoryAdapter } from "../../adapters/MongoTicketRepositoryAdapter";
import { UpdateTicketStatusUseCase } from "@/app/useCases/ticket/UpdateTicketStatusUseCase";
import { UpdateTicketStatusController } from "@/infra/presentation/http/controllers/ticket/UpdateTicketStatusController";

export class UpdateTicketStatusFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const ticketRepository = new MongoTicketRepositoryAdapter(mongoDatabase);
    const updateTicketStatusUseCase = new UpdateTicketStatusUseCase(
      ticketRepository
    );
    return new UpdateTicketStatusController(updateTicketStatusUseCase);
  }
}

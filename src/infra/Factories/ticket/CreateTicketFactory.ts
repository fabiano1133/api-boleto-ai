import { IController } from "../../presentation/http/protocols/IController";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { MongoTicketRepositoryAdapter } from "../../adapters/MongoTicketRepositoryAdapter";
import { CreateTicketController } from "../../presentation/http/controllers/ticket/CreateTicketController";
import { CreateTicketUseCase } from "@/app/useCases/ticket/CreateTicketUseCase";
import { MongoTenantRepositoryAdapter } from "@/infra/adapters/MongoTenantRepositoryAdapter";

export class CreateTicketFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const ticketRepository = new MongoTicketRepositoryAdapter(mongoDatabase);
    const tenantRepository = new MongoTenantRepositoryAdapter(mongoDatabase);
    const createTicketUseCase = new CreateTicketUseCase(
      ticketRepository,
      tenantRepository
    );
    return new CreateTicketController(createTicketUseCase);
  }
}

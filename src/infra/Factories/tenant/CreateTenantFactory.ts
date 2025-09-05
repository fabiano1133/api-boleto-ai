import { CreateTenantUseCase } from "@/app/useCases/tenant/CreateTenantUseCase";
import { CreateTenantController } from "../../presentation/http/controllers/tenant/CreateTenantController";
import { IController } from "../../presentation/http/protocols/IController";
import { MongoTenantRepositoryAdapter } from "../../adapters/MongoTenantRepositoryAdapter";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { BcryptAdapter } from "../../adapters/BcryptAdapter";

export class CreateTenantFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const tenantRepository = new MongoTenantRepositoryAdapter(mongoDatabase);
    const bcryptService = new BcryptAdapter();
    const createTenantUseCase = new CreateTenantUseCase(
      tenantRepository,
      bcryptService
    );
    return new CreateTenantController(createTenantUseCase);
  }
}

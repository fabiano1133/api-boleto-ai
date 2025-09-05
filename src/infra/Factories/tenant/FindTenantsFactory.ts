import { IController } from "../../presentation/http/protocols/IController";
import { MongoTenantRepositoryAdapter } from "../../adapters/MongoTenantRepositoryAdapter";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { FindTenantsUseCase } from "@/app/useCases/tenant/FindTenantsUseCase";
import { FindTenantsController } from "../../presentation/http/controllers/tenant/FindTenantsController";

export class FindTenantsFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const tenantRepository = new MongoTenantRepositoryAdapter(mongoDatabase);
    const findTenantsUseCase = new FindTenantsUseCase(tenantRepository);
    return new FindTenantsController(findTenantsUseCase);
  }
}

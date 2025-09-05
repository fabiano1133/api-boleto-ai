import { IController } from "../../presentation/http/protocols/IController";
import { MongoTenantRepositoryAdapter } from "../../adapters/MongoTenantRepositoryAdapter";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { FindTenantByIdUseCase } from "@/app/useCases/tenant/FindTenantByIdUseCase";
import { FindTenantByIdController } from "../../presentation/http/controllers/tenant/FindTenantByIdController";

export class FindTenantByIdFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const tenantRepository = new MongoTenantRepositoryAdapter(mongoDatabase);
    const findTenantByIdUseCase = new FindTenantByIdUseCase(tenantRepository);
    return new FindTenantByIdController(findTenantByIdUseCase);
  }
}

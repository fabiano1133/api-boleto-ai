import { CreateTenantUseCase } from "@/app/useCases/tenant/CreateTenantUseCase";
import { CreateTenantController } from "../../presentation/http/controllers/tenant/CreateTenantController";
import { IController } from "../../presentation/http/protocols/IController";
import { MongoTenantRepositoryAdapter } from "../../adapters/MongoTenantRepositoryAdapter";
import { MongoDatabaseAdapter } from "../../database/mongo/MongoDatabaseAdapter";
import { BcryptAdapter } from "../../adapters/BcryptAdapter";
import { CreateCustomerUseCase } from "@/app/useCases/customer/CreateCustomerUseCase";
import { MongoCustomerRepositoryAdapter } from "@/infra/adapters/MongoCustomerRepositoryAdapter";
import { CreateCustomerController } from "@/infra/presentation/http/controllers/customer/CreateCustomerController";

export class CreateCustomerFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const customerRepository = new MongoCustomerRepositoryAdapter(
      mongoDatabase
    );
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    return new CreateCustomerController(createCustomerUseCase);
  }
}

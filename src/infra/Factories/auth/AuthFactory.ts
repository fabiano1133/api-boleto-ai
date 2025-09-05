import { AuthUseCase } from "@/app/useCases/auth/AuthUseCase";
import { BcryptAdapter } from "@/infra/adapters/BcryptAdapter";
import { JwtServiceAdapter } from "@/infra/adapters/JwtServiceAdapter";
import { MongoTenantRepositoryAdapter } from "@/infra/adapters/MongoTenantRepositoryAdapter";
import { MongoDatabaseAdapter } from "@/infra/database/mongo/MongoDatabaseAdapter";
import { AuthController } from "@/infra/presentation/http/controllers/auth/AuthController";
import { IController } from "@/infra/presentation/http/protocols/IController";

export class AuthFactory {
  static make(): IController {
    const mongoDatabase = new MongoDatabaseAdapter();
    const bcryptService = new BcryptAdapter();
    const jwtService = new JwtServiceAdapter();
    const tenantRepository = new MongoTenantRepositoryAdapter(mongoDatabase);
    const authUseCase = new AuthUseCase(
      tenantRepository,
      bcryptService,
      jwtService
    );
    return new AuthController(authUseCase);
  }
}

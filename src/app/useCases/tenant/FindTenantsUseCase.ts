import { Tenant } from "@/domain/entities/Tenant";
import { FindTenantsUseCasePort } from "../../ports/in/FindTenantsUseCasePort";
import { TenantRepositoryPort } from "../../ports/out/TenatRepositoryPort";

export class FindTenantsUseCase implements FindTenantsUseCasePort {
  constructor(private readonly tenantRepository: TenantRepositoryPort) {}
  async execute(): Promise<Tenant[]> {
    return await this.tenantRepository.find();
  }
}

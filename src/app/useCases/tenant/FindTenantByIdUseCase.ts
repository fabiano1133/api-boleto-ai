import { Tenant } from "@/domain/entities/Tenant";
import { FindTenantByIdUseCasePort } from "../../ports/in/FindTentantByIdUseCasePort";
import { TenantRepositoryPort } from "../../ports/out/TenatRepositoryPort";

export class FindTenantByIdUseCase implements FindTenantByIdUseCasePort {
  constructor(private readonly tenantRepository: TenantRepositoryPort) {}
  async execute(id: string): Promise<Tenant | null> {
    return await this.tenantRepository.findById(id);
  }
}

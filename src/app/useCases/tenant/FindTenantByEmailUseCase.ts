import { Tenant } from "@/domain/entities/Tenant";
import { TenantRepositoryPort } from "@/app/ports/out/TenatRepositoryPort";
import { FindTenantByEmailUseCasePort } from "@/app/ports/in/FindTenantByEmailUseCasePort";

export class FindTenantByEmailUseCase implements FindTenantByEmailUseCasePort {
  constructor(private readonly tenantRepository: TenantRepositoryPort) {}
  async execute(email: string): Promise<Tenant | null> {
    return await this.tenantRepository.findByEmail(email);
  }
}

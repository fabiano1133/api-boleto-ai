import { Tenant } from "@/domain/entities/Tenant";

export interface CreateTenantUseCasePort {
  execute(data: Tenant): Promise<Tenant>;
}

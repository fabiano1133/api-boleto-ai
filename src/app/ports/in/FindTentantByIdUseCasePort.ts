import { Tenant } from "@/domain/entities/Tenant";

export interface FindTenantByIdUseCasePort {
  execute(id: string): Promise<Tenant | null>;
}

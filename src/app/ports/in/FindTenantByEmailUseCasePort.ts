import { Tenant } from "@/domain/entities/Tenant";

export interface FindTenantByEmailUseCasePort {
  execute(email: string): Promise<Tenant | null>;
}

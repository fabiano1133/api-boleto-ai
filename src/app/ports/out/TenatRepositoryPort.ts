import { Tenant } from "@/domain/entities/Tenant";

export interface TenantRepositoryPort {
  save(tenant: Tenant): Promise<any>;
  find(): Promise<Tenant[]>;
  findById(id: string): Promise<Tenant | null>;
  findByEmail(email: string): Promise<Tenant | null>;
}

import { Tenant } from "@/domain/entities/Tenant";

export interface FindTenantsUseCasePort {
  execute(): Promise<Tenant[]>;
}

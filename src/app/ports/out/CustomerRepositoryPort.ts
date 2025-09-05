import Customer from "@/domain/entities/Customer";

export interface CustomerRepositoryPort {
  save(customer: Customer): Promise<any>;
}

import Customer from "@/domain/entities/Customer";

export interface CreateCustomerUseCasePort {
  execute(data: Customer): Promise<Customer>;
}

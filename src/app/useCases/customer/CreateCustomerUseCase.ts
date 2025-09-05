import { CreateCustomerUseCasePort } from "@/app/ports/in/CreateCustomerUseCasePort";
import Customer from "@/domain/entities/Customer";
import { CustomerRepositoryPort } from "@/app/ports/out/CustomerRepositoryPort";
import { validateCustomerFields } from "@/domain/services/ValidateCustomerFields";

export class CreateCustomerUseCase implements CreateCustomerUseCasePort {
  constructor(private readonly customerRepository: CustomerRepositoryPort) {}
  async execute(data: Customer): Promise<Customer> {
    validateCustomerFields(data);

    const { tenantId, name, email, cpfCnpj, mobilePhone } = data;

    const customer = new Customer(tenantId, name, email, cpfCnpj, mobilePhone);

    return this.customerRepository.save(customer);
  }
}

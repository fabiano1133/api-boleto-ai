import { Tenant } from "@/domain/entities/Tenant";
import { CreateTenantUseCasePort } from "../../ports/in/CreateTenantUseCasePort";
import { TenantRepositoryPort } from "../../ports/out/TenatRepositoryPort";
import { validateTenantFields } from "@/domain/services/ValidateTenantFields";
import { BcryptPort } from "../../ports/out/BcryptPort";
import { TenantAllreadyExistsException } from "@/domain/error/TenantAllreadyExistsException";

export class CreateTenantUseCase implements CreateTenantUseCasePort {
  constructor(
    private readonly tenantRepository: TenantRepositoryPort,
    private readonly bcryptService: BcryptPort
  ) {}
  async execute(data: Tenant): Promise<Tenant> {
    validateTenantFields(data);

    const tenantAllreadyExists = await this.tenantRepository.findByEmail(
      data.email
    );

    if (tenantAllreadyExists) {
      throw new TenantAllreadyExistsException(
        "O E-mail informado já está em uso"
      );
    }

    const passwordHashed = await this.bcryptService.hash(data.password);

    const {
      name,
      email,
      cpfCnpj,
      mobilePhone,
      address,
      addressNumber,
      city,
      state,
      complement,
      province,
      postalCode,
    } = data;

    const tenant = new Tenant(
      name,
      email,
      cpfCnpj,
      mobilePhone,
      address,
      addressNumber,
      city,
      state,
      complement,
      province,
      postalCode,
      passwordHashed
    );

    return this.tenantRepository.save(tenant);
  }
}

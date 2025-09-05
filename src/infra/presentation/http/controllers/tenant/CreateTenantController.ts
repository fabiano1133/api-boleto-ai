import { CreateTenantUseCasePort } from "@/app/ports/in/CreateTenantUseCasePort";
import { Tenant } from "@/domain/entities/Tenant";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class CreateTenantController implements IController {
  constructor(private readonly createTenantUseCase: CreateTenantUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        cpfCnpj,
        mobilePhone,
        password,
        address,
        addressNumber,
        complement,
        province,
        city,
        state,
        postalCode,
      } = req.body as Tenant;

      const response = await this.createTenantUseCase.execute({
        name,
        email,
        cpfCnpj,
        mobilePhone,
        password,
        address,
        addressNumber,
        complement,
        province,
        postalCode,
        city,
        state,
      });

      return {
        statusCode: 201,
        body: response,
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { error: error.message, statusCode: error.statusCode },
      };
    }
  }
}

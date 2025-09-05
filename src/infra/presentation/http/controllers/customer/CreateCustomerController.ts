import { CreateCustomerUseCasePort } from "@/app/ports/in/CreateCustomerUseCasePort";
import Customer from "@/domain/entities/Customer";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class CreateCustomerController implements IController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCasePort
  ) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    const user = req.user;
    try {
      const { name, email, cpfCnpj, mobilePhone } = req.body as Customer;

      const response = await this.createCustomerUseCase.execute({
        name,
        email,
        cpfCnpj,
        mobilePhone,
        tenantId: user.sub,
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

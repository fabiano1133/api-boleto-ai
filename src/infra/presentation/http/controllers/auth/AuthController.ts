import { AuthUseCasePort } from "@/app/ports/in/AuthUseCasePort";
import { Tenant } from "@/domain/entities/Tenant";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class AuthController implements IController {
  constructor(private readonly authUseCase: AuthUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = req.body as Tenant;

      const response = await this.authUseCase.execute(email, password);

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

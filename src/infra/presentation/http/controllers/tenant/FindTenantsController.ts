import { FindTenantsUseCasePort } from "@/app/ports/in/FindTenantsUseCasePort";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class FindTenantsController implements IController {
  constructor(private readonly findTenantsUseCase: FindTenantsUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.findTenantsUseCase.execute();

      return {
        statusCode: 200,
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

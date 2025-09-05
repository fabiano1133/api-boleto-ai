import { FindTenantsUseCasePort } from "@/app/ports/in/FindTenantsUseCasePort";
import { FindTenantByIdUseCasePort } from "@/app/ports/in/FindTentantByIdUseCasePort";
import { Tenant } from "@/domain/entities/Tenant";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class FindTenantByIdController implements IController {
  constructor(
    private readonly findTenantByIdUseCase: FindTenantByIdUseCasePort
  ) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    const { id } = req.params as any;

    try {
      const response = await this.findTenantByIdUseCase.execute(id);

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

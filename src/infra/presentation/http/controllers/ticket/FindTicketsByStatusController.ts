import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";
import { FindTicketsByStatusCasePort } from "@/app/ports/in/FindTicketsByStatusUseCasePort";

export class FindTicketsByStatusController implements IController {
  constructor(
    private readonly findTicketsByStatusUseCase: FindTicketsByStatusCasePort
  ) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const user = req.user;

      const { status } = req.query;

      const response = await this.findTicketsByStatusUseCase.execute(
        user.sub,
        status
      );

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

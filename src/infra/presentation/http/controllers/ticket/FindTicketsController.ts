import { Ticket } from "@/domain/entities/Ticket";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";
import { FindTicketsUseCasePort } from "@/app/ports/in/FindTicketsUseCasePort";

export class FindTicketsController implements IController {
  constructor(private readonly findTicketsUseCase: FindTicketsUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const user = req.user;

      const { startDate, endDate, status, page } = req.query;

      const response = await this.findTicketsUseCase.execute(user.sub, {
        startDate,
        endDate,
        status,
        page,
      });

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

import { CreateTicketUseCasePort } from "@/app/ports/in/CreateTicketUserCasePort";
import { Ticket } from "@/domain/entities/Ticket";
import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";

export class CreateTicketController implements IController {
  constructor(private readonly createTicketUseCase: CreateTicketUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    const user = req.user;

    try {
      const {
        beneficiarysName,
        expirationDate,
        value,
        title,
        description,
        category,
        digitableLine,
        issueAt,
        notes,
      } = req.body as Ticket;

      const response = await this.createTicketUseCase.execute({
        title,
        beneficiarysName,
        tenantId: user.sub,
        value,
        expirationDate,
        description,
        category,
        digitableLine,
        issueAt,
        notes,
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

import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";
import { UpdateTicketUseCasePort } from "@/app/ports/in/UpdateTicketUseCasePort";
import { UpdateTicketDTO } from "./DTOs/UpdateTicketDTO";

export class UpdateTicketController implements IController {
  constructor(private readonly updateTicketUseCase: UpdateTicketUseCasePort) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = req.params;

      const { title, expirationDate, value, status } =
        req.body as UpdateTicketDTO;

      const response = await this.updateTicketUseCase.execute(id, {
        title,
        expirationDate,
        value,
        status,
      });

      return {
        statusCode: 204,
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

import { IController } from "@/infra/presentation/http/protocols/IController";
import { HttpRequest } from "@/infra/presentation/http/protocols/IHttpRequest";
import { HttpResponse } from "@/infra/presentation/http/protocols/IHttpResponse";
import { UpdateTicketUseCasePort } from "@/app/ports/in/UpdateTicketUseCasePort";
import { UpdateTicketDTO } from "./DTOs/UpdateTicketDTO";
import { UpdateTicketStatusUseCasePort } from "@/app/ports/in/UpdateTicketStatusUseCasePort";
import { UpdateTicketStatusDTO } from "./DTOs/UpdateTicketStatusDTO";

export class UpdateTicketStatusController implements IController {
  constructor(
    private readonly updateTicketStatusUseCase: UpdateTicketStatusUseCasePort
  ) {}
  async handler(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = req.params;

      const { status } = req.body as UpdateTicketStatusDTO;

      const response = await this.updateTicketStatusUseCase.execute(id, status);

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

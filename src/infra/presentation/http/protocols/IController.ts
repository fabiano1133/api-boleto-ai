import { HttpRequest } from "./IHttpRequest";
import { HttpResponse } from "./IHttpResponse";

export interface IController {
  handler(req: HttpRequest): Promise<HttpResponse>;
}

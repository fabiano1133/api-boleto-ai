import { Response } from "express";

export interface HttpResponse {
  statusCode: number;
  body: any;
}

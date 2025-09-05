import { Request } from "express";

export interface HttpRequest {
  body: unknown;
  params: any;
  headers: any;
  user: any;
  query: any;
}

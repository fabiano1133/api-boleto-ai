import { NextFunction, Request, Response } from "express";
import { IController } from "../presentation/http/protocols/IController";
import { HttpRequest } from "../presentation/http/protocols/IHttpRequest";

export const expressRouterAdapter = (controller: IController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        user: req.user,
        query: req.query,
      };

      const httpResponse = await controller.handler(httpRequest);
      if (httpResponse.statusCode === undefined) {
        throw new Error(JSON.stringify(httpResponse.body));
      }
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
};

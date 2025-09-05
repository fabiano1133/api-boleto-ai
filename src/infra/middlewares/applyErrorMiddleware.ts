import { Request, Response, NextFunction } from "express";
import { App } from "@/app";

export const applyErrorMiddleware = (app: App): void => {
  app
    .getApp()
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err.headersSent) {
        return next(err);
      }
      res.status(500).json({
        status: "Internal Server Error",
        error: err.message,
      });
    });
};

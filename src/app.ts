import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env" : ".env.prod",
});

import express, { Router } from "express";

export class App {
  private readonly app = express();

  listen(port: number, callback?: () => void) {
    return this.app.listen(port, callback);
  }

  getApp() {
    return this.app;
  }

  addRoutes(routes: Router) {
    return this.app.use(routes);
  }
}

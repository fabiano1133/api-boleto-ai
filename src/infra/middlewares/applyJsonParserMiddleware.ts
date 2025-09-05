import { json } from "express";
import { App } from "@/app";

export const applyJsonParserMiddleware = (app: App): void => {
  app.getApp().use(json());
};

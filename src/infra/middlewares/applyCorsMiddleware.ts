import { App } from "@/app";
import cors from "cors";

export const applyCorsMiddleware = (app: App): void => {
  app.getApp().use(cors());
};

import { App } from "@/app";
import { AbstractAppFactory } from "@/app/factories/AbstractAppFactory";
import { applyJsonParserMiddleware } from "@/infra/middlewares/applyJsonParserMiddleware";
import { applyCorsMiddleware } from "@/infra/middlewares/applyCorsMiddleware";
import { routes } from "@/infra/presentation/http/routes";
import { applyErrorMiddleware } from "../middlewares/applyErrorMiddleware";

export class AppFactory extends AbstractAppFactory {
  create(): App {
    const app = new App();

    applyJsonParserMiddleware(app);

    applyCorsMiddleware(app);

    app.addRoutes(routes);

    applyErrorMiddleware(app);

    return app;
  }
}

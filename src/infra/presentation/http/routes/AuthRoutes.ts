import { Router } from "express";
import { expressRouterAdapter } from "@/infra/adapters/expressRouterAdapter";
import { AuthFactory } from "@/infra/Factories/auth/AuthFactory";

const authRouter = Router();

authRouter.post("/", expressRouterAdapter(AuthFactory.make()));

export { authRouter };

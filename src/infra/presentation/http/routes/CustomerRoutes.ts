import { Router } from "express";
import { expressRouterAdapter } from "@/infra/adapters/expressRouterAdapter";

import { CreateCustomerFactory } from "@/infra/Factories/customer/CreateCustomerFactory";

const customerRouter = Router();

customerRouter.post("/", expressRouterAdapter(CreateCustomerFactory.make()));

export { customerRouter };

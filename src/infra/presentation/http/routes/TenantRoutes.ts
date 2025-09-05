import { Router } from "express";
import { expressRouterAdapter } from "@/infra/adapters/expressRouterAdapter";
import { CreateTenantFactory } from "@/infra/Factories/tenant/CreateTenantFactory";
import { FindTenantsFactory } from "@/infra/Factories/tenant/FindTenantsFactory";
import { FindTenantByIdFactory } from "@/infra/Factories/tenant/FindTenantByIdFactory";

const tenantRouter = Router();

tenantRouter.post("/", expressRouterAdapter(CreateTenantFactory.make()));

tenantRouter.get("/", expressRouterAdapter(FindTenantsFactory.make()));

tenantRouter.get(
  "/tenantid/:id",
  expressRouterAdapter(FindTenantByIdFactory.make())
);

export { tenantRouter };

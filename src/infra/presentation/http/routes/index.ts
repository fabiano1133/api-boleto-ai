import { Router } from "express";
import { tenantRouter } from "./TenantRoutes";
import { ticketRouter } from "./TicketRoutes";
import { authRouter } from "./AuthRoutes";
import { requireAuthenticationMiddleware } from "@/infra/middlewares/requireAuthenticationMiddleware";
import { customerRouter } from "./CustomerRoutes";

const routes = Router();

const v1 = Router();

v1.use("/auth/sign-in", authRouter);

v1.use("/tenants", tenantRouter);

v1.use("/tickets", requireAuthenticationMiddleware, ticketRouter);

v1.use("/customers", requireAuthenticationMiddleware, customerRouter);

routes.use("/api/v1", v1);

export { routes };

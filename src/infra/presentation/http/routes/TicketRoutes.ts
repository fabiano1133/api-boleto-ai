import { expressRouterAdapter } from "@/infra/adapters/expressRouterAdapter";
import { CreateTicketFactory } from "@/infra/Factories/ticket/CreateTicketFactory";
import { FindTicketsByStatusFactory } from "@/infra/Factories/ticket/FindTicketsByStatusFactory";
import { FindTicketsFactory } from "@/infra/Factories/ticket/FindTicketsFactory";
import { UpdateTicketFactory } from "@/infra/Factories/ticket/UpdateTicketFactory";
import { UpdateTicketStatusFactory } from "@/infra/Factories/ticket/UpdateTicketStatusFactory";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter.post("/", expressRouterAdapter(CreateTicketFactory.make()));

ticketRouter.get("/", expressRouterAdapter(FindTicketsFactory.make()));

ticketRouter.get(
  "/by-status",
  expressRouterAdapter(FindTicketsByStatusFactory.make())
);

ticketRouter.patch(
  "/update/:id",
  expressRouterAdapter(UpdateTicketFactory.make())
);

ticketRouter.put(
  "/update/status/:id",
  expressRouterAdapter(UpdateTicketStatusFactory.make())
);

export { ticketRouter };

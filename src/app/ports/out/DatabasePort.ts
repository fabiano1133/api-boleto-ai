import Customer from "@/domain/entities/Customer";
import { Tenant } from "@/domain/entities/Tenant";
import { Ticket } from "@/domain/entities/Ticket";
import { Collection } from "mongodb";

export interface DatabasePort {
  connect(): Promise<void>;
  getTicketCollection(): Collection<Ticket>;
  getTenantCollection(): Collection<Tenant>;
  getCustomerCollection(): Collection<Customer>;
}

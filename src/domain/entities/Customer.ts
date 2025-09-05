import { randomUUID } from "node:crypto";

export default class Customer {
  id?: string;
  tenantId: string;
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone: string;
  constructor(
    tenantId: string,
    name: string,
    email: string,
    cpfCnpj: string,
    mobilePhone: string
  ) {
    this.tenantId = tenantId;
    this.name = name;
    this.email = email;
    this.cpfCnpj = cpfCnpj;
    this.mobilePhone = mobilePhone;

    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

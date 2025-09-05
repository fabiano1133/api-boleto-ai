import { PaymentStatusEnum } from "@/domain/enum/PaymentStatusEnum";
import { createTicketId } from "@/domain/services/CreateTicketId";

export class Ticket {
  id?: string;
  title: string;
  tenantId: string;
  beneficiarysName: string;
  value: number;
  expirationDate: Date;
  status?: PaymentStatusEnum;
  description: string;
  category: string;
  digitableLine: string;
  issueAt: Date;
  notes: string;

  constructor(
    title: string,
    beneficiarysName: string,
    tenantId: string,
    value: number,
    expirationDate: Date,
    description: string,
    category: string,
    digitableLine: string,
    issueAt: Date,
    notes: string
  ) {
    if (!this.id) {
      this.id = `BOL-${createTicketId(tenantId)}`;
    }
    this.title = title;
    this.tenantId = tenantId;
    this.beneficiarysName = beneficiarysName;
    this.value = value;
    this.expirationDate = expirationDate;
    this.status = PaymentStatusEnum.PENDENT;
    this.description = description;
    this.category = category;
    this.digitableLine = digitableLine;
    this.issueAt = issueAt;
    this.notes = notes;
  }
}

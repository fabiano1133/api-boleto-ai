import { Ticket } from "@/domain/entities/Ticket";
import { CreateTicketUseCasePort } from "@/app/ports/in/CreateTicketUserCasePort";
import { TicketRepositoryPort } from "@/app/ports/out/TicketRepositoryPort";
import { validateTicketFields } from "@/domain/services/ValidateTicketFields";
import { TenantRepositoryPort } from "@/app/ports/out/TenatRepositoryPort";
import { TenantWithoutPlanException } from "@/domain/error/UnregisteredUserException copy";

export class CreateTicketUseCase implements CreateTicketUseCasePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly tenantRepository: TenantRepositoryPort
  ) {}
  async execute(data: Ticket): Promise<Ticket> {
    const tenant = await this.tenantRepository.findById(data.tenantId);

    const tickets = await this.ticketRepository.findTickets(data.tenantId);

    if (!tenant?.isSubscriber && tickets.length === 10) {
      throw new TenantWithoutPlanException(
        "Limite de Boletos atingidos para o plano Free. Contrate o plano PRO e continue gerenciando os seus boletos!"
      );
    }

    const {
      beneficiarysName,
      tenantId,
      expirationDate,
      value,
      title,
      description,
      category,
      digitableLine,
      issueAt,
      notes,
    } = data;

    validateTicketFields({
      beneficiarysName,
      tenantId,
      expirationDate,
      value,
      title,
      description,
      category,
      digitableLine,
      issueAt,
      notes,
    });

    const ticket = new Ticket(
      title,
      beneficiarysName,
      tenantId,
      value,
      new Date(expirationDate),
      description,
      category,
      digitableLine,
      new Date(issueAt),
      notes
    );

    return this.ticketRepository.save(ticket);
  }
}

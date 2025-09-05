import { EmptyFieldException } from "../error/EmptyFieldException";
import { Ticket } from "../entities/Ticket";

export const validateTicketFields = (fields: Ticket): any => {
  const {
    beneficiarysName,
    tenantId,
    value,
    expirationDate,
    description,
    category,
    digitableLine,
    issueAt,
    notes,
    title,
  } = fields;

  const requiredField = {
    beneficiarysName,
    tenantId,
    value,
    expirationDate,
    description,
    category,
    digitableLine,
    issueAt,
    notes,
    title,
  };

  try {
    Object.entries(requiredField).forEach(([key, value]) => {
      if (!value) {
        throw new EmptyFieldException(`O Campo ${key} não pode ser vazio`);
      }
    });
  } catch (error) {
    throw error;
  }
};

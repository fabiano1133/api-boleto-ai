import { EmptyFieldException } from "../error/EmptyFieldException";
import Customer from "../entities/Customer";

export const validateCustomerFields = (fields: Customer): any => {
  const { tenantId, name, email, cpfCnpj, mobilePhone } = fields;

  const requiredField = {
    tenantId,
    name,
    email,
    cpfCnpj,
    mobilePhone,
  };

  try {
    Object.entries(requiredField).forEach(([key, value]) => {
      if (!value) {
        throw new EmptyFieldException(`The ${key} field cannot be empty`);
      }
    });
  } catch (error) {
    throw error;
  }
};

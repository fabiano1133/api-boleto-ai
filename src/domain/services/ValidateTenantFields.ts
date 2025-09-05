import { EmptyFieldException } from "../error/EmptyFieldException";
import { Tenant } from "../entities/Tenant";

export const validateTenantFields = (fields: Tenant): any => {
  const {
    name,
    email,
    password,
    cpfCnpj,
    address,
    addressNumber,
    complement,
    mobilePhone,
    postalCode,
    province,
    city,
    state,
  } = fields;

  const requiredField = {
    name,
    email,
    password,
    cpfCnpj,
    address,
    addressNumber,
    complement,
    mobilePhone,
    postalCode,
    province,
    city,
    state,
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

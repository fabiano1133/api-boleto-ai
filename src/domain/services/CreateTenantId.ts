import { hexoid } from "../../../node_modules/hexoid/dist/index";

export const createTenantId = () => {
  try {
    const id = hexoid();
    return id();
  } catch (error) {
    throw error;
  }
};

export const createTicketId = (tenantId: string) => {
  return `${tenantId}-${Math.floor(1000000 + Math.random() * 9000000)}`;
};

export const authConfig = {
  JWT_SECRET: String(process.env.JWT_SECRET),
  EXPIRES_IN: Number(process.env.EXPIRES_IN ?? "3600"),
};

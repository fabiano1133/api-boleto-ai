import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod",
});

export const authConfig = {
  JWT_SECRET: String(process.env.JWT_SECRET),
  EXPIRES_IN: Number(process.env.EXPIRES_IN ?? "3600"),
};

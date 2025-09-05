import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod",
});

export const hashConfig = {
  SALT: Number(process.env.SALT),
};

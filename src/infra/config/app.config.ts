import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod",
});

export const appConfig = {
  HTTP_PORT: Number(process.env.HTTP_PORT),
};

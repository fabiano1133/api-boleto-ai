import { Request, Response, NextFunction } from "express";
import { JwtServiceAdapter } from "../adapters/JwtServiceAdapter";
import { authConfig } from "../config/auth.config";
import { HttpRequest } from "../presentation/http/protocols/IHttpRequest";

export const requireAuthenticationMiddleware = async (
  req: Request | HttpRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = token.split(" ")[1];

  try {
    const jwtService = new JwtServiceAdapter();

    const decoded = await jwtService.verify(accessToken, authConfig.JWT_SECRET);
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: "Token Inválido" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

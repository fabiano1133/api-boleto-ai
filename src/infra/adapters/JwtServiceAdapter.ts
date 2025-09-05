import jwt from "jsonwebtoken";
import { JwtServicePort } from "@/app/ports/out/JwtServicePort";
import { authConfig } from "../config/auth.config";

export class JwtServiceAdapter implements JwtServicePort {
  async sign(payload: {}): Promise<any> {
    const { JWT_SECRET, EXPIRES_IN } = authConfig;

    try {
      const token = jwt.sign(payload, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: EXPIRES_IN,
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
  async verify(token: string, secret: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });

      return decoded;
    } catch (error) {
      throw error;
    }
  }
}

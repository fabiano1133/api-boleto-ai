import { JwtPayload } from "jsonwebtoken";

export interface JwtServicePort {
  sign(payload: {}): Promise<any>;
  verify(token: string, secret: string): Promise<any>;
}

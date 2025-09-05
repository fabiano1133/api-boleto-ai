import { JwtPayload } from "jsonwebtoken";

export interface AuthUseCasePort {
  execute(email: string, password: string): Promise<any>;
}

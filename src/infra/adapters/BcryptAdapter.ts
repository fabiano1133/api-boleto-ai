import bcrypt from "bcrypt";
import { hashConfig } from "../config/hashConfig";
import { BcryptPort } from "@/app/ports/out/BcryptPort";

export class BcryptAdapter implements BcryptPort {
  async hash(password: string): Promise<string> {
    try {
      const { SALT } = hashConfig;

      const passwordHashed = await bcrypt.hash(password, SALT);

      return passwordHashed;
    } catch (error) {
      throw error;
    }
  }
  async compare(password: string, hash: string): Promise<boolean> {
    try {
      const isTrue = await bcrypt.compare(password, hash);

      return isTrue;
    } catch (error) {
      throw error;
    }
  }
}

import { AuthUseCasePort } from "@/app/ports/in/AuthUseCasePort";
import { TenantRepositoryPort } from "@/app/ports/out/TenatRepositoryPort";
import { Tenant } from "@/domain/entities/Tenant";
import { InvalidCredentialsException } from "@/domain/error/InvalidCredentialsException";
import { UnregisteredUserException } from "@/domain/error/UnregisteredUserException";
import { BcryptAdapter } from "@/infra/adapters/BcryptAdapter";
import { JwtServiceAdapter } from "@/infra/adapters/JwtServiceAdapter";
import { JwtPayload } from "jsonwebtoken";

export class AuthUseCase implements AuthUseCasePort {
  constructor(
    private readonly tenantRepository: TenantRepositoryPort,
    private readonly brcyptService: BcryptAdapter,
    private readonly jwtService: JwtServiceAdapter
  ) {}
  async execute(email: string, password: string): Promise<any> {
    try {
      const userAlreadyExists = (await this.tenantRepository.findByEmail(
        email
      )) as Tenant;

      if (!userAlreadyExists) {
        console.warn(
          "[ LOG-ERROR ] - Não existe usuário cadastrado com o e-mail informado"
        );
        throw new UnregisteredUserException(
          "Não existe usuário cadastrado com o e-mail informado"
        );
      }

      if (!userAlreadyExists) {
        console.warn("[ LOG-ERROR ] - Email ou Senha Inválidos");
        throw new InvalidCredentialsException("Email ou Senha Inválidos");
      }

      const passwordHashed = await this.brcyptService.compare(
        password,
        userAlreadyExists.password
      );

      if (!passwordHashed) {
        console.warn("[ LOG-ERROR ] - Email ou Senha Inválidos");
        throw new InvalidCredentialsException("Email ou Senha Inválidos");
      }

      const payload: JwtPayload = {
        sub: userAlreadyExists.id,
        email: userAlreadyExists.email,
        name: userAlreadyExists.name,
        mobilePhone: userAlreadyExists.mobilePhone,
        isSubscriber: userAlreadyExists.isSubscriber,
      };

      const token = await this.jwtService.sign(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw error;
    }
  }
}

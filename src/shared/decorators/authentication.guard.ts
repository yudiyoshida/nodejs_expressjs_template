import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { AccountRole } from 'modules/account/types/account-role.type';
import { Payload } from 'modules/auth/entities/payload.entity';
import { IAuthenticationService } from 'shared/helpers/authentication/authentication-service.interface';
import { TOKENS } from 'shared/ioc/token';

export enum PermissionEnum {
  FIND_ALL_ACCOUNTS = 'FIND_ALL_ACCOUNTS',
  FIND_ALL_FAQS = 'FIND_ALL_FAQS',
  FIND_FAQ_BY_ID = 'FIND_FAQ_BY_ID',
  CREATE_FAQ = 'CREATE_FAQ',
}

const ROLE_PERMISSION: Record<AccountRole, PermissionEnum[]> = {
  admin: [
    PermissionEnum.FIND_ALL_ACCOUNTS,
    PermissionEnum.FIND_ALL_FAQS,
    PermissionEnum.FIND_FAQ_BY_ID,
    PermissionEnum.CREATE_FAQ,
  ],
  buyer: [
    PermissionEnum.FIND_ALL_ACCOUNTS,
    PermissionEnum.FIND_ALL_FAQS,
    PermissionEnum.FIND_FAQ_BY_ID,
  ],
  seller: [
    PermissionEnum.CREATE_FAQ,
    PermissionEnum.FIND_ALL_FAQS,
    PermissionEnum.FIND_FAQ_BY_ID,
  ],
};

@injectable()
export class AuthenticationGuard {
  constructor(
    @inject(TOKENS.IAuthenticationService) private jwtService: IAuthenticationService,
    @inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
  ) {}

  public getPayload(bearerToken?: string): Payload {
    const token = this.extractTokenFromHeader(bearerToken);

    return token ? this.extractPayloadFromToken(token) : null;
  }

  public async getAccount(sub: string): Promise<Account|null> {
    return this.accountRepository.findById(sub);
  }

  public hasPermission(role: AccountRole, permission: PermissionEnum) {
    return ROLE_PERMISSION[role].includes(permission);
  }

  private extractTokenFromHeader(bearerToken?: string) {
    const [type, token] = bearerToken?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractPayloadFromToken(token: string) {
    return this.jwtService.verify(token);
  }
}

import { Container } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { IFaqRepository } from 'modules/faq/repositories/faq-repository.interface';
import { AuthenticationJwtAdapterService } from 'shared/helpers/authentication/adapters/authentication-jwt.service';
import { IAuthenticationService } from 'shared/helpers/authentication/authentication-service.interface';
import { BcryptAdapterService } from 'shared/helpers/hashing/adapters/hashing.service';
import { IHashingService } from 'shared/helpers/hashing/hashing-service.interface';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqInMemoryAdapterRepository);
container.bind<IAccountRepository>(TOKENS.IAccountRepository).to(AccountInMemoryAdapterRepository);
container.bind<IHashingService>(TOKENS.IHashingService).to(BcryptAdapterService);
container.bind<IAuthenticationService>(TOKENS.IAuthenticationService).to(AuthenticationJwtAdapterService);

export { container };

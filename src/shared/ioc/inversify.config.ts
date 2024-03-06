import { Container } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { IFaqRepository } from 'modules/faq/repositories/faq-repository.interface';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqInMemoryAdapterRepository);

export { container };

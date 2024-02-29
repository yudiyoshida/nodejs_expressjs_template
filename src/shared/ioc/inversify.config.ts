import { Container } from 'inversify';
import { TOKENS } from 'src/shared/ioc/token';

import { FaqsInMemoryAdapterRepository } from 'src/modules/faqs/repositories/adapters/faqs-in-memory.repository';
import { IFaqRepository } from 'src/modules/faqs/repositories/faqs-repository.interface';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqsInMemoryAdapterRepository);

export { container };

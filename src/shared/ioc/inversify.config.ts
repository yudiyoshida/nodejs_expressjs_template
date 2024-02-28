import { Container } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

import { FaqsInMemoryAdapterRepository } from '@modules/faqs/repositories/adapters/faqs-in-memory.repository';
import { IFaqRepository } from '@modules/faqs/repositories/faqs-repository.interface';

const container = new Container();

container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqsInMemoryAdapterRepository);

export { container };

import { Container } from 'inversify';
import { TOKENS } from 'shared/di/token';

import { FaqsInMemoryAdapterRepository } from '@modules/faqs/repositories/adapters/faqs-in-memory.repository';
import { IFaqRepository } from '@modules/faqs/repositories/faqs-repositories.interface';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqsInMemoryAdapterRepository);

export { container };

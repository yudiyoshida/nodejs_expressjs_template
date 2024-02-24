import { Faq } from '@modules/faqs/entities/faq.entity';
import { injectable } from 'inversify';
import { IFaqRepository } from '../faqs-repositories.interface';

@injectable()
export class FaqsInMemoryAdapterRepository implements IFaqRepository {
  private _faqs: Faq[] = [];

  public async findById(id: string) {
    const faq = this._faqs.find(item => item.id === id);

    return faq ?? null;
  }
}

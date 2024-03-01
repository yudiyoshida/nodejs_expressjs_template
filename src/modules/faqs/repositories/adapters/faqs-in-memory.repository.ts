import { injectable } from 'inversify';
import { Faq } from 'modules/faqs/entities/faq.entity';
import { CreateFaqDto } from 'modules/faqs/use-cases/create-faq/dtos/create-faq.dto';
import { IFaqRepository } from '../faqs-repository.interface';

@injectable()
export class FaqsInMemoryAdapterRepository implements IFaqRepository {
  private _faqs: Faq[] = [];

  public async findById(id: string) {
    const faq = this._faqs.find(item => item.id == id);

    return faq ?? null;
  }

  public async create(data: CreateFaqDto) {
    const now = new Date().getTime();

    const newFaq = { id: now.toString(), ...data };

    this._faqs.push(newFaq);

    return newFaq;
  }
}

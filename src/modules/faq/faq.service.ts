import Repository from './faq.repository';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';

import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';

class Service {
  public async findAll(limit: number, page: number) {
    const faqs = await Repository.findAll(limit, page);

    return PaginationHelper.paginate(faqs, limit, page);
  }

  public async findById(id: number) {
    const faq = await Repository.findById(id);

    if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);
    else return faq;
  }

  public async createOne(data: CreateFaqDto) {
    return await Repository.create(data);
  }

  public async updateOne(id: number, data: UpdateFaqDto) {
    const faq = await this.findById(id);

    return await Repository.update(faq.id, data);
  }

  public async deleteOne(id: number) {
    const faq = await this.findById(id);

    return await Repository.delete(faq.id);
  }
}

export default new Service();

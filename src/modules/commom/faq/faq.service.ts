import DataSource from '@database/data-source';
import { FaqDto } from './dtos/faq.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll(limit: number, page: number) {
    return DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        select: FaqDto,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count(),
    ]);
  }
}

export default new Service();

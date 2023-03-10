import DataSource from '@database/data-source';
import Faq from './faq.entity';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.getRepository(Faq);
  }

  public async findAll(limit: number, page: number) {
    return this.repository.findAndCount({
      take: limit,
      skip: ((page - 1) * limit),
      order: { id: 'desc' },
    });
  }

  public async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  public async save(faq: Faq) {
    return this.repository.save(faq);
  }

  public async delete(faq: Faq) {
    return this.repository.remove(faq);
  }
}

export default new Service();

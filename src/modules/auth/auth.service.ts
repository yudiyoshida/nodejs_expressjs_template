import DataSource from '@database/data-source';
import { Profile } from '@prisma/client';
import { ProfileDto } from './dtos/profile.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.profile;
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: ProfileDto,
    });
  }

  public async findByUsername(username: string): Promise<Profile | null> {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: username },
          // { phone: username },
        ],
      },
    });
  }
}

export default new Service();

class BaseService {
  async findById(id) {
    return await this.repository.findUnique({
      where: { id }
    });
  }

  async create(data) {
    return await this.repository.create({
      data
    });
  }

  async update(id, data) {
    return await this.repository.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await this.repository.delete({
      where: { id }
    });
  }
  
  async updateStatus(id, status) {
    return await this.repository.update({
      where: { id },
      data: { status }
    });
  }
}

module.exports = BaseService;
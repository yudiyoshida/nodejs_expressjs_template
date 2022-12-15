const DataSource = require("../../database/data-source");

class TextService {
  constructor() {
    this.repository = DataSource.text;
  }

  async findByType(type) {
    return await this.repository.findUnique({
      where: { type }
    });
  }

  async update(type, data) {
    return await this.repository.update({
      where: { type },
      data
    });
  }
}

module.exports = new TextService();
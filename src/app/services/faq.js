const DataSource = require("../../database/data-source");
const BaseService = require("../utils/base-service");

class FaqService extends BaseService {
  constructor() {
    super();
    this.repository = DataSource.faq;
  }

  async findAll() {
    return this.repository.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
}

module.exports = new FaqService();
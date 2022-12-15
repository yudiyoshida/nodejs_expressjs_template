const DataSource = require("../../database/data-source");
const BaseService = require("../utils/base-service");

class AdminService extends BaseService {
  constructor() {
    super();
    this.repository = DataSource.permission;
  }

  async findAll() {
    return await this.repository.findMany({
      orderBy: { id: "asc" }
    });
  }
}

module.exports = new AdminService();
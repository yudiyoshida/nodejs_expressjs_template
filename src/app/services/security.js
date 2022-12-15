const DataSource = require("../../database/data-source");

class SecurityService {
  constructor() {
    this.repository = DataSource.security;
  }

  async findByEmail(email) {
    return await this.repository.findUnique({
      where: { email }
    });
  }

  async findByEmailAndCode(email, code) {
    return await this.repository.findFirst({
      where: { email, code }
    });
  }

  async storeCode(email, code, code_expires_in) {
    return await this.repository.upsert({
      where: {
        email
      },
      update: {
        code,
        code_expires_in,
        validated: false
      },
      create: {
        email,
        code,
        code_expires_in
      }
    });
  }

  async validateCode(id) {
    return await this.repository.update({
      where: { id },
      data: {
        code: null,
        code_expires_in: null,
        validated: true
      }
    });
  }
}

module.exports = new SecurityService();
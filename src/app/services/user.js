const DataSource = require("../../database/data-source");
const BaseService = require("../utils/base-service");

class UserService extends BaseService {
  constructor() {
    super();
    this.repository = DataSource.user;
    this.securityRepository = DataSource.security;
  }

  async findAllAdmins(limit, page, type, status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { type, status, is_admin: true },
        take: limit,
        skip: ((page - 1) * limit),
      }),
      this.repository.count({
        where: { type, status, is_admin: true }
      })
    ]);
  }

  async findAllUsers(limit, page, type, status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { type, status, is_admin: false },
        take: limit,
        skip: ((page - 1) * limit),
      }),
      this.repository.count({
        where: { type, status, is_admin: false }
      })
    ]);
  }

  async findById(id) {
    return await this.repository.findUnique({
      where: { id }
    });
  }

  async findUserById(id) {
    return await this.repository.findFirst({
      where: { id, is_admin: false },
      include: { addresses: true }
    });
  }

  async findAdminById(id) {
    return await this.repository.findFirst({
      where: { id, is_admin: true },
      include: { permissions: true }
    });
  }

  async findByEmail(email) {
    return await this.repository.findUnique({
      where: { email }
    });
  }

  async findByUserName(username) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email: username }
          // { phone: username }
        ]
      },
      include: { permissions: true }
    });
  }

  async findByEmailAndCode(email, code) {
    return await this.repository.findFirst({
      where: { email, code }
    });
  }

  async findByEmailOrCpf(email, cpf) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email },
          { cpf }
        ]
      }
    });
  }

  async createAdmin(data, permissions) {
    return this.repository.create({
      data: {
        ...data,
        permissions: {
          connect: permissions
        }
      },
      include: { permissions: true }
    });
  }

  async createUser(data, address) {
    return DataSource.$transaction([
      this.repository.create({
        data: {
          ...data,
          addresses: {
            create: address
          }
        },
        include: { addresses: true }
      }),
      this.securityRepository.delete({
        where: { email: data.email }
      })
    ]);
  }

  async storeCode(id, code, code_expires_in) {
    return await this.repository.update({
      where: { id },
      data: {
        code,
        code_expires_in
      }
    });
  }

  async changePassword(id, password) {
    return await this.repository.update({
      where: { id },
      data: {
        password,
        code: null,
        code_expires_in: null
      }
    });
  }
}

module.exports = new UserService();
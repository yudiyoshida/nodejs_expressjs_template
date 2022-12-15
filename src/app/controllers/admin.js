const UserService = require("../services/user");
const AdminService = require("../services/admin");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");

const { paginate } = require("../helpers/pagination");
const { hashPassword } = require("../helpers/hash");
const { excludeFields, excludeFieldsArray } = require("../helpers/exclude");
const { Status, UserType } = require("@prisma/client");

class AdminController {
  findAll = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, type, status } = req.query;      

      let result = await UserService.findAllAdmins(limit, page, type, status);
      result[0] = excludeFieldsArray(result[0], "password", "code", "code_expires_in");
      
      const resultPaginated = paginate(result, limit, page);
      res.status(200).json(resultPaginated);
    
    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  findById = async(req, res, next) => {
    try {
      let result = await UserService.findAdminById(req.params.id);
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  findAllPermissions = async(req, res, next) => {
    try {
      const result = await AdminService.findAll();
      res.status(200).json(result);
    
    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  createAdmin = async(req, res, next) => {
    try {
      // Verifica se já existe um registro.
      const user = await UserService.findByEmail(req.body.email);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Define valores padrões.
      req.body.is_admin = true;
      req.body.type = UserType.admin;
      req.body.status = Status.ativo;
      req.body.password = await hashPassword(req.body.password);
 
      // Tratamento das permissões do novo admin.
      const permissions = await this.checkPermissions(req.body.permissions);
      delete req.body.permissions;
      
      // Remove alguns campos e retorna o novo usuário admin.
      let result = await UserService.createAdmin(req.body, permissions);
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(201).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  checkPermissions = async(permissions) => {
    const result = [];
    await Promise.all(
      permissions.map(async (item) => {
        const permission = await AdminService.findById(item);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
        else result.push({ id: item });
      })
    );

    return result;
  };
}

module.exports = new AdminController();
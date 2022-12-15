const UserService = require("../services/user");
const SecurityService = require("../services/security");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");

const { paginate } = require("../helpers/pagination");
const { hashPassword } = require("../helpers/hash");
const { excludeFields, excludeFieldsArray } = require("../helpers/exclude");
const { Status, UserType } = require("@prisma/client");

class UserController {
  findAll = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, type, status } = req.query;
      
      // Se for admin, pode visualizar users ativos e inativos.
      // Caso contrário, só serão exibidos users ativos.
      let result = (req.user.is_admin)
        ? await UserService.findAllUsers(limit, page, type, status)
        : await UserService.findAllUsers(limit, page, type, Status.ativo);

      result[0] = excludeFieldsArray(result[0], "password", "code", "code_expires_in");
      const resultPaginated = paginate(result, limit, page);
      res.status(200).json(resultPaginated);
    
    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  findById = async(req, res, next) => {
    try {
      let result = await UserService.findUserById(req.params.id);
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  findMyself = async(req, res, next) => {
    try {
      let result = await UserService.findById(req.user.id);
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  createUser = async(req, res, next) => {
    try {
      // Verifica se o email foi validado.
      const email = await SecurityService.findByEmail(req.body.email);
      if (!email) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);
      if (!email.validated) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);

      // Verifica se já existe um registro.
      const user = await UserService.findByEmailOrCpf(req.body.email, req.body.cpf);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Define valores padrões.
      req.body.type = UserType.app;
      req.body.status = Status.ativo;
      req.body.password = await hashPassword(req.body.password);
 
      // Separa as informações para cada entidade.
      const { address } = req.body;
      delete req.body.address;
      delete req.body.confirm_password;
      
      // Remove alguns campos e retorna o novo usuário.
      let [result,] = await UserService.createUser(req.body, address);
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(201).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  updateStatus = async(req, res, next) => {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      let result = await UserService.updateStatus(user.id, req.body.status);
      result = excludeFields(result, "password", "code", "code_expires_in");
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new UserController();
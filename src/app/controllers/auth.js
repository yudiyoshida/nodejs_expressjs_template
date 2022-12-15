require("dotenv/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");
const Mail = require("../../lib/nodemailer");

const UserService = require("../services/user");
const SecurityService = require("../services/security");

const { generateCode, isExpired } = require("../helpers/code");
const { excludeFields } = require("../helpers/exclude");
const { hashPassword } = require("../helpers/hash");
const { Status } = require("@prisma/client");

class AuthController {
  login = async(req, res, next) => {
    try {
      const user = await UserService.findByUserName(req.body.username);
      if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
      
      const { id, is_admin, type, permissions } = user;
      const token = jwt.sign({ id, is_admin, type, permissions }, process.env.JWT_SECRET, { expiresIn: "7d" });
      excludeFields(user, "password", "code", "code_expires_in");
      res.status(200).json({ token, user });

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  forgotPassword = async(req, res, next) => {
    try {
      const { email } = req.body;

      const user = await UserService.findByEmail(email);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const { code, code_expires_in } = generateCode(60);
      await UserService.storeCode(user.id, code, code_expires_in);

      await Mail.sendEmail(email, "[name] - Esqueceu sua senha?", "forgot-password", { code });
      res.status(200).json({ message: "Código de recuperação de senha enviado no seu email!"});

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  resetPassword = async(req, res, next) => {
    try {
      const { email, code, password } = req.body;
      
      const user = await UserService.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);

      if (isExpired(user.code_expires_in)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      user.password = hashPassword(password);
      await UserService.changePassword(user.id, user.password);
      res.status(200).json({ message: "Senha atualizada com sucesso!" });

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  updatePassword = async(req, res, next) => {
    try {
      const { current_password, new_password } = req.body;
      const user = await UserService.findById(req.user.id);

      const isPasswordCorrect = bcrypt.compareSync(current_password, user.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_PASSWORD);

      user.password = hashPassword(new_password);
      await UserService.changePassword(user.id, user.password);
      res.status(200).json({ message: "Senha atualizada com sucesso!" });

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  validateFields = async(req, res, next) => {
    try {
      const { email, cpf } = req.body;
      
      const user = await UserService.findByEmailOrCpf(email, cpf);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      const { code, code_expires_in } = generateCode(5);
      await SecurityService.storeCode(email, code, code_expires_in);

      await Mail.sendEmail(email, "[name] - Confirme o seu email!", "validate-email", { code });
      res.status(200).json({ message: "Código de confirmação enviado no seu email!"});

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  validateCode = async(req, res, next) => {
    try {
      const { email, code } = req.body;
      
      const user = await SecurityService.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);
      
      if (isExpired(user.code_expires_in)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      await SecurityService.validateCode(user.id);
      res.status(200).json({ message: "Email validado com sucesso!"});

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new AuthController();
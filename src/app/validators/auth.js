const yup = require("../../config/yup");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");
const { passwordEqualsConfirmation } = require("../helpers/password");

class AuthValidator {
  login = async(req, res, next) => {
    const schema = yup.object({
      password: yup.string().required(),
      username: yup.string().trim().lowercase().required(),
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      req.body = await schema.cast(req.body, { stripUnknown: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  forgotPassword = async(req, res, next) => {
    const schema = yup.object({
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      req.body = await schema.cast(req.body, { stripUnknown: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  resetPassword = async(req, res, next) => {
    const schema = yup.object({
      confirm_password: yup.string().required(),
      password: yup.string().min(8).required(),
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      req.body = await schema.cast(req.body, { stripUnknown: true });
      
      if (!passwordEqualsConfirmation(req.body.password, req.body.confirm_password)) throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);
      else next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  updatePassword = async(req, res, next) => {
    const schema = yup.object({
      confirm_password: yup.string().required(),
      new_password: yup.string().min(8).required(),
      current_password: yup.string().required(),
    });

    try {
      req.body = await schema.cast(req.body, { stripUnknown: true });
      req.body = await schema.validate(req.body, { abortEarly: true });

      if (!passwordEqualsConfirmation(req.body.new_password, req.body.confirm_password)) throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);
      else next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  validateFields = async(req, res, next) => {
    const schema = yup.object({
      cpf: yup.string().trim().cpf().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await schema.cast(req.body, { stripUnknown: true });
      req.body = await schema.validate(req.body, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));
      
    }
  };

  validateCode = async(req, res, next) => {
    const schema = yup.object({
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await schema.cast(req.body, { stripUnknown: true });
      req.body = await schema.validate(req.body, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));
      
    }
  };
}

module.exports = new AuthValidator();
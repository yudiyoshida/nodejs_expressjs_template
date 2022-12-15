const yup = require("../../config/yup");
const BaseValidator = require("../utils/base-validator");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");
const today = new Date();

const { passwordEqualsConfirmation } = require("../helpers/password");

class UserValidator extends BaseValidator {
  constructor() {
    super();
  }

  createUser = async(req, res, next) => {
    const schema = yup.object({
      address: yup.object({
        state: yup.string().trim(),
        city: yup.string().trim(),
        district: yup.string().trim(),
        reference: yup.string().trim(),
        complement: yup.string().trim(),
        number: yup.string().trim(),
        street: yup.string().trim(),
        zipcode: yup.string().trim(),
        nickname: yup.string().trim(),
      }),
      image_key: yup.string().trim(),
      image_url: yup.string().trim().url(),
      birthday: yup.date().formatDate().max(today).required(),
      phone: yup.string().trim().phone().required(),
      cpf: yup.string().trim().cpf().required(),
      confirm_password: yup.string().required(),
      password: yup.string().min(8).required(),
      email: yup.string().trim().email().lowercase().required(),
      name: yup.string().trim().required(),
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
}

module.exports = new UserValidator();
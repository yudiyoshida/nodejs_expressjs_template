const yup = require("../../config/yup");
const BaseValidator = require("../utils/base-validator");
const AppException = require("../../errors/app-exception");

class AdminValidator extends BaseValidator {
  constructor() {
    super();
  }

  createAdmin = async(req, res, next) => {
    const schema = yup.object({
      permissions: yup.array().of(yup.number().positive().integer()).min(1).required(),
      // type: yup.string().trim().required(),
      password: yup.string().min(8).required(),
      email: yup.string().trim().email().lowercase().required(),
      name: yup.string().trim().required(),
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      req.body = await schema.cast(req.body, { stripUnknown: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };
}

module.exports = new AdminValidator();
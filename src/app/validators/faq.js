const yup = require("../../config/yup");
const BaseValidator = require("../utils/base-validator");
const AppException = require("../../errors/app-exception");

class FaqValidator extends BaseValidator {
  constructor() {
    super();
  }

  upsert = async(req, res, next) => {
    const schema = yup.object({
      answer: yup.string().trim().required(),
      question: yup.string().trim().required(),
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

module.exports = new FaqValidator();
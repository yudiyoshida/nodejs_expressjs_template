const yup = require("../../config/yup");
const AppException = require("../../errors/app-exception");
const { TextType } = require("@prisma/client");

class TextValidator {
  update = async(req, res, next) => {
    const schema = yup.object({
      content: yup.string().trim().required()
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      req.body = await schema.cast(req.body, { stripUnknown: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  queryParams = async(req, res, next) => {
    const schema = yup.object({
      type: yup.string().trim().required().oneOf(Object.values(TextType))
    });

    try {
      req.query = await schema.validate(req.query, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };
}

module.exports = new TextValidator();
const yup = require("../../config/yup");
const AppException = require("../../errors/app-exception");
const { Status, UserType } = require("@prisma/client");

class BaseValidator {
  updateStatus = async(req, res, next) => {
    const schema = yup.object({
      status: yup.string().required().oneOf(Object.values(Status))
    });

    try {
      req.body = await schema.validate(req.body, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  queryParams = async(req, res, next) => {
    const schema = yup.object({
      status: yup.string().trim().oneOf(Object.values(Status)),
      type: yup.string().trim().oneOf(Object.values(UserType)),
      limit: yup.number().positive().integer(),
      page: yup.number().positive().integer(),
    });

    try {
      req.query = await schema.validate(req.query, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };

  pathParams = async(req, res, next) => {
    const schema = yup.object({
      id: yup.number().positive().integer(),
    });

    try {
      req.params = await schema.validate(req.params, { abortEarly: true });
      next();

    } catch(err) {
      next(new AppException(400, err.message));

    }
  };
}

module.exports = BaseValidator;
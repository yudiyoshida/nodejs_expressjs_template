const yup = require("../../config/yup");
const AppException = require("../../errors/app-exception");

class ContactValidator {
  sendEmail = async(req, res, next) => {
    const schema = yup.object({
      message: yup.string().required(),
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

module.exports = new ContactValidator();
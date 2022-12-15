const AppException = require("../../errors/app-exception");

class UploadController {
  upload = async(req, res, next) => {
    try {
      const { key, location:url } = req.file ?? { key: null, location: null };
      res.status(201).json({ key, url });

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new UploadController();
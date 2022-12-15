const TextService = require("../services/text");
const AppException = require("../../errors/app-exception");

class TextController {
  findByType = async(req, res, next) => {
    try {
      const result = await TextService.findByType(req.query.type);
      res.status(200).json(result);
    
    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  update = async(req, res, next) => {
    try {
      const result = await TextService.update(req.query.type, req.body);
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new TextController();
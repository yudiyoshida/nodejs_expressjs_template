const FaqService = require("../services/faq");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");

class FaqController {
  findAll = async(req, res, next) => {
    try {
      const result = await FaqService.findAll();
      res.status(200).json(result);
    
    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  create = async(req, res, next) => {
    try {
      const result = await FaqService.create(req.body);
      res.status(201).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  update = async(req, res, next) => {
    try {
      const faq = await FaqService.findById(req.params.id);
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      const result = await FaqService.update(faq.id, req.body);
      res.status(200).json(result);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  delete = async(req, res, next) => {
    try {
      const faq = await FaqService.findById(req.params.id);
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      await FaqService.delete(faq.id);
      res.sendStatus(204);

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new FaqController();
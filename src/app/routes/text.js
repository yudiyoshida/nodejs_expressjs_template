const { Router } = require("express");
const TextRoutes = Router();
const TextController = require("../controllers/text");
const TextValidator = require("../validators/text");
const AuthMiddleware = require("../middlewares/auth");
const { AdminPermission } = require("@prisma/client");

TextRoutes
  .route("/")
  .get(
    TextValidator.queryParams,
    TextController.findByType
  )
  .put(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.texts),
    TextValidator.queryParams, TextValidator.update,
    TextController.update
  );

module.exports = TextRoutes;
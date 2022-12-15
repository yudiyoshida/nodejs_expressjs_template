const { Router } = require("express");
const FaqRoutes = Router();
const FaqController = require("../controllers/faq");
const FaqValidator = require("../validators/faq");
const AuthMiddleware = require("../middlewares/auth");
const { AdminPermission } = require("@prisma/client");

FaqRoutes
  .route("/")
  .get(
    FaqController.findAll
  )
  .post(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.upsert,
    FaqController.create
  );

FaqRoutes
  .route("/:id")
  .put(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.pathParams, FaqValidator.upsert,
    FaqController.update
  )
  .delete(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.pathParams,
    FaqController.delete
  );

module.exports = FaqRoutes;
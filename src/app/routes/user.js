const { Router } = require("express");
const UserRoutes = Router();
const UserController = require("../controllers/user");
const UserValidator = require("../validators/user");
const AuthMiddleware = require("../middlewares/auth");
const { AdminPermission } = require("@prisma/client");

UserRoutes
  .route("/")
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.queryParams,
    UserController.findAll
  );

UserRoutes
  .route("/myself")
  .get(
    AuthMiddleware.isAuthenticated,
    UserController.findMyself
  );

UserRoutes
  .route("/:id")
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.pathParams,
    UserController.findById
  );

UserRoutes
  .route("/:id/update-status")
  .patch(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.pathParams, UserValidator.updateStatus,
    UserController.updateStatus
  );

module.exports = UserRoutes;
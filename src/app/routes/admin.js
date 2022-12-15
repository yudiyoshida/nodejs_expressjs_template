const { Router } = require("express");
const AdminRoutes = Router();
const AdminController = require("../controllers/admin");
const AdminValidator = require("../validators/admin");
const AuthMiddleware = require("../middlewares/auth");
const { AdminPermission } = require("@prisma/client");

const UserController = require("../controllers/user");
const UserValidator = require("../validators/user");

AdminRoutes
  .route("/")
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.queryParams,
    AdminController.findAll
  )
  .post(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.createAdmin,
    AdminController.createAdmin
  );

AdminRoutes
  .route("/permissions")
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin,
    AdminController.findAllPermissions
  );

AdminRoutes
  .route("/:id")
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.pathParams,
    AdminController.findById
  );

AdminRoutes
  .route("/:id/update-status")
  .patch(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    UserValidator.pathParams, UserValidator.updateStatus,
    UserController.updateStatus
  );

module.exports = AdminRoutes;
const { Router } = require("express");
const AuthRoutes = Router();
const AuthController = require("../controllers/auth");
const AuthValidator = require("../validators/auth");
const AuthMiddleware = require("../middlewares/auth");

const UserController = require("../controllers/user");
const UserValidator = require("../validators/user");

AuthRoutes
  .post("/login",
    AuthValidator.login,
    AuthController.login
  )
  .post("/forgot-password",
    AuthValidator.forgotPassword,
    AuthController.forgotPassword
  )
  .post("/reset-password",
    AuthValidator.resetPassword,
    AuthController.resetPassword
  )
  .post("/update-password",
    AuthMiddleware.isAuthenticated,
    AuthValidator.updatePassword,
    AuthController.updatePassword
  ).
  post("/validate-fields",
    AuthValidator.validateFields,
    AuthController.validateFields
  )
  .post("/validate-code",
    AuthValidator.validateCode,
    AuthController.validateCode
  )
  .post("/register",
    UserValidator.createUser,
    UserController.createUser
  );

module.exports = AuthRoutes;
require("dotenv/config");
const AppException = require("../../errors/app-exception");
const ErrorMessages = require("../../errors/error-messages");
const passport = require("../../config/passport");
const { UserType } = require("@prisma/client");

class AuthMiddleware {
  isAuthenticated = async(req, res, next) => {
    passport.authenticate("jwt", { session: false, failWithError: true },
      // eslint-disable-next-line no-unused-vars
      (err, payload, info) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.user = payload;
      }
    )(req, res, next);
    next();
  };

  isAdmin = async(req, res, next) => {
    try {
      if (!req.user.is_admin) throw new Error();
      else next();

    } catch(err) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  isApp = async(req, res, next) => {
    try {
      if (req.user.is_admin) throw new Error();
      if (req.user.type !== UserType.app) throw new Error();
      else next();

    } catch(err) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  isAuthorized = (permission) => {
    return async(req, res, next) => {
      try {
        // Checa se é user admin.
        if (!req.user.is_admin) return next();
        
        // Se sim, verifica se ele possui permissão no módulo.
        for (let elem of req.user.permissions) {
          if (elem.title === permission) return next();
        }
        throw new Error();      

      } catch(err) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  };
}

module.exports = new AuthMiddleware();
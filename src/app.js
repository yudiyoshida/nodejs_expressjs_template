require("dotenv/config");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet =  require("helmet");
const multer = require("multer");

const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerConfig = require("./config/swagger");

const routes = require("./app/routes");

const StorageHelper = require("./app/helpers/storage");
const AppException = require("./errors/app-exception");
const ErrorMessages = require("./errors/error-messages");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.globalErrorHandler();
  }

  middlewares() {
    this.app.use("/files", express.static(process.env.STORAGE_LOCAL));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: "*" }));
    this.app.use(compression());
    this.app.use(helmet());
  }

  // Desabilitar a rota do swagger quando fizer deploy em produção.
  routes() {
    this.app.use(routes);
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerConfig), { explorer: true }));
  }

  globalErrorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      // Função para deletar o arquivo caso ocorra algum erro.
      if (req.file) StorageHelper.deleteFile(req.file.key);
      
      if (err instanceof AppException) {
        const { status, message } = err;
        return res.status(status).json({ error: message });

      } else if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
  
      } else {
        return res.status(500).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR });

      }
    });
  }
}

module.exports = new App();
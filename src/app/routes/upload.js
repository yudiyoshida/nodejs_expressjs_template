const { Router } = require("express");
const UploadRoutes = Router();
const UploadController = require("../controllers/upload");

const multer = require("multer");
const multerConfig = require("../../config/storage");

UploadRoutes
  .route("/")
  .post(
    multer(multerConfig).single("image"),
    UploadController.upload
  );

module.exports = UploadRoutes;
const { Router } = require("express");
const ContactRoutes = Router();
const ContactController = require("../controllers/contact");
const ContactValidator = require("../validators/contact");

ContactRoutes
  .route("/")
  .post(
    ContactValidator.sendEmail,
    ContactController.sendEmail
  );

module.exports = ContactRoutes;
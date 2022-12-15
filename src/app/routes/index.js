const { Router } = require("express");
const routes = Router();

const AdminRoutes = require("./admin");
const AuthRoutes = require("./auth");
const ContactRoutes = require("./contact");
const FAQRoutes = require("./faq");
const TextRoutes = require("./text");
const UploadRoutes = require("./upload");
const UserRoutes = require("./user");

routes.use("/admins", AdminRoutes); // routes - validators - controllers - services (user).
routes.use("/auth", AuthRoutes); // routes - validators - controllers - services (user e security).
routes.use("/contact", ContactRoutes); // routes - validators - controllers.
routes.use("/faqs", FAQRoutes); // routes - validators - controllers - services (faq).
routes.use("/texts", TextRoutes); // routes - validators - controllers - services (text).
routes.use("/upload-file", UploadRoutes); // routes - controllers.
routes.use("/users", UserRoutes); // routes - validators - controllers - services (user).

module.exports = routes;
require("dotenv/config");
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports.
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      },
      default: {
        from: `[name] <${process.env.SMTP_FROM}>`
      }
    });

    this.setEmailTemplate();
  }

  setEmailTemplate() {
    const viewPath = path.resolve(__dirname, "..", "..", "resources", "templates", "email");
    const options = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "default",
        layoutsDir: path.resolve(viewPath, "layouts"),
        partialsDir: path.resolve(viewPath, "partials"),
      },
      viewPath,
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(options));
  }

  async sendEmail(to, subject, template, context) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        template,
        context
      });

    } catch(err) {
      return err;

    }
  }
}

module.exports = new Mail();
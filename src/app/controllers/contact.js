require("dotenv/config");
const AppException = require("../../errors/app-exception");
const Mail = require("../../lib/nodemailer");

class ContactController {
  sendEmail = async(req, res, next) => {
    try {
      await Mail.sendEmail(process.env.SMTP_TO, "Alguém entrou em contato!", "contact", req.body);
      res.status(200).json({ message: "Mensagem enviada com sucesso! Em breve entraremos em contato." });

    } catch(err) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

module.exports = new ContactController();
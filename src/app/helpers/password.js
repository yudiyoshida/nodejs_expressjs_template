const crypto = require("crypto");

class PasswordHelper {
  generateRandomPassowrd() {
    return crypto.randomBytes(12).toString("hex").slice(0, 8);
  }

  passwordEqualsConfirmation(password, confirmation) {
    return (password === confirmation);
  }
}

module.exports = new PasswordHelper();
const bcrypt = require("bcryptjs");

class HashHelper {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = new HashHelper();
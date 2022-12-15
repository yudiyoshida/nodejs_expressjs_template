const crypto = require("crypto");

class CodeHelper {
  generateCode(minutes) {
    const now = new Date();
    const code = crypto.randomBytes(12).toString("hex").slice(0, 4);
    const code_expires_in = new Date(now.setMinutes(now.getMinutes() + minutes));

    return { code, code_expires_in };
  }

  isExpired(code_expires_in) {
    const now = new Date();
    return (code_expires_in - now <= 0);
  }
}

module.exports = new CodeHelper();
require("dotenv/config");
const fs = require("fs");

let options;
if (process.env.NODE_ENV === "production") {
  options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    ca: fs.readFileSync(process.env.SSL_CA)
  };

} else {
  options = {};

}

module.exports = options;
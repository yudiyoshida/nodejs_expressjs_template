require("dotenv/config");
const aws = require("aws-sdk");
const crypto = require("crypto");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AppException = require("../errors/app-exception");

const ALLOWED_MIMES = ["image/jpeg", "image/png"];
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: process.env.STORAGE_LOCAL,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      file.key = `${fileHash}-${file.originalname}`;
      file.location = `${process.env.APP_URL}/files/${file.key}`;
      return callback(null, file.key, file.location);
    }
  }),
  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    }),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    }
  })
};

module.exports = {
  dest: process.env.STORAGE_LOCAL,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES
  },
  fileFilter: (req, file, callback) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) return callback(null, true);
    else return callback(new AppException(415, "Tipo de arquivo não suportado."));
  }
};
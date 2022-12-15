require("dotenv/config");
const aws = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

class StorageHelper {
  async deleteFile(key) {
    if (process.env.STORAGE_TYPE === "s3") {
      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      return await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      }).promise();
        
    } else {
      return await promisify(fs.unlink)(
        path.resolve(process.env.STORAGE_LOCAL, key)
      );

    }
  }
}

module.exports = new StorageHelper();
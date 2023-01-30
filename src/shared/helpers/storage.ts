import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

class StorageHelper {
  public async deleteFile(key: string) {
    if (process.env.STORAGE_TYPE === 's3') {
      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        region: process.env.AWS_REGION as string,
      });

      return await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: key,
      }).promise();

    } else {
      return await promisify(fs.unlink)(path.resolve(process.env.STORAGE_LOCAL as string, key));

    }
  }
}

export default new StorageHelper();

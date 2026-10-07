import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

export const r2 = new S3Client({
    region : "auto",
    endpoint : process.env.R2_ENDPOINT,
    credentials : {
        accessKeyId : process.env.R2_ACCESS_KEY_ID,
        secretAccessKey : process.env.R2_SECRET_ACCESS_KEY,
    },
});

export { PutObjectCommand };
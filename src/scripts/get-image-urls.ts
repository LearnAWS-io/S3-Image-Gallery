import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "us-east-1" });

const Bucket = import.meta.env.S3_BUCKET_NAME;

export const getImageUrls = async () => {
  const listCmd = new ListObjectsV2Command({
    Bucket,
    Prefix: "images/",
  });

  const { Contents } = await s3Client.send(listCmd);

  if (!Contents) {
    throw Error("no objects returned from s3");
  }

  const signedURLReqs = [];

  for (let index = 1; index < Contents.length; index++) {
    const key = Contents[index].Key;
    const getObjCmd = new GetObjectCommand({ Bucket, Key: key });
    signedURLReqs.push(getSignedUrl(s3Client, getObjCmd, { expiresIn: 3600 }));
  }

  return Promise.all(signedURLReqs);
};

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import type { APIRoute } from "astro";
import { defKSUID32 } from "@thi.ng/ksuid";
import { s3Client } from "../../scripts/get-image-urls";

const ksuid = defKSUID32();

export const get: APIRoute = async () => {
  const res = await createPresignedPost(s3Client, {
    Bucket: import.meta.env.S3_BUCKET_NAME,
    // filename is variable in s3
    Key: `images/${ksuid.next()}__\${filename}`,
    Conditions: [
      ["starts-with", "$Content-Type", "image/jp"],
      ["eq", "$Content-Type", "image/png"],
      // file size limit
      ["content-length-range", 10, 2_000_000],
    ],
    Expires: 20,
  });

  return { body: JSON.stringify(res) };
};

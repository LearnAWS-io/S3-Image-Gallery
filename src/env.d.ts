/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly S3_BUCKET_NAME: string;

  //NOTE: private key needs to be base64 encoded without newlines
  readonly CF_PRIVATE_KEY: string;
  readonly CF_KEYPAIR_ID: string;
  readonly CF_DOMAIN: string;

  //NOTE: IAM user must have access to S3
  readonly AWS_ACCESS_KEY_ID: string;
  readonly AWS_ACCESS_KEY_SECRET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

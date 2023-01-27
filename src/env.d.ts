/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly S3_BUCKET_NAME: string;
  readonly PUBLIC_POKEAPI: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

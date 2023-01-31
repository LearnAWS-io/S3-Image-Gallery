import { defineConfig } from "astro/config";
import fs from "fs";
// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    server: {
      https: {
        // TODO: generate your own certificate using: mkcert domain.com
        key: fs.readFileSync("./local.nootnoot.in-key.pem"),
        cert: fs.readFileSync("./local.nootnoot.in.pem"),
      },
    },
  },
});

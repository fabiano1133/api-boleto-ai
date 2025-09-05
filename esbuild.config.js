const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    outdir: "dist",
    sourcemap: true,
    format: "cjs",
    external: ["express", "mongo", "bcrypt", "jwt"],
    tsconfig: "tsconfig.json",
  })
  .catch(() => process.exit(1));

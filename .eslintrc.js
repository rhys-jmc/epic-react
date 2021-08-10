// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "only-error"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
  ],
  overrides: [
    { files: ["*.js"], env: { node: true } },
    { files: ["*.tsx"], env: { browser: true } },
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    },
  ],
});

// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "only-error"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:eslint-comments/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    // "@typescript-eslint/prefer-readonly-parameter-types": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/typedef": "error",
    "@typescript-eslint/unified-signatures": "error",
  },
  overrides: [
    {
      files: ["./*.js"],
      env: { node: true },
      rules: { "@typescript-eslint/no-var-requires": "off" },
    },
    { files: ["*.tsx"], env: { browser: true } },
  ],
});

import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Apply the recommended JavaScript rules globally
  js.configs.recommended,

  // 2. Project-specific adjustments for Node.js
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Enables Node.js variables (process, __dirname, etc.)
      },
    },
    rules: {
      // You can add your custom rule overrides here
      "no-unused-vars": "warn",
    },
  },
];

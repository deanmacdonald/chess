import js from "@eslint/js";
import next from "eslint-plugin-next";
import globals from "globals";

export default [
  js.configs.recommended,
  next.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];

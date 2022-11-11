module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "vue/no-multiple-template-root": "off",
    "no-use-before-define": "off",
    "global-require": 0,
    "import/extensions": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
  },
};

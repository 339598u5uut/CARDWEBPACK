//eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  root: true,
  extends: ["plugin:jest/recommended", "prettier"],
  plugins: ["prettier", "jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-alert": 0,
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": 0,
    "no-iterator": 0,
    "no-restricted-syntax": [2, "WithStatement"],
    "func-style": 0,
    "no-var": "error",
    "prettier/prettier": "error",
  },
};

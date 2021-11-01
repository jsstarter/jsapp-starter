module.exports = {
  env: {
    browser: false,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'no-console': 'off',
  },
};

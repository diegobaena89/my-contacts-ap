module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'array-callback-return': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'no-unused-expressions': 'off',
    'prefer-const': 'off',
    camelcase: 'off',
    'no-unused-vars': ['next', { argsIgnorePatterns: 'next' }],
  },
};

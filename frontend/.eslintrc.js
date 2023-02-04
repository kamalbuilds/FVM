module.exports = {
  extends: ['@moralisweb3', 'plugin:@next/next/recommended'],
  ignorePatterns: ['**/build/**/*'],
  rules: {
    'no-console': 'off',
    "@typescript-eslint/no-unused-vars": "off",
    "etc/no-commented-out-code": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  env: {
    'browser': true
  }
};

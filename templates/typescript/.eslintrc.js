module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['tests', '.eslintrc.*'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    'prettier/prettier': 0,
  },
};

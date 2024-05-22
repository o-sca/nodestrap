module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'commitlint*',
    'esbuild*',
    '*.json',
    '*.yml',
    'dist',
    'tests',
    'templates',
  ],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
  },
};

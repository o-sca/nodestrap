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
    ignorePatterns: ['templates/**/*', 'tests', '.eslintrc.*'],
    extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};

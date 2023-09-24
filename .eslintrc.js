module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module"
  },
  "root": true,
  "env": {
    "node": true,
    "jest": true
  },
  "ignorePatterns": [
    "templates"
  ],
  "extends": [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [],
  "plugins": [
    "@typescript-eslint/eslint-plugin"
  ],
  "rules": {}
}

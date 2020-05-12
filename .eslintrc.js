module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    "eslint-config-prettier", // Disable conflicting ruls
    'eslint-config-prettier/@typescript-eslint',
    // Enable prettier plugin to run Prettier as an ESLint rule
    "plugin:prettier/recommended",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    // Runs Prettier as an ESLint rule
    'prettier',
  ],
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  rules: {
    "node/no-unsupported-features/es-syntax": 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts' ]
    }
  },
};

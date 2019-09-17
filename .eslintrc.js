module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  parser: "@typescript-eslint/parser",
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  plugins: [
    'react-hooks',
    'simple-import-sort',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    semi: [2, "always"],
    "react/jsx-boolean-value": [2, "always"],
    'react/prop-types': 0,
    "react/sort-comp": [1],
    "comma-dangle": ["error", "always-multiline"],
    "no-confusing-arrow": 0,
    "arrow-parens": 0,
    "arrow-body-style": 0,
    "object-curly-newline": 0,
    "prefer-destructuring": 0,
    "react/require-default-props": 0,
    "react/destructuring-assignment": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": 0,
    "react/jsx-wrap-multilines": 0,
    "operator-linebreak": 0,
    "react/prefer-stateless-function": 0,
    "no-plusplus": 0,
    'simple-import-sort/sort': 'error',
    'no-console': ['warn', { allow: ['error'] }],
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    '@typescript-eslint/explicit-function-return-type': 0,
  }
};

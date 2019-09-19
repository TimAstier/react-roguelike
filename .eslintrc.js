module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'storytel',
    'prettier',
  ],
  plugins: ['react-hooks', 'simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'simple-import-sort/sort': 'error',
    'no-console': ['warn', { allow: ['error'] }],
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
    camelcase: ['error', { allow: ['^UNSAFE_'] }],
    'consistent-return': 0,
  },
  env: {
    jest: true,
  },
};

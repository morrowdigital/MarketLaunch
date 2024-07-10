module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['mobx', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:mobx/recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    'mobx/missing-observer': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars": [
      'warn',
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  },
  root: true,
};

// TODO: enable no-console log rule and add another logger tha logs in development only

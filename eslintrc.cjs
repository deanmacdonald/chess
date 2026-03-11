module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // React 17+ does not require importing React for JSX
    'react/react-in-jsx-scope': 'off',

    // You are not using PropTypes (and don’t need to)
    'react/prop-types': 'off',

    // Cleaner dev experience
    'no-unused-vars': 'warn'
  }
}

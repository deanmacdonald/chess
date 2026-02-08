// eslint.config.js

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import parser from '@babel/eslint-parser'

export default [
  // Ignore build output and vendor code
  {
    ignores: ['dist/', 'build/', 'node_modules/', '*.min.js', '**/*.min.js'],
  },

  // Main React + JSX config
  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.es2021,
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    rules: {
      // React 18: no need to import React
      'react/react-in-jsx-scope': 'off',

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Unused vars should not block development
      'no-unused-vars': 'warn',

      // Vite handles globals, so disable this
      'no-undef': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

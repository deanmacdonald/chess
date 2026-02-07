import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Base JS rules
  js.configs.recommended,

  // React + JSX files
  {
    files: ['**/*.jsx', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Web Worker globals (Stockfish worker)
  {
    files: ['**/*.worker.js'],
    languageOptions: {
      globals: {
        postMessage: 'readonly',
        onmessage: 'readonly',
      },
    },
  },

  // Vitest test environment
  {
    files: ['**/*.test.js', '**/*.test.jsx'],
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },

  // Replaces .eslintignore
  {
    ignores: ['dist/', 'node_modules/'],
  },
]

import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]

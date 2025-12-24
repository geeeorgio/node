// @ts-check
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended, // Base ESLint rules
  ...tseslint.configs.recommended, // Standard TypeScript rules
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      globals: {
        ...globals.node, // Allows Node.js global variables like 'process' or '__dirname'
      },
    },
    rules: {
      semi: ['error', 'always'],

      /* Variable Shadowing */
      'no-shadow': 'off', // Turn off base rule
      '@typescript-eslint/no-shadow': 'error', // Use TS-aware rule to prevent variable naming conflicts

      /* Unused Imports/Variables Management */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // Ignore variables starting with underscore
          args: 'after-used',
          argsIgnorePattern: '^_', // Ignore arguments starting with underscore
        },
      ],

      /* Import Organization */
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node:fs, node:path etc.
            'external', // express, cors etc.
            'internal', // aliases
            'parent', // ../
            'sibling', // ./
            'index', // ./index
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      /* Best Practices */
      '@typescript-eslint/consistent-type-imports': 'error', // Enforce 'import type' for better performance
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ], // Discourage leaving console.logs in production code
    },
  },
);

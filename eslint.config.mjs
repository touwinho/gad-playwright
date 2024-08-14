import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierRecommended from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';

export default [
  pluginJs.configs.recommended,
  prettierRecommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { browser: true, es2021: true, node: true, ...globals.browser }
    }
  },
  ...tsEslint.configs.recommended
];

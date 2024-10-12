import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// !NOTE: Add types to eslint-mocked-types.d.ts if getting TS error for plugins

export default tseslint.config(
  gitignore(),
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  // react eslint config
  {
    files: ['**/*.{ts,tsx}'],
    ...reactRecommended,
    ...reactJsxRuntime,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.webextensions,
      },
    },
  },
  // react hooks eslint config
  {
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  // configure & override all rules
  {
    rules: {
      /**
       * TODO: Remove once this is closed
       * @link https://github.com/typescript-eslint/typescript-eslint/issues/9902#issuecomment-2316722449
       */
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-base-to-string': [
        'error',
        {
          ignoredTypeNames: ['TRPCError'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-useless-undefined': 'off',
    },
  },
  // ? NOTE: always keep this at last; prettier eslint config.
  eslintPluginPrettierRecommended
);

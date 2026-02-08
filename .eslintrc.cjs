module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.app.json'],
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'react-hooks'],
  extends: ['eslint:recommended'],
  rules: {
    // Ensure React Fast Refresh works properly in dev.
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Enforce the official React Hooks rules.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  ignorePatterns: ['dist', 'node_modules']
};


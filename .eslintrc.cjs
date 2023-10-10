module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-shadow': ['error', { hoist: 'never' }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'testing-library/no-manual-cleanup': 'off', //vitest seems to need manual cleanup
    'tailwindcss/classnames-order': 'off' // For some reason this won't auto fix
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

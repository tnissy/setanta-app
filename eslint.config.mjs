const eslintConfig = [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: await Promise.all([
      import('@typescript-eslint/eslint-plugin').then(m => m.default),
      import('eslint-plugin-react').then(m => m.default)
    ]).then(([typescriptEslint, react]) => ({
      '@typescript-eslint': typescriptEslint,
      'react': react
    })),
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react/react-in-jsx-scope': 'off'
    }
  }
];

export default eslintConfig;
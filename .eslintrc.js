module.exports = {
   env: {
      es2021: true,
      node: true,
   },
   extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: [
      '@typescript-eslint',
   ],
   rules: {
      'arrow-body-style': 'off',
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            ts: 'never',
         },
      ],
      'class-methods-use-this': 'off',
      camelcase: 'off',
      indent: ['error', 3],
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': 'off',
      semi: 'off',
      '@typescript-eslint/semi': ['error'],
   },
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
         },
         typescript: {

         },
      },
   },
};

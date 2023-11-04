module.exports = {
  extends: [
    'eslint-config-hs',
  ],
  overrides: [
    {
      files: ['./**/*.ts', './**/*.tsx'],
      extends: [
        'eslint-config-hs/typescript',
      ],
      parserOptions: {
        project: './tsconfig.json', // tsconfig 파일 등록
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            'checksVoidReturn': false,
          },
        ],
      },
    },
  ],
};

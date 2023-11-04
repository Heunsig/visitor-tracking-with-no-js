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
      },
    },
  ],
};

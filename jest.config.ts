import type { Config } from 'jest';
import dotenv from 'dotenv';

// .env ファイルの内容を読み込む
dotenv.config();

const config: Config = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '^@env$': '<rootDir>/.env', // @env は dotenv で読み込むので、不要なら削除します
  },
  // setupFiles でさらに初期化処理が必要な場合は指定します
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/__test__/**/*.test.{ts,tsx}',
    '<rootDir>/src/__integration__/**/*.test.{ts,tsx}'
  ],
};

export default config;

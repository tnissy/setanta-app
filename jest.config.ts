import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [], // jest.setup.ts を削除
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
};

export default config;

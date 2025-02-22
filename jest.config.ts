import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@env$': '<rootDir>/.env',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/__test__/**/*.test.{ts,tsx}',
    '<rootDir>/src/__integration__/**/*.test.{ts,tsx}'
  ],
};

export default config;

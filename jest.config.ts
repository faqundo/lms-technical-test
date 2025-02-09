export default {
  clearMocks: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js'],
};
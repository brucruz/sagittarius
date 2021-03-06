export default {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFilesAfterEnv: ['<rootDir>/src/config/setupTests.ts'],
};

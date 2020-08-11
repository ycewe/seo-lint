// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  verbose: false,
}

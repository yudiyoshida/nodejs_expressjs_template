/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@config/(.*)': ['<rootDir>/src/config/$1'],
    '@database/(.*)': ['<rootDir>/src/database/$1'],
    '@errors/(.*)': ['<rootDir>/src/errors/$1'],
    '@libs/(.*)': ['<rootDir>/src/libs/$1'],
    '@helpers/(.*)': ['<rootDir>/src/modules/shared/helpers/$1'],
    '@middlewares/(.*)': ['<rootDir>/src/modules/shared/middlewares/$1'],
    '@abstracts/(.*)': ['<rootDir>/src/modules/utils/abstracts/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/modules/utils/interfaces/$1'],
    '@customTypes/(.*)': ['<rootDir>/src/modules/utils/types/$1'],
  },
};

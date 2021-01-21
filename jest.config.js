module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  roots: ['<rootDir>/src'],
  testRegex: '.*__spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

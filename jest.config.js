module.exports = {
  rootDir  : './src',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$'      : 'babel-jest',
  },
  setupFilesAfterEnv: [
    '../jest/setup.ts',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleFileExtensions: [ 'js', 'ts' ],
};

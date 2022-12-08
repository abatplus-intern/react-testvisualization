module.exports = {
    testRegex: 'src/.*\\.test\\.tsx?$',
    setupFilesAfterEnv: ['./test/setupTests.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/test/fileTransformer.js',
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.jest.json',
        },
    },
};

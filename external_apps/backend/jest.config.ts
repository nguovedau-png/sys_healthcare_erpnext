import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
};

export default config;

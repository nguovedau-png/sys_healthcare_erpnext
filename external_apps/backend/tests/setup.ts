import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import prisma from '../src/config/prisma';

jest.mock('../src/config/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../src/modules/queue/queue.service', () => ({
    queues: {
        email: { add: jest.fn() },
        notification: { add: jest.fn() },
        heavy: { add: jest.fn() },
    },
}));

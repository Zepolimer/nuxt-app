// @vitest-environment nuxt
import { describe, it, expect, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';

// Mock prismaClient methods
vi.mock('@prisma/client', () => {
    return {
        PrismaClient: vi.fn().mockImplementation(() => {
            return {
                task: {
                    findMany: vi.fn().mockResolvedValue([
                        {
                            id: 1,
                            title: 'Add item',
                            description: 'Add new item',
                            status: false
                        },
                        {
                            id: 2,
                            title: 'Documentation',
                            description: 'Create and share documentation',
                            status: true
                        },
                    ]),
                    create: vi.fn().mockResolvedValue({
                        id: 3,
                        title: 'Unittests',
                        description: 'Write and run unittests',
                        status: false,
                    }),
                    update: vi.fn().mockResolvedValue({
                        id: 3,
                        title: 'Unittests',
                        description: 'Write and run unittests including API endpoints',
                        status: true,
                    }),
                    delete: vi.fn().mockResolvedValue({
                        success: true
                    }),
                },
            };
        }),
    }
})


describe('Prisma task CRUD operations', () => {
    let prisma = new PrismaClient()

    it('Prisma fetch tasks', async () => {
        let tasks = await prisma.task.findMany()

        expect(tasks).toHaveLength(2)

        let task = tasks[0]
        expect(task.id).toEqual(1)
        expect(task.title).toEqual('Add item')
        expect(task.description).toEqual('Add new item')
        expect(task.status).toEqual(false)

        task = tasks[1]
        expect(task.id).toEqual(2)
        expect(task.title).toEqual('Documentation')
        expect(task.description).toEqual('Create and share documentation')
        expect(task.status).toEqual(true)
    })

    it('Prisma create and update task', async () => {
        let task = {
            title: 'Unittests',
            description: 'Write and run unittests',
            status: false,
        }

        // Use prisma.task.create to add a new task
        let createdTask = await prisma.task.create({
            data: task
        })

        expect(createdTask.id).toEqual(3)
        expect(createdTask.title).toEqual('Unittests')
        expect(createdTask.description).toEqual('Write and run unittests')
        expect(createdTask.status).toEqual(false)

        // Use prisma.task.update to update previous created task
        let updatedTask = await prisma.task.update({
            where: {
                id: 3
            },
            data: {
                title: createdTask.title,
                description: 'Write and run unittests including API endpoints',
                status: !createdTask.status,
            }
        })

        expect(updatedTask.id).toEqual(3)
        expect(updatedTask.title).toEqual('Unittests')
        expect(updatedTask.description).toEqual('Write and run unittests including API endpoints')
        expect(updatedTask.status).toEqual(true)
    })

    it('Prisma delete task', async () => {
        let deletedTask = await prisma.task.delete({
            where: {
                id: 1
            },
        })

        expect(deletedTask).toMatchObject({
            success: true
        })
    })
});
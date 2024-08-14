import {describe, expect, vi, beforeEach, test} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { Task } from '~/services/task/models'
import { TaskApi } from '~/services/task/api'

import { PositiveNotify } from '~/services/notifiy'


// Mock dependencies
vi.mock('~/services/task/api')
vi.mock('~/services/notifiy')

describe('Task Store CRUD operations', () => {
    let store: ReturnType<typeof useTaskStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useTaskStore()

        vi.resetAllMocks()
    })

    test('getAll => fetch all tasks and update the store', async() => {
        vi.mocked(TaskApi.list).mockResolvedValue({
            statusCode: 200,
            data: [
                {
                    id: 11,
                    title: 'Add item',
                    description: 'Add new item',
                    status: false
                },
                {
                    id: 12,
                    title: 'Documentation',
                    description: 'Create and share documentation',
                    status: true
                },
            ],
            error: null
        })

        await store.getAll()
        expect(store.tasks).toHaveLength(2)

        let task = store.tasks[0]
        expect(task).toBeInstanceOf(Task)
        expect(task.id).toBe(11)

        task = store.tasks[1]
        expect(task).toBeInstanceOf(Task)
        expect(task.id).toBe(12)
    })

    test('addTask => add a new task to the store', async() => {
        vi.mocked(TaskApi.add).mockResolvedValue({
            statusCode: 201,
            data: {
                id: 101,
                title: 'New Task',
                description: 'New description',
                status: false
            },
            error: null
        })

        await store.addTask(new Task())
        expect(store.tasks).toHaveLength(1)

        let task = store.tasks[0]
        expect(task.id).toBe(101)
        expect(task.title).toBe('New Task')
        expect(task.description).toBe('New description')
        expect(task.status).toBe(false)

        expect(PositiveNotify).toHaveBeenCalledWith('Task created successfully')
    })

    test('updateTask => update an existing task in the store', async () => {
        store.tasks = [
            Object.assign(
                new Task(),
                {
                    id: 99,
                    title: 'Documentation',
                    description: 'Write documentation',
                    status: false
                }
            )
        ]

        vi.mocked(TaskApi.update).mockResolvedValue({
            statusCode: 200,
            data: {
                id: 99,
                title: 'Documentation',
                description: 'Write documentation',
                status: true
            },
            error: null
        })

        await store.updateTask(new Task())

        expect(store.tasks).toHaveLength(1)

        let task = store.tasks[0]
        expect(task.id).toBe(99)
        expect(task.status).toBe(true)

        expect(PositiveNotify).toHaveBeenCalledWith('Task updated successfully')
    })

    test('deleteTask => remove a task from the store', async () => {
        store.tasks = [
            Object.assign(
                new Task(),
                {
                    id: 18,
                    title: 'Documentation',
                    description: 'Delete documentation',
                    status: true
                }
            )
        ]

        vi.mocked(TaskApi.delete).mockResolvedValue({
            statusCode: 204,
            data: {
                id: 18,
                title: 'Documentation',
                description: 'Delete documentation',
                status: true
            },
            error: null
        })

        await store.deleteTask(18)

        expect(store.tasks).toHaveLength(0)
        expect(PositiveNotify).toHaveBeenCalledWith('Task deleted successfully')
    })
})
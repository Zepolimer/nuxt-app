// @vitest-environment nuxt
import {test, expect, vi} from 'vitest';
import {TaskApi} from "~/services/task/api";


vi.stubGlobal('fetch', (url: string, options: any) => {
    if (url === '/api/task' && options.method === 'GET') {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve([
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
            ])
        });
    }

    return Promise.reject(new Error(`Unhandled request: ${url}`));
})

test('GET /api/task => tasks as TaskListResponse', async() => {
    let response = await TaskApi.list()

    expect(response.statusCode).toEqual(200)
    expect(response.error).toEqual(null)

    let task = response.data[0]
    expect(task.id).toEqual(1)
    expect(task.title).toEqual('Add item')
    expect(task.description).toEqual('Add new item')
    expect(task.status).toEqual(false)

    task = response.data[1]
    expect(task.id).toEqual(2)
    expect(task.title).toEqual('Documentation')
    expect(task.description).toEqual('Create and share documentation')
    expect(task.status).toEqual(true)
})
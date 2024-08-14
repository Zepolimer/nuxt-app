// @vitest-environment nuxt
import {test, expect, vi} from 'vitest';
import {TaskApi} from "~/services/task/api";
import {Task} from "~/services/task/models";


vi.stubGlobal('fetch', (url: string, options: any) => {
    if (url === '/api/task' && options.method === 'POST') {
        return Promise.resolve({
            status: 201,
            json: () => Promise.resolve({
                id: 123,
                title: 'Documentation',
                description: 'Create and share documentation',
                status: false
            })
        });
    }

    return Promise.reject(new Error(`Unhandled request: ${url}`));
})

test('POST /api/task => task as TaskResponse', async() => {
    let obj = new Task()
    obj.title = 'Documentation'
    obj.description = 'Create and share documentation'
    obj.status = false

    let response = await TaskApi.add(obj)

    expect(response.statusCode).toEqual(201)
    expect(response.error).toEqual(null)

    let task = response.data
    expect(task.id).toEqual(123)
    expect(task.title).toEqual('Documentation')
    expect(task.description).toEqual('Create and share documentation')
    expect(task.status).toEqual(false)
})
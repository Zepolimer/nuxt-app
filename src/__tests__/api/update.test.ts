// @vitest-environment nuxt
import {test, expect, vi} from 'vitest';
import {TaskApi} from "~/services/task/api";
import {Task} from "~/services/task/models";


vi.stubGlobal('fetch', (url: string, options: any) => {
    if (url === '/api/task/110' && options.method === 'PUT') {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                id: 110,
                title: 'Documentation',
                description: 'Update and share documentation for unittest',
                status: true
            })
        });
    }

    return Promise.reject(new Error(`Unhandled request: ${url}`));
})

test('POST /api/task/:id => task as TaskResponse', async() => {
    let obj = new Task()
    obj.id = 110
    obj.title = 'Documentation'
    obj.description = 'Update and share documentation for unittest'
    obj.status = true

    let response = await TaskApi.update(obj)

    expect(response.statusCode).toEqual(200)
    expect(response.error).toEqual(null)

    let task = response.data
    expect(task.id).toEqual(110)
    expect(task.title).toEqual('Documentation')
    expect(task.description).toEqual('Update and share documentation for unittest')
    expect(task.status).toEqual(true)
})
// @vitest-environment nuxt
import {test, expect, vi} from 'vitest';
import {TaskApi} from "~/services/task/api";


vi.stubGlobal('fetch', (url: string, options: any) => {
    if (url === '/api/task/110' && options.method === 'DELETE') {
        return Promise.resolve({
            status: 204,
            json: () => Promise.resolve({
                id: 110,
                title: 'Documentation',
                description: 'Write documentation for unittest',
                status: true
            })
        });
    }

    return Promise.reject(new Error(`Unhandled request: ${url}`));
})

test('DELETE /api/task/:id => task as TaskResponse', async() => {
    let response = await TaskApi.delete(110)

    expect(response.statusCode).toEqual(204)
    expect(response.error).toEqual(null)

    let task = response.data
    expect(task.id).toEqual(110)
    expect(task.title).toEqual('Documentation')
    expect(task.description).toEqual('Write documentation for unittest')
    expect(task.status).toEqual(true)
})
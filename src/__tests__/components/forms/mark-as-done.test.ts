import { describe, it, expect, vi, beforeEach } from 'vitest';

import {setup} from '@nuxt/test-utils';
import {mount} from '@vue/test-utils';

import {createPinia, setActivePinia} from 'pinia';
import {useTaskStore} from '~/stores/task';
import {Task} from '~/services/task/models';

import MarkAsDoneTask from '~/components/forms/mark-as-done';


vi.mock('~/services/task/api')
vi.mock('quasar', () => import('../quasar-mock'))

describe('Mark as Done or Pending', () => {
    setup({
        browser: true
    })

    let store: ReturnType<typeof useTaskStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useTaskStore()

        store.updateTask = vi.fn().mockResolvedValue({
            statusCode: 200,
            data: {
                id: 99,
                title: 'Pending Task',
                description: 'This Pending task need to be passed as Done',
                status: true
            },
            error: null
        })
    })

    it('toggle task status', async () => {
        const task = new Task()
        task.id = 99
        task.title = 'Pending Task'
        task.description = 'This Pending task need to be passed as Done'
        task.status = false

        const component = mount(MarkAsDoneTask, {
            props: {
                task: task
            },
        })

        expect(component.vm.task.status).toBe(false)
        await component.findComponent({ name: 'QCheckbox' }).setValue(true)

        expect(store.updateTask).toHaveBeenCalledWith(expect.objectContaining({
            id: 99,
            title: 'Pending Task',
            description: 'This Pending task need to be passed as Done',
            status: true
        }))
    })
})
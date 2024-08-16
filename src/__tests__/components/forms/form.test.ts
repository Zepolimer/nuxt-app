import {beforeEach, describe, expect, test, vi} from 'vitest';

import {setup} from '@nuxt/test-utils';
import {mount} from '@vue/test-utils';

import TaskForm from '~/components/forms/index'
import {Task} from '~/services/task/models';


vi.mock('quasar', () => import('../quasar-mock'))

describe('Form E2E : create and update', () => {
    setup({
        browser: true
    })

    let task: Task = new Task()
    let onClickMock = vi.fn()

    beforeEach(() => {
        task.title = 'Add e2e'
        task.description = 'Add End-to-end unittests'
        task.status = false
    })

    test('Render form and quasar components', async () => {
        let component = mount(TaskForm, {
            props: {
                task: new Task(),
                onClick: onClickMock()
            },
        })

        expect(component.html()).toBeTruthy()

        expect(component.findComponent({ name: 'QInput' }).exists()).toBe(true)
        expect(component.findComponent({ name: 'QCheckbox' }).exists()).toBe(true)
        expect(component.findComponent({ name: 'QBtn' }).exists()).toBe(true)
    })

    test('Add a new task', async () => {
        let component = mount(TaskForm, {
            props: {
                task: new Task(),
                onClick: onClickMock()
            },
        })

        let inputs = component.findAllComponents({ name: 'QInput' })
        await inputs[0].setValue('Add e2e')
        await inputs[1].setValue('Add End-to-end unittests')

        expect(component.vm.task).toEqual({
            id: 0,
            title: 'Add e2e',
            description: 'Add End-to-end unittests',
            status: false
        })

        await component.findComponent({ name: 'QBtn' }).trigger('click')
        expect(onClickMock).toHaveBeenCalled()
    })

    test('Update task fields', async () => {
        const component = mount(TaskForm, {
            props: {
                task: task,
                onClick: onClickMock()
            }
        })

        let inputs = component.findAllComponents({ name: 'QInput' })
        await inputs[0].setValue('Update e2e')
        await inputs[1].setValue('Update End-to-end unittests')

        await component.findComponent({ name: 'QCheckbox' }).setValue(true)

        expect(component.vm.task).toEqual({
            id: 0,
            title: 'Update e2e',
            description: 'Update End-to-end unittests',
            status: true
        })

        await component.findComponent({ name: 'QBtn' }).trigger('click')
        expect(onClickMock).toHaveBeenCalled()
    })
})
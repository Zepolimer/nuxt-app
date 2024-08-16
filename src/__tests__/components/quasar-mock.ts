import { vi } from 'vitest';

const createComponent = (name: string) => ({
    name,
    render: vi.fn()
})

export const QBtn = createComponent('QBtn')
export const QInput = createComponent('QInput')
export const QCheckbox = createComponent('QCheckbox')

export const Quasar = {
    install: vi.fn()
}

export const Dark = {
    isActive: false,
    set: vi.fn()
}

export default {
    Quasar,
    Dark,
    QBtn,
    QInput,
    QCheckbox
}
import {defineVitestConfig} from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        setupFiles: './__tests__/setup'
    },
})

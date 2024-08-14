// https://nuxt.com/docs/api/configuration/nuxt-config

import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    compatibilityDate: '2024-08-12',
    modules: [
        '@pinia/nuxt',
        'nuxt-quasar-ui',
        '@nuxt/test-utils/module'
    ],
    quasar: {
        plugins: [
            'BottomSheet',
            'Dialog',
            'Loading',
            'LoadingBar',
            'Notify',
            'Dark',
        ],
        extras: {
            font: 'roboto-font',
        },
        components: {
            defaults: {
                QBtn: {
                    unelevated: true,
                },
            },
        },
    },
    css: ['~/assets/css/global.css'],
});
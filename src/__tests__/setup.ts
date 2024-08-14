import {setup} from "@nuxt/test-utils";
import type {TestOptions} from "@nuxt/test-utils";


export default (options: Partial<TestOptions> = {}) => {
    return setup({
        server: true,
        ...options
    })
}

import { defineComponent } from 'vue';

import {Task} from "~/services/models";
import {TaskApi} from "~/services/task/api";

import "quasar/dist/quasar.css";
import {
    QBtn,
    QCard,
    QCardSection,
    QLayout,
    QPageContainer,
} from "quasar";

import MenuDrawer from '~/components/header';
import TaskTable from '~/components/table';
import {NuxtLink} from "#components";


export default defineComponent({
    setup() {
        let tasks = ref<Task[]>([])

        onMounted(() => {
            TaskApi.list()
                .then((res) => {
                    tasks.value = res.data.map((fragment) => {
                        return Object.assign(new Task(), fragment)
                    })
                })
                .catch((e) => console.error(e))
        })

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                <QPageContainer>
                    <h3>Your task list</h3>

                    <TaskTable tasks={tasks.value} />
                </QPageContainer>
            </QLayout>
        )
    }
})
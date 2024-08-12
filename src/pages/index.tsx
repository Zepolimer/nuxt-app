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
                    {
                        tasks.value.map((task) => {
                            return (
                                <QCard key={task.id} bordered={true}>
                                    <QCardSection>
                                        <NuxtLink href={`/task/${task.id}`}>
                                            {task.title}
                                        </NuxtLink>

                                        <p>{task.description}</p>
                                        <p>Status: {task.status ? 'Done' : 'Pending'}</p>
                                    </QCardSection>
                                </QCard>
                            )
                        })
                    }

                    <QBtn label={"Text btn"} color={"blue"} dense={true} />
                </QPageContainer>
            </QLayout>
        )
    }
})
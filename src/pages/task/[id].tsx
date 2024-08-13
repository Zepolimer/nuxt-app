import {defineComponent} from 'vue';
import {useRoute} from 'vue-router';

import {Task} from "~/services/task/models";
import {TaskApi} from "~/services/task/api";

import {QLayout, QPageContainer} from "quasar";
import MenuDrawer from "~/components/header";
import TaskForm from "~/components/forms";


export default defineComponent({
    setup() {
        const route = useRoute()

        let taskId = route.params.id
        let task = ref<Task | null>(null)

        let onClick = (t: Task) => {
            TaskApi.update(t)
                .then((res) => {
                    task.value = Object.assign(new Task(), res.data)
                })
                .catch((e) => console.error(e))
        }

        onMounted(() => {
            if (taskId) {
                TaskApi.get(taskId as string)
                    .then((res) => {
                        task.value = Object.assign(new Task(), res.data)
                    })
                    .catch((e) => console.error(e))
            }
        })

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                {
                    !task.value &&
                    <QPageContainer>
                        <p>Loading ...</p>
                    </QPageContainer>
                }
                {
                    task.value &&
                    <QPageContainer>
                        <h3>Update a Task</h3>

                        <TaskForm
                            task={task.value}
                            onClick={onClick}
                        />
                    </QPageContainer>
                }
            </QLayout>
        )
    }
})
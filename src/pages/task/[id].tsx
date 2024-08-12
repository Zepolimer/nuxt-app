import {defineComponent} from 'vue';
import { useRoute } from 'vue-router';

import {QLayout, QPageContainer} from "quasar";
import MenuDrawer from "~/components/header";
import TaskForm from "~/components/forms";
import {Task} from "~/services/models";
import {TaskApi} from "~/services/task/api";


export default defineComponent({
    setup() {
        const route = useRoute()

        let taskId = route.params.id
        let task = ref<Task | null>(null)

        onMounted(() => {
            if (taskId) {
                TaskApi.get(taskId as string)
                    .then((res) => {
                        task.value = Object.assign(new Task(), res.data)
                    })
                    .catch((e) => console.log(e))
            }
        })

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                {
                    !task.value &&
                    <p>Loading ...</p>
                }
                {
                    task.value &&
                    <QPageContainer>
                        <h3>Update a Task</h3>

                        <TaskForm task={task.value} />
                    </QPageContainer>
                }
            </QLayout>
        )
    }
})
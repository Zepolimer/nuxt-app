import {defineComponent} from 'vue';
import {useRouter} from "vue-router";

import {useTaskStore} from "~/stores/task";
import {Task} from "~/services/task/models";
import type {TaskFragment} from "~/services/task/fragments";

import {QLayout, QPageContainer} from "quasar";
import MenuDrawer from "~/components/header";
import TaskForm from "~/components/forms"


export default defineComponent({
    setup() {
        let route = useRouter()
        let taskStore = useTaskStore()

        let onClick = async (task: Task) => {
            taskStore.addTask(task)
                .then((res: void | (Task & TaskFragment)) => {
                    let t = Object.assign(new Task(), res)
                    route.push(`/task/${t.id}`)
                })
        }

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                <QPageContainer>
                    <h3>Add a new Task</h3>

                    <TaskForm onClick={onClick} />
                </QPageContainer>
            </QLayout>
        )
    }
})
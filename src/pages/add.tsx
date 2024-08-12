import {defineComponent, ref} from 'vue';

import {QLayout, QPageContainer} from "quasar";
import MenuDrawer from "~/components/header";
import TaskForm from "~/components/forms"
import {TaskApi} from "~/services/task/api";
import {Task} from "~/services/models";


export default defineComponent({
    setup() {
        let task = ref<Task>(new Task())

        let onClick = async () => {
            TaskApi.add(task.value)
                .then((res) => console.log(res))
                .catch((e) => console.error(e))
        }

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                <QPageContainer>
                    <h3>Add a new Task</h3>

                    <TaskForm />
                </QPageContainer>
            </QLayout>
        )
    }
})
import {defineComponent} from 'vue';

import {Task} from "~/services/models";
import {TaskApi} from "~/services/task/api";

import {QLayout, QPageContainer} from "quasar";
import MenuDrawer from "~/components/header";
import TaskForm from "~/components/forms"
import {useRouter} from "vue-router";


export default defineComponent({
    setup() {
        const route = useRouter()

        let onClick = async (t: Task) => {
            TaskApi.add(t)
                .then((res) => route.push(`/task/${res.data.id}`) )
                .catch((e) => console.error(e))
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
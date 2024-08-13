import {defineComponent} from 'vue';

import {useTaskStore} from "~/stores/task";

import "quasar/dist/quasar.css";
import {QLayout, QPageContainer} from "quasar";

import MenuDrawer from '~/components/header';
import TaskTable from '~/components/table';


export default defineComponent({
    setup() {
        let taskStore = useTaskStore()

        onMounted(() => {
            taskStore.getAll()
        })

        return () => (
            <QLayout view={"hHh Lpr lFf"}>
                <MenuDrawer />

                <QPageContainer>
                    <div class={"q-ml-xl q-mr-xl"}>
                        <h3>Your task list</h3>

                        <TaskTable tasks={taskStore.tasks} />
                    </div>
                </QPageContainer>
            </QLayout>
        )
    }
})
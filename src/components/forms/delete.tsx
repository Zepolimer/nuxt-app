import {defineComponent} from 'vue';

import {useTaskStore} from "~/stores/task";

import {QBtn} from "quasar";


export const DeleteTaskProps = {
    taskId: {
        type: Number,
        required: true
    },
}

export default defineComponent({
    name: 'DeleteTask',
    props: DeleteTaskProps,
    setup(props) {
        let taskStore = useTaskStore()

        let onClick = () => {
            taskStore.deleteTask(props.taskId!)
        }


        return () => (
            <QBtn
                label={"Delete"}
                color={"negative"}
                onClick={() => onClick()}
            />
        )
    }
})
import {defineComponent, ref} from 'vue';
import type { PropType } from 'vue';

import {useTaskStore} from "~/stores/task";
import {Task} from "~/services/task/models";
import type {TaskFragment} from "~/services/task/fragments";

import {QCheckbox} from "quasar";


export const MarkAsDoneProps = {
    task: {
        type: Object as PropType<Task>,
        default: new Task()
    },
}

export default defineComponent({
    name: 'MarkAsDoneTask',
    props: MarkAsDoneProps,
    setup(props) {
        let taskStore = useTaskStore()
        let task = ref<Task>(props.task)

        let onClick = async () => {
            task.value.status = !task.value.status

            taskStore.updateTask(task.value)
                .then((res: void | (Task & TaskFragment)) => {
                    task.value = Object.assign(new Task(), res)
                })
        }


        return () => (
            <QCheckbox
                label={task.value.status ? "Done" : "Pending"}
                modelValue={task.value.status}
                onUpdate:modelValue={() => onClick()}
            />
        )
    }
})
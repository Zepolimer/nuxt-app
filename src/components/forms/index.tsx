import {defineComponent, ref} from 'vue';
import type { PropType } from 'vue';

import {Task} from "~/services/models";
import {TaskApi} from "~/services/task/api";

import {QBtn, QCheckbox, QInput} from "quasar";


export const TaskFormProps = {
    task: {
        type: Object as PropType<Task>,
        default: new Task()
    },
}

export default defineComponent({
    name: 'TaskForm',
    props: TaskFormProps,
    setup(props) {
        let task = ref<Task>(props.task)

        let onUpdate = (field: keyof Task, value: string | number | null) => {
            if (field in task.value) {
                task.value[field] = value
            }
        };

        let onClick = () => {
            if (props.task.id === 0) {
                TaskApi.add(task.value)
                    .then((res) => console.log('Added: ', res))
                    .catch((e) => console.error(e))
            } else {
                TaskApi.update(task.value)
                    .then((res) => console.log('Updated: ', res))
                    .catch((e) => console.error(e))
            }
        }


        return () => (
            <div>
                <QInput
                    label={"Title"}
                    modelValue={task.value.title}
                    onUpdate:modelValue={(value) => onUpdate('title', value)}
                />

                <QInput
                    label={"Description"}
                    modelValue={task.value.description}
                    type={"textarea"}
                    onUpdate:modelValue={(value) => onUpdate('description', value)}
                />

                <QCheckbox
                    label={"Done"}
                    modelValue={task.value.status}
                    onUpdate:modelValue={(value) => onUpdate('status', value)}
                />

                <QBtn
                    label={"Save task"}
                    onClick={onClick}
                />
            </div>
        )
    }
})
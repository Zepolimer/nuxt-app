import {defineComponent, ref} from 'vue';
import type { PropType } from 'vue';

import {Task} from "~/services/models";

import {QBtn, QCheckbox, QInput} from "quasar";


export const TaskFormProps = {
    task: {
        type: Object as PropType<Task>,
        default: new Task()
    },
    onClick: {
        type: Function as PropType<(t: Task) => void>,
    }
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
            if (props.onClick) {
                props.onClick(task.value)
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
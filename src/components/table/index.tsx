import {defineComponent, ref, computed} from 'vue';
import type { PropType } from 'vue';

import {Task} from "~/services/task/models";

import {NuxtLink} from "#components";
import {QBtnToggle, QInput, QTable, QTd} from "quasar";

import MarkAsDoneTask from '~/components/forms/mark-as-done';
import DeleteTask from '~/components/forms/delete';


export const TaskTableProps = {
    tasks: {
        type: Array as PropType<Task[]>,
        default: () => []
    }
}

export default defineComponent({
    name: 'TaskTable',
    props: TaskTableProps,
    setup(props) {
        let filter = ref<string>('')
        let isDone = ref<boolean | null>(null)

        let onSearch = (value: string | number | null) => {
            if (value && typeof value === 'string') {
                filter.value = value
            }
        }

        let filteredTasks = computed(() => {
            return props.tasks.filter((task: Task) => {
                let taskStatus = (isDone.value === null || task.status === isDone.value)

                let filteredTask = true
                if (filter.value.length > 0) {
                    let searchValue = filter.value.toLowerCase()

                    filteredTask = (task.title.toLowerCase().includes(searchValue) ||
                        task.description!.toLowerCase().includes(searchValue))
                }

                return filteredTask && taskStatus
            })
        })


        return () => (
            <div>
                <div class={'flex justify-between q-mb-md'}>
                    <QInput
                        modelValue={filter.value}
                        onUpdate:modelValue={(value) => onSearch(value)}
                        label={"Search by title or description"}
                        debounce={300}
                        filled={true}
                    />

                    <QBtnToggle
                        modelValue={isDone.value}
                        options={[
                            {label: 'All', value: null},
                            {label: 'Done', value: true},
                            {label: 'Pending', value: false},
                        ]}
                        onUpdate:modelValue={(value: boolean | null) => isDone.value = value}
                    />
                </div>

                <QTable
                    columns={[
                        {
                            name: 'title',
                            label: 'Title',
                            field: 'title',
                            sortable: true,
                            align: "left",
                        },
                        {
                            name: 'description',
                            label: 'Description',
                            field: 'description',
                            sortable: true,
                            align: "left",
                        },
                        {
                            name: 'status',
                            label: 'Status',
                            field: 'status',
                            sortable: true,
                            align: "center",
                        },
                        {
                            name: 'action',
                            label: 'Action',
                            field: 'id',
                            sortable: false,
                            align: "center",
                        },
                    ]}
                    rows={filteredTasks.value}
                    row-key="id"
                    loading={props.tasks.length === 0}
                    flat={true}
                >
                    {{
                        'body-cell-title': (props: any) => (
                            <QTd>
                                <NuxtLink to={`/task/${props.row.id}`}>
                                    {props.row.title}
                                </NuxtLink>
                            </QTd>
                        ),
                        'body-cell-status': (props: any) => (
                          <QTd>
                              <MarkAsDoneTask task={props.row} />
                          </QTd>
                        ),
                        'body-cell-action': (props: any) => (
                          <QTd>
                              <DeleteTask taskId={props.row.id} />
                          </QTd>
                        ),
                    }}
                </QTable>
            </div>
        )
    }
})
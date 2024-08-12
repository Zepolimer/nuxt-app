import {defineComponent} from 'vue';
import type { PropType } from 'vue';

import {Task} from "~/services/models";

import {NuxtLink} from "#components";
import {QTable, QTd} from "quasar";


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
        let columns = [
            {
                name: 'title',
                label: 'Title',
                field: 'title',
                sortable: true,
                align: 'left',
            },
            {
                name: 'description',
                label: 'Description',
                field: 'description',
                sortable: true,
                align: 'left',
            },
            {
                name: 'status',
                label: 'Status',
                field: 'status',
                format: (val: boolean) => val ? 'Done' : 'Pending',
                sortable: true,
                align: 'center',
            },
        ]

        return () => (
            <QTable
                columns={columns}
                rows={props.tasks}
                row-key="id"
            >
                {{
                    'body-cell-title': (props: any) => (
                        <QTd>
                            <NuxtLink to={`/task/${props.row.id}`}>
                                {props.row.title}
                            </NuxtLink>
                        </QTd>
                    ),
                }}
            </QTable>
        )
    }
})
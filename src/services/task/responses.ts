import type {TaskFragment} from "~/services/task/fragments";
import type {Response} from "~/services/api"


export interface TaskListResponse extends Response {
    data: TaskFragment[]
}

export interface TaskResponse extends Response {
    data: TaskFragment
}
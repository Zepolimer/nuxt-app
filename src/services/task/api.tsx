import {Api} from "~/services/api";

import type {Task} from "~/services/models";
import type {TaskListResponse, TaskResponse} from "~/services/task/responses";


export class TaskApi {
    static API_URL: string = '/api/task'
    static API_URL_PK: string = '/api/task/:id'

    static list(): Promise<TaskListResponse> {
        return Api.call(
            this.API_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    static add(task: Task): Promise<TaskResponse> {
        return Api.call(
            this.API_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            }
        );
    }

    static get(taskId: string): Promise<TaskListResponse> {
        let url = this.API_URL_PK.replace(':id', taskId)

        return Api.call(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    static update(task: Task): Promise<TaskResponse> {
        let url = this.API_URL_PK.replace(':id', task.id.toString())

        return Api.call(
            url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            }
        );
    }

    static delete(taskId: string): Promise<TaskListResponse> {
        let url = this.API_URL_PK.replace(':id', taskId)

        return Api.call(
            url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
}
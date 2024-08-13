import {defineStore} from 'pinia';

import {Task} from "~/services/task/models";
import {TaskApi} from "~/services/task/api";

import {PositiveNotify} from "~/services/notifiy";

export const useTaskStore = defineStore(
    'taskStore',
    {
        state: () => ({
            tasks: [] as Task[],
        }),
        actions: {
            /**
             * getAll() return all tasks
             */
            async getAll() {
                TaskApi.list()
                    .then((res) => {
                        this.tasks = res.data.map((fragment) => {
                            return Object.assign(new Task(), fragment)
                        })
                    })
                    .catch((e) => console.error(e))
            },

            /**
             * addTask() return all tasks including created task
             * @param {Task} task
             */
            async addTask(task: Task) {
                return TaskApi.add(task)
                    .then((res) => {
                        let task = Object.assign(new Task(), res.data)
                        this.tasks = [
                            ...this.tasks.filter((t: Task) => t.id !== task.id),
                            task
                        ]

                        PositiveNotify('Task created successfully')
                        return task
                    })
                    .catch((e) => console.error(e))
            },

            /**
             * updateTask() return all tasks including updated task
             * @param {Task} task
             */
            async updateTask(task: Task) {
                return TaskApi.update(task)
                    .then((res) => {
                        let task = Object.assign(new Task(), res.data)
                        this.tasks = this.tasks.map((t: Task) => t.id === task.id ? task : t)

                        PositiveNotify('Task updated successfully')
                        return task
                    })
                    .catch((e) => console.error(e))
            },

            /**
             * deleteTask() return all tasks including updated task
             * @param {Number} taskId
             */
            async deleteTask(taskId: number) {
                TaskApi.delete(taskId)
                    .then(() => {
                        this.tasks = this.tasks.filter((task: Task) => task.id !== taskId)

                        PositiveNotify('Task deleted successfully')
                    })
                    .catch((e) => console.error(e))
            }
        }
    }
)
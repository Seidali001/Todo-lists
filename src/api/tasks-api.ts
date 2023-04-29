import {TasksType, UpdateTaskModelType} from "./todolist-api";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '49d35d50-df50-4fa4-b94f-9014bc346a45',
    }
})

// api
export const tasksApi = {
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then((res) => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get<TasksFromBack>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskFromBackType>>(`todo-lists/${todolistId}/tasks`, {title})
            .then((res) => res.data)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then((res) => res.data)
    }
}

// types
type TasksFromBack = {
    items: TasksType[]
    totalCount: number,
    error: null | string
}
type TaskFromBackType = {
    item: TasksType
    totalCount: number,
    error: null | string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
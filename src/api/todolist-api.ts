import axios from "axios";
import {RequestStatusType} from "../components/app/app-reducer";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '49d35d50-df50-4fa4-b94f-9014bc346a45',
    }
})

// api
export const todolistApi = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then((res) => res.data)
    },
    getTodolists() {
        return instance.get<TodolistFromBackType[]>("todo-lists")
            .then((res) => res)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistFromBackType }>>("todo-lists", {title})
            .then((res) => {
                return res
            })
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then((res) => res.data)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<OperationResult<{ userId?: number }>>("auth/login", data)
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TodolistFromBackType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}
export type TasksType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type OperationResult<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type UpdateTaskModelType = {
    title: string,
    startDate: string,
    priority: TaskPriorities,
    description: string,
    deadline: string,
    status: TaskStatuses
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// enums
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}





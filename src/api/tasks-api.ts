import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '49d35d50-df50-4fa4-b94f-9014bc346a45',
    }
})

export const taskApi = {
    updateTodolist(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
            .then((res) => res.data)
    },
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title})
            .then((res) => res.data)
    },
    deleteTodolist(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
            .then((res) => res.data)
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
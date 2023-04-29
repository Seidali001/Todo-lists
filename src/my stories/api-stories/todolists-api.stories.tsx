import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../../api/todolist-api";
import {string} from "prop-types";

export default {
    title: 'todolistsAPI'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
         /*instance.get("/todo-lists")*/
        todolistApi.getTodolists()
            .then((res) => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "React"
        /*axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, setting)*/
            todolistApi.createTodolist(title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "67c914ff-adba-452c-9c08-a625451f29b8"
        /*axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, setting)*/
            todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "f7a2da36-da71-43f2-906c-ce06ab097b0d"
        const title = "Next_JS"
        /*axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, {title}, setting)*/
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


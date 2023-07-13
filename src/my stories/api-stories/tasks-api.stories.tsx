import React, {useEffect, useState} from 'react'
import axios from "axios";
import {tasksApi} from "../../api/tasks-api";
import {TaskStatuses, UpdateTaskModelType} from "../../api/todolist-api";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../components/app/store";
import {TasksStateType} from "../../components/app/appWithRedux/AppWithRedux";
import {tasksActions} from "../../features/todolistsList/tasks-reducer";
import {string} from "prop-types";

export default {
    title: 'tasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a64c20c6-cfc4-4635-97f9-38cd2bfc50e0"
        tasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
   // const allTasksFromState = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    useEffect(() => {
        const todolistId = "85240ce0-652a-4c4d-8c27-8f8683e5e6c9"
        const title = "newTestTask"
        /*axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, setting)*/
        tasksApi.createTask(todolistId, title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "475ed67b-9317-48c2-9572-a2797774dce5"
        const taskId = "185e6e0f-a6f4-472d-8c02-3d2b35430380"
        /*axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, setting)*/
        tasksApi.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = (title: string, status:  TaskStatuses) => {
    const [state, setState] = useState<any>(null)
    const allTasksFromState = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    useEffect(() => {
        const todolistId = "475ed67b-9317-48c2-9572-a2797774dce5"
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (!task) {
            return;
        }

        const model: UpdateTaskModelType = {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }

        const taskId = "08cd56cf-d356-49c2-af9d-01e5c6656687"
        /*axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, {title}, setting)*/
        tasksApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


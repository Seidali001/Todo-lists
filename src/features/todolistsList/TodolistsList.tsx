import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, TDispatch} from "../../components/app/store";
import {
    addTodolistTC,
    todolistsActions, changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "./todolsits-reducer";
import {TasksStateType} from "../../components/app/appWithRedux/AppWithRedux";
import {FilterTodolistType} from "../../components/app/appWithRedux/AppWithRedux"
import {addTasksTC, removeTasksTC, updateTaskTC} from "./tasks-reducer";
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import Grid from "@mui/material/Grid";
import {TaskStatuses} from "../../api/todolist-api";
import {Todolist} from "./todolist/Todolist"
import {Navigate} from "react-router-dom";


export const TodolistsList: React.FC = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch: TDispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (todolistID: string, taskId: string) {
        dispatch(removeTasksTC(todolistID, taskId))
    }, [])

    const addTask = useCallback((todolistID: string, titleTask: string) => {
        dispatch(addTasksTC(todolistID, titleTask))
    }, [])

    const changeFilter = useCallback((todolistId: string, valueFilter: FilterTodolistType) => {
        dispatch(todolistsActions.changeTodolistFilter({todolistId: todolistId, newChangeFilter: valueFilter}))
    }, [])

    const changeTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskID, {status}))
    }

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskID, {title: newTitle}))
    }, [])

    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        delete tasks[todolistID]
        dispatch(removeTodolistTC(todolistID))
    }, [])

    const addTodolistHandler = useCallback((title:string) => {
        dispatch(addTodolistTC(title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (

    <>
    <Grid container>
        <AddItemForm
            addItem={addTodolistHandler}
/>
    </Grid>
    <Grid container
          spacing={1}
          sx={{width: "1193px"}}>
        {todolists?.map(todolists => {
            let tasksForTodolist = tasks[todolists.id]
            return <Grid item >
                <Todolist
                    todolist={todolists}
                    key={todolists.id}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFiltered={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            </Grid>
        })}
    </Grid>
    </>)
}

export default TodolistsList;

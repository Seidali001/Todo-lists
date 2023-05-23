import React, {FC, useCallback, useEffect, useState} from 'react';
import style from '../../../style-modules/Todolist.module.css'
import {FilterTodolistType} from "../../../components/app/appWithRedux/AppWithRedux";
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import ClearIcon from '@mui/icons-material/Clear';
import {ButtonGroup, IconButton, Button} from "@mui/material";
import {Task} from "./task/Task";
import {TaskStatuses, TasksType} from "../../../api/todolist-api";
import {FilterValuesType} from "../../../features/todolistsList/todolsits-reducer";
import {TDispatch} from "../../../components/app/store";
import {fetchTasksTC} from "../tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../../../components/app/app-reducer"
import {LoadingButton} from '@mui/lab';
import {TodolistDomainType} from '../../../features/todolistsList/todolsits-reducer'
import { fileURLToPath } from 'url';
import { Slide, fade } from '@material-ui/core';

export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFiltered: (todolistId: string, valueFilter: FilterTodolistType) => void
    addTask: (todolistID: string, titleTask: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}


export const Todolist: FC<TodolistPropsType> = React.memo(({
                                                               todolist,                                                      
                                                               tasks,
                                                               removeTask,
                                                               changeFiltered,
                                                               addTask,
                                                               changeTaskStatus,
                                                               removeTodolist,
                                                               changeTaskTitle,
                                                               changeTodolistTitle
                                                           }) => {
    const dispatch: TDispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [todolist.id])

    const onAllFilterClickHandler = useCallback(() => {
        changeFiltered(todolist.id, "all")
    }, [changeFiltered, todolist.id])

    const onActiveFilterClickHandler = useCallback(() => {
        changeFiltered(todolist.id, "active")
    }, [changeFiltered, todolist.id])

    const onCompleteFilterClickHandler = useCallback(() => {
        changeFiltered(todolist.id, "completed")
    }, [changeFiltered, todolist.id])

    function removeTodolistHandler() {
        removeTodolist(todolist.id)
    }

    const addTaskHandler = useCallback((title: string, id: string) => {
        addTask(id, title)
    }, [addTask, todolist.id])

    function onChangeTodolistTitleHandler(todolistTitle: string) {
        changeTodolistTitle(todolist.id, todolistTitle)
    }

    let tasksForTodolist = tasks

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.InProgress)
    }

    const checkboxOnchangeHandler = useCallback((taskID: string, status: TaskStatuses) => {
        changeTaskStatus(todolist.id, taskID, status)

    }, [todolist.id, changeTaskStatus])

    const onChangeTitleHandler = useCallback((taskID: string, taskValue: string) => {
        changeTaskTitle(todolist.id, taskID, taskValue)
    }, [todolist.id, changeTaskTitle])

    const removeOnClickHandler = useCallback((taskId: string) => {
        removeTask(todolist.id, taskId)
    }, [todolist.id, removeTask])
    
    

    return (
        <div className={style.Todolist}>
            <h3 className={`${style.h3} ${style.Cursor}`}>
                <EditableSpan title={todolist.title}
                              onChange={onChangeTodolistTitleHandler}/>
                            <IconButton sx={{width: 25, height: 25, bottom: 13}}
                                        onClick={removeTodolistHandler}
                                        
                                        >
                                 <ClearIcon className={style.Cursor}
                                 fontSize="small"
                                 color="error"/>
                              </IconButton>
            </h3>
            <AddItemForm id={todolist.id} addItem={addTaskHandler} entityStatus={todolist.entityStatus}
            /> 
              
            <div>
                <ul className={style.ul}>
                    {  tasksForTodolist.map(t => <Task
                            key={t.id}
                            todoID={t.id}
                            task={t}
                            removeOnClickHandler={removeOnClickHandler}
                            onChangeTitleHandler={onChangeTitleHandler}
                            checkboxOnchangeHandler={checkboxOnchangeHandler}/>
                        )
                    }
                   
                </ul>
                <div className={style.blockButtonsFilter}>
                    <ButtonGroup
                        variant="text" aria-label="text button group">
                        <Button onClick={onAllFilterClickHandler}>all</Button>
                        <Button sx={{color: "green"}}
                                onClick={onActiveFilterClickHandler}>active</Button>
                        <Button color={'secondary'}
                                onClick={onCompleteFilterClickHandler}>completed</Button>
                    </ButtonGroup>

                </div>
            </div>
        </div>
    );
})

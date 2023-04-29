import React, {FC, useCallback, useEffect, useState} from 'react';
import style from '../style-modules/Todolist.module.css'
import {FilterTodolistType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import ClearIcon from '@mui/icons-material/Clear';
import {Button, ButtonGroup} from "@material-ui/core";
import {Task} from "./Task";
import {TaskStatuses, TasksType} from "../api/todolist-api";
import {FilterValuesType} from "../state/todolsits-reducer";
import {TDispatch} from "../state/store";
import {fetchTasksTC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistID: string) => void
    filter: FilterValuesType
    changeFiltered: (todolistId: string, valueFilter: FilterTodolistType) => void
    addTask: (todolistID: string, titleTask: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}


export const Todolist: FC<TodolistPropsType> = React.memo(({
                                                               id,
                                                               title,
                                                               tasks,
                                                               removeTask,
                                                               filter,
                                                               changeFiltered,
                                                               addTask,
                                                               changeTaskStatus,
                                                               removeTodolist,
                                                               changeTaskTitle,
                                                               changeTodolistTitle
                                                           }) => {
    const [disable, setDisable] = useState(false)
    const dispatch: TDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [id])

    const onAllFilterClickHandler = useCallback(() => {
        changeFiltered(id, "all")
    }, [changeFiltered, id])

    const onActiveFilterClickHandler = useCallback(() => {
        changeFiltered(id, "active")
    }, [changeFiltered, id])

    const onCompleteFilterClickHandler = useCallback(() => {
        changeFiltered(id, "completed")
    }, [changeFiltered, id])

    function removeTodolistHandler() {
        removeTodolist(id)
    }

    const addTaskHandler = useCallback((id: string, title: string) => {
        addTask(id, title)
    }, [addTask, id])

    function onChangeTodolistTitleHandler(todolistTitle: string) {
        changeTodolistTitle(id, todolistTitle)
    }

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.New)
        debugger
    }
    if (filter === "completed") {
        debugger
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.InProgress)
    }

    const checkboxOnchangeHandler = useCallback((taskID: string, status: TaskStatuses) => {
        changeTaskStatus(id, taskID, status)

    }, [id, changeTaskStatus])

    const onChangeTitleHandler = useCallback((taskID: string, taskValue: string) => {
        changeTaskTitle(id, taskID, taskValue)
    }, [id, changeTaskTitle])

    const removeOnClickHandler = useCallback((taskId: string) => {
        removeTask(id, taskId)
    }, [id, removeTask])

    return (
        <div className={style.Todolist}>
            <h3 className={`${style.h3} ${style.Cursor}`}>
                <EditableSpan title={title}
                              onChange={onChangeTodolistTitleHandler}/>
                <span className={style.Cursor}
                      onClick={removeTodolistHandler}>
                       <ClearIcon fontSize="small"
                                  color="error"/>
                        </span>
            </h3>
            <AddItemForm id={id} addItem={addTaskHandler}
            />
            <div>
                <ul className={style.ul}>
                    {
                        tasksForTodolist.map(t => <Task
                            key={t.id}
                            todoID={id}
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
                        <Button color={'primary'}
                                onClick={onActiveFilterClickHandler}>active</Button>
                        <Button color={'secondary'}
                                onClick={onCompleteFilterClickHandler}>completed</Button>
                    </ButtonGroup>

                </div>
            </div>
        </div>
    );
})

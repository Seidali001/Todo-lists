import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import style from "../style-modules/Todolist.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {TaskStatuses, TasksType} from "../api/todolist-api";
import {TDispatch} from "../state/store";

export type TaskProps = {
    todoID: string
    task: TasksType
    removeOnClickHandler: (taskId: string) => void
    onChangeTitleHandler: (taskID: string, taskValue: string) => void
    checkboxOnchangeHandler: (taskID: string, status: TaskStatuses) => void
}

export const Task: FC<TaskProps> = ({
                                        todoID,
                                        task,
                                        removeOnClickHandler,
                                        onChangeTitleHandler,
                                        checkboxOnchangeHandler
                                    }) => {

    const dispatch: TDispatch = useDispatch()

    const onchangeCheckboxCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = +event.currentTarget.checked
        checkboxOnchangeHandler(task.id, taskStatus)
    }, [dispatch, todoID, task.id])

    const onChangeTitleCallback = useCallback((taskValue: string) => {
        onChangeTitleHandler(task.id, taskValue)
    }, [dispatch, todoID, task.id])

    const removeOnClickCallback = useCallback(() => {
        removeOnClickHandler(task.id)
    }, [dispatch, todoID, task.id])

    return (
        <div>
            <li
                key={task.id}
                className={`${style.li}
                            ${task.status ? style.isDone : ""}`}
            >
                <Checkbox defaultChecked
                          color="secondary"
                          onChange={onchangeCheckboxCallback}
                          checked={!!task.status}
                />
                <EditableSpan
                    id={task.id}
                    title={task.title}
                    onChange={onChangeTitleCallback}
                />
                <span className={style.Cursor} onClick={removeOnClickCallback}><ClearIcon
                    fontSize="small" color="error"/></span>
            </li>
        </div>
    );
};

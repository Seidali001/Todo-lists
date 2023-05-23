import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import style from "../../../../style-modules/Todolist.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import {Checkbox} from '@mui/material';
import {IconButton } from '@mui/material';
import {useDispatch} from "react-redux";
import {TaskStatuses, TasksType} from "../../../../api/todolist-api";
import {TDispatch} from "../../../../components/app/store";


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
console.log(!!task.status)
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
                /> <EditableSpan
                id={task.id}
                status={task.status}
                title={task.title}
                onChange={onChangeTitleCallback}
            />
                <IconButton sx={{width: 25, height: 25, bottom: 13}} className={style.Cursor} onClick={removeOnClickCallback}><ClearIcon
                    fontSize="small" color="error"/></IconButton>
            </li>
        </div>
    );
};

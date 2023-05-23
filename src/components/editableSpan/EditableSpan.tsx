import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import style from "../../style-modules/Todolist.module.css";
import {TextField} from "@material-ui/core";
import { log } from "console";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string, id?: string | undefined) => void
    id?: string,
    status?:number
}


export const EditableSpan: FC<EditableSpanPropsType> = ({
                                                            title,
                                                            onChange,
                                                            id,
                                                            status
                                                        }) => {

    // useState
    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>("")
    let [editMode, setEditMode] = useState<boolean>(false)

    function onChangeTitleHandler(event: ChangeEvent<HTMLInputElement>) {
        setNewTitle(event.currentTarget.value)
    }


    const unactivateEditMode = () => {
        setEditMode(false)
    }

    const activateEditMode = () => {
      if(!status){
        setNewTitle(title)
        setEditMode(true)
      }
    }

    const activateViewMode = () => {
        setEditMode(false)
        setNewTitle(newTitle)

        const regexp = /[^+A-Z a-z&а-яёА-ЯЁ0-9]+/g;
        let newTitleTrimmed = newTitle.trim()

        if (regexp.test(newTitleTrimmed)) {
            setNewTitle("")
            setError("Don't use symbols!")
            return;
        }

        /*if (newTitle.length >= 15) {
            setNewTitle(newTitle)
            setError("Title is long!")
            return
        }*/

        if (newTitle.length === 1) {
            setNewTitle(newTitle)
            setError("Title is short!")
            return
        }

        if (newTitle.trim() !== "") {
            onChange(newTitle, id ?? '')
        } else {
            setError("Title is required!")
            return
        }
    }

    function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (event.key === "Enter" && newTitle) {
            activateViewMode()
        }
    }

    return (
        !editMode ? <span className={style.Cursor} onDoubleClick={activateEditMode}>{title} </span>
            :
            <>
                <>
                    <TextField id="standard-basic"
                               placeholder=" title value is..."
                               variant="standard"
                               onBlur={activateViewMode}
                               autoFocus
                               onKeyDown={onKeyDownHandler}
                               value={newTitle}
                               onChange={onChangeTitleHandler}
                               className={style.inputWidth}
                    />
                </>
                {error ? <div className={style.TodolistTitleError}>{error}</div> : <></>}
            </>
    )
}
import React, {ChangeEvent, FC, FocusEvent, KeyboardEvent, useState} from "react";
import style from "../../style-modules/Todolist.module.css";
import {Button, TextField} from "@mui/material";
import {RequestStatusType} from "../app/app-reducer"
import {LoadingButton} from '@mui/lab';

type AddItemFormPropsType = {
    style?: any
    id?: string
    addItem: (titleTask: string, id: string) => void
    entityStatus?: RequestStatusType
}
export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({
                                                                id,
                                                                addItem,
                                                                entityStatus
                                                            }) => {

    let [itemTitle, setItemTitle] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setItemTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {

        const regexp = /[^+A-Z a-z&а-яёА-ЯЁ0-9]+/g;
        let taskTitleTrimmed = itemTitle.trim()

        if (regexp.test(taskTitleTrimmed)) {
            setItemTitle("")
            return setError("Don't use symbols!")
        }

        if (itemTitle.length === 1) {
            itemTitle = ""
            setItemTitle("")
            return setError("Title is short!")
        }

        if (taskTitleTrimmed !== "") {
            addItem(taskTitleTrimmed, id ?? '')
        } else {
            setError("Title is required!")
        }
        setItemTitle("")
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (event.key === "Enter" && itemTitle) {
            addItemHandler()
        }
    }

    function onBlurHandler(event: FocusEvent<HTMLInputElement>) {
        if (event && itemTitle) {
            addItemHandler()
        }
    }


    return <div className={style.inputBlock}>
        <TextField id="standard-basic"
                   placeholder=" title value is..."
                   variant="standard"
                   type="text"
                   value={itemTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   onBlur={onBlurHandler}
        />
        <Button variant="contained" color="primary" className={style.AddTodo} disabled={itemTitle === ""}
                onClick={addItemHandler}> {entityStatus === "loading" ? <LoadingButton loading/> : "ADD"}
        </Button>
        {error ? <div className={style.errorMessage}>{error}</div> : <div className={style.errorField}></div>}
    </div>
})

import {FilterTodolistType} from "../components/appWithRedux/AppWithRedux";
import React, {ChangeEvent, FC, FocusEvent, KeyboardEvent, useCallback, useState} from "react";
import style from "../style-modules/Todolist.module.css";
import {Button, TextField} from "@material-ui/core";

type AddItemFormType = {
    style?: any
    id?: string
    addItem: (id: string, titleTask: string) => void
}
export const AddItemForm: FC<AddItemFormType> = ({id, addItem}) => {

    console.log("AddItemForm called")

    let [itemTitle, setItemTitle] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setItemTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        /*const regexp = /[^A-Za-z0-9]+/g;*/
        const regexp = /[^+A-Z a-z&а-яёА-ЯЁ0-9]+/g;
        let taskTitleTrimmed = itemTitle.trim()

        if (regexp.test(taskTitleTrimmed)) {
            setItemTitle("")
            return setError("Don't use symbols!")
        }

        if (itemTitle.length >= 15) {
            itemTitle = ""
            setItemTitle("")
            return setError("Title is long!")
        }

        if (itemTitle.length === 1) {
            itemTitle = ""
            setItemTitle("")
            return setError("Title is short!")
        }

        if (taskTitleTrimmed !== "") {
            addItem(id ?? '', taskTitleTrimmed)
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
                onClick={addItemHandler}> add
        </Button>
        {error ? <div className={style.errorMessage}>{error}</div> : <div className={style.errorField}></div>}
    </div>
}

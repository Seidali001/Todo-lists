//import * as React from 'react';
import React, {useState, ChangeEvent} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import {TDispatch} from "../../components/app/store";
import {searchTodolistsTC} from "../../features/todolistsList/todolsits-reducer"
import {fetchTodolistsTC} from "../../features/todolistsList/todolsits-reducer"


 function CustomizedInputBase() {
  let [itemTitle, setItemTitle] = useState<string>("")
  const dispatch: TDispatch = useDispatch()

function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
  const value = event.currentTarget.value
  dispatch(fetchTodolistsTC())
  if (value) {
    setItemTitle(event.currentTarget.value)
  } else {
    dispatch(fetchTodolistsTC())
    setItemTitle("")
  }
    }

    const searchItemHandler = () => {
        let taskTitleTrimmed = itemTitle.trim()
        dispatch(searchTodolistsTC(taskTitleTrimmed))
    }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, height: 35}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'dark'}}
        placeholder=" Search . . ."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={itemTitle}
        onChange={onChangeHandler}
      />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchItemHandler} disabled={!itemTitle}>
        <SearchIcon  />
      </IconButton>
    </Paper>
  );
}

export default CustomizedInputBase;
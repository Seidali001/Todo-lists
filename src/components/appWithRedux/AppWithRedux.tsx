import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {Todolist} from "../todolist/Todolist";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC, TodolistDomainType,

} from "../../state/todolsits-reducer";
import {
    addTasksTC,
    removeTasksTC, updateTaskTC
} from "../../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, TDispatch,} from "../../state/store";
import {TaskStatuses, TasksType} from "../../api/todolist-api";
import {TodolistsList} from "../todolistsList/TodolistsList";

export type FilterTodolistType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            size="large"
                            color="inherit">
                            <Menu/>
                        </Button>
                        <Typography variant="h6" component="div">
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                   <TodolistsList/>
                </Container>
            </Box>
        </div>
    );
}

export default AppWithRedux;


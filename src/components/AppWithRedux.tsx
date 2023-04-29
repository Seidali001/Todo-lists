import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {
    addNewTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistAC, removeTodolistTC, TodolistDomainType,

} from "./state/todolsits-reducer";
import {
    addTasksTC,
    updateTaskAC,
    changeTaskTitleAC,
    removeTasksTC, updateTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, TDispatch,} from "./state/store";
import {TaskStatuses, TasksType} from "./api/todolist-api";

export type FilterTodolistType = "all" | "active" | "completed";


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch: TDispatch = useDispatch();

    /*    useEffect(() => {
            /!*todolistApi.getTodolists()
                .then((res) => {
                    let todos = res.data
                    dispatch(setTodolistsAC(todos))
                })*!/
            /!*fetchTodolistsThunk(dispatch)*!/
        }, [])*/

    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])

    const removeTask = useCallback(function (todolistID: string, taskId: string) {
        /*dispatch(removeTaskAC(todolistID, taskId))*/
        dispatch(removeTasksTC(todolistID, taskId))
    }, [])

    const addTask = useCallback((todolistID: string, titleTask: string) => {
        /*dispatch(addTaskAC(todolistID, titleTask))*/
        dispatch(addTasksTC(todolistID, titleTask))
        debugger
    }, [])

    const changeFilter = useCallback((todolistId: string, valueFilter: FilterTodolistType) => {
        debugger
        dispatch(changeTodolistFilterAC(todolistId, valueFilter))
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

    const addTodolistHandler = useCallback((todolistId: string, title: string) => {
        dispatch(addTodolistTC(todolistId, title))
    }, [dispatch])

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
                    <Grid container>
                        <AddItemForm
                            addItem={addTodolistHandler}/>
                    </Grid>
                    <Grid container
                          spacing={1}>
                        {todolists?.map(todolists => {

                            let tasksForTodolist = tasks[todolists.id]

                            return <Grid item>
                                <Todolist
                                    key={todolists.id}
                                    id={todolists.id}
                                    title={todolists.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    filter={todolists.filter}
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
                </Container>
            </Box>


        </div>
    );
}

export default AppWithRedux;

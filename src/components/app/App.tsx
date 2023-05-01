import React, {useCallback} from 'react'
import '../../App.css';
import {Todolist} from '../todolist/Todolist';
import {AddItemForm} from '../addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType
} from '../../state/todolsits-reducer'
import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC,
    changeTaskStatusAC
} from '../../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {TaskPriorities, TaskStatuses, TasksType} from '../../api/todolist-api'
import {FilterTodolistType} from "../appWithRedux/AppWithRedux";
import {v1} from "uuid";

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    // если мы хотим получить Тудулисты с сервера:

    /*const universalDispatch: TDispatch = useDispatch();
    useEffect(() => {
        universalDispatch(fetchTodolistsTC())

    }, [])*/

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        const action = addTaskAC(newTask);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        const action = changeTaskStatusAC(todolistId, id, status);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (todolistId: string, id: string, newTitle: string) {
        debugger
        const action = changeTaskTitleAC(todolistId, id, newTitle);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (todolistId: string, valueFilter: FilterTodolistType) {
        const action = changeTodolistFilterAC(todolistId, valueFilter);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((todolistId: string, title: string) => {
        const newTodolist: TodolistDomainType = {
            id: todolistId,
            title: title,
            addedDate: "",
            order: 0,
            filter: "all"
        }
        const action = addNewTodolistAC(newTodolist);
        dispatch(action);
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFiltered={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

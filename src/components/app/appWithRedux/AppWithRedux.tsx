import React from 'react';
import '../../../App.css';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {LinearProgress} from "@mui/material"
import {TasksType} from "../../../api/todolist-api";
import {TodolistsList} from "../../../features/todolistsList/TodolistsList";
import {ErrorSnackbar} from "../../errorSnackbar/ErrorSnackbar"
import {RequestStatusType} from "../app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../../../features/login/Login";
import { BrowserRouter } from 'react-router-dom';

export type FilterTodolistType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {
    const status=useSelector<AppRootStateType, RequestStatusType>((state)=>state.app.status)
    return (
         <BrowserRouter>
          <div>
            <Box sx={{flexGrow: 1}}>
            <ErrorSnackbar />
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
                    {status === 'loading' && <LinearProgress sx={{backgroundColor: "red"}}/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistsList/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                        <Route path='*' element={<Navigate to="/404"/>} />
                    </Routes>
                </Container>
            </Box>
          </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;


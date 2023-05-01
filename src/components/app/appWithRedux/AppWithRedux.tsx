import React from 'react';
import '../../../App.css';
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@mui/icons-material";
import {TasksType} from "../../../api/todolist-api";
import {TodolistsList} from "../../../features/todolistsList/TodolistsList";

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


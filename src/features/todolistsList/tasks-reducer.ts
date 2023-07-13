import {TasksStateType} from "../../components/app/appWithRedux/AppWithRedux";
import {
    todolistsActions,
} from "./todolsits-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TasksType,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {
    AppActionsType,
    AppRootStateType,
    RootThunkType
} from "../../components/app/store";
import {Dispatch} from "redux";
import {tasksApi} from "../../api/tasks-api";
import {appActions} from "../../components/app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "./../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import {TDispatch} from "../../components/app/store"

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState, 
    reducers: {
        removeTask: (state, action: PayloadAction<{todolistId: string, taskId: string}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{task: TasksType}>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{todolistId: string, taskId: string, model: UpdateTaskModelType}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
              tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasks: (state, action: PayloadAction<{todolistId: string, tasks: Array<TasksType>}>) => {
            state[action.payload.todolistId] = action.payload.tasks
        }, 
        changeTaskStatus: (state, action: PayloadAction<{todolistId: string, taskId: string, status: TaskStatuses}>) => {
            /* const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
              tasks[index] = {...tasks[index], ...action.payload}
            } */
            const { todolistId, taskId, status } = action.payload;
            const tasks = state[todolistId];
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = status;
            }
        },
        changeTaskTitle: (state, action: PayloadAction<{todolistId: string, taskId: string, newTitle: string}>) => {
            const { todolistId, taskId, newTitle } = action.payload;
            const tasks = state[todolistId];
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.title = newTitle;
            }
        }
    },
    extraReducers: builder => {
        builder
        .addCase(todolistsActions.addNewTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        .addCase(todolistsActions.removeTodolist, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(todolistsActions.setTodolists, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
              })
        })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

//export type TasksActionsType = {...tasksActions}

export type TasksActionsType =
    | ReturnType<typeof tasksActions.addTask>
    | ReturnType<typeof tasksActions.removeTask>
    | ReturnType<typeof tasksActions.changeTaskStatus>
    | ReturnType<typeof tasksActions.changeTaskTitle>
    | ReturnType<typeof tasksActions.setTasks>
    | ReturnType<typeof tasksActions.updateTask>
    // | ReturnType<typeof removeTodolistAC>
    // | ReturnType<typeof setTodolistsAC>
    // | ReturnType<typeof setTasksAC>    
    // | ReturnType<typeof setAppErrorAC>
    // | ReturnType<typeof setAppStastusAC>

/* export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }

        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case 'CHANGE-TASK-STATUS':
            return ({
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            })

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }

        case 'ADD-NEW-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }

        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }

        default:
            return state
    }
}
 */
// actions
/* export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK' as const, todolistId, taskId}
}
export const addTaskAC = (task: TasksType) => {
    return {type: 'ADD-TASK' as const, task}
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {type: 'UPDATE-TASK' as const, todolistId, taskId, model}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS' as const, todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE' as const, todolistId, taskId, newTitle}
}
export const setTasksAC = (todolistId: string, tasks: Array<TasksType>) => {
    return {type: 'SET-TASKS' as const, todolistId, tasks}
}
 */
// thunks
export const fetchTasksTC = (todolistId: string): RootThunkType => async (dispatch: Dispatch) => {
    try {
        const res = await tasksApi.getTasks(todolistId)
        dispatch(tasksActions.setTasks({todolistId: todolistId, tasks: res.items}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const removeTasksTC = (todolistId: string, taskId: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStastus({status: "loading"}))
    
    try {
        const res = await tasksApi.deleteTask(todolistId, taskId)
        dispatch(tasksActions.removeTask({todolistId: todolistId, taskId: taskId}))
        dispatch(appActions.setAppStastus({status: "succeeded"}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        
 }
}
export const addTasksTC = (todolistId: string, title: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStastus({status: "loading"}))
    dispatch(todolistsActions.changeTodolistStatus({todolistId: todolistId, entityStatus: 'loading'}))
    try {
        const res = await tasksApi.createTask(todolistId, title)
        if (res.resultCode === 0) {
            dispatch(tasksActions.addTask({task: res.data.item}))
            dispatch(appActions.setAppStastus({status: "succeeded"}))
         
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (e: any ) {
        handleServerNetworkError(e, dispatch)
    } finally {
           dispatch(todolistsActions.changeTodolistStatus({todolistId: todolistId, entityStatus: 'succeeded'}))
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): RootThunkType => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    
    const allTasksFromState = getState().tasks;
    const task = allTasksFromState[todolistId].find(t => {
        return t.id === taskId
    })
    if (task) {
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
    try {
        dispatch(appActions.setAppStastus({status: "loading"}))

        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
        // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
        // чтобы у неё отобрать остальные св-ва

        const res = await tasksApi.updateTask(todolistId, taskId, apiModel)
                if (res.resultCode === 0) {
                    dispatch(tasksActions.updateTask({todolistId: todolistId, taskId: taskId, model: apiModel}))
                    dispatch(appActions.setAppStastus({status: "succeeded"}))
                 
                } else {
                    handleServerAppError(res, dispatch)
                }

        } catch (e: any) {
            handleServerNetworkError(e, dispatch)
    }
}
}
// types
/* export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStastusAC> */

type UpdateDomainTaskModelType = {
    title?: string,
    startDate?: string,
    priority?: TaskPriorities,
    description?: string,
    deadline?: string,
    status?: TaskStatuses
}

/*(dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}*/

/*async (dispatch) => {
    try {
        const res = await taskApi.getTasks()
        dispatch(setTasksAC(res.res.data))
    } catch (e) {

    }
}*/

/*export const fetchTasksThunk = (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}*/




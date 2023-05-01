import {TasksStateType} from "../../components/app/appWithRedux/AppWithRedux";
import {
    addNewTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
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

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
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
            debugger
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

// actions
export const removeTaskAC = (todolistId: string, taskId: string) => {
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

// thunks
export const fetchTasksTC = (todolistId: string): RootThunkType => async (dispatch) => {
    try {
        const res = await tasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.items))
    } catch (e) {
    }
}
export const removeTasksTC = (todolistId: string, taskId: string): RootThunkType => async (dispatch) => {
    try {
        const res = await tasksApi.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(todolistId, taskId))
    } catch (e) {
    }
}
export const addTasksTC = (todolistId: string, title: string): RootThunkType => async (dispatch) => {
    try {
        const res = await tasksApi.createTask(todolistId, title)
        dispatch(addTaskAC(res.data.item))
    } catch (e) {
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): RootThunkType => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
        // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
        // чтобы у неё отобрать остальные св-ва

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
            tasksApi.updateTask(todolistId, taskId, apiModel).then(() => {
                dispatch(updateTaskAC(todolistId, taskId, apiModel))
            })
        }
    } catch (e) {
    }
}
// types
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>

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




import {FilterTodolistType} from "../../components/app/appWithRedux/AppWithRedux";
import {
    todolistApi,
    TodolistType
} from "../../api/todolist-api";
import {
    AppActionsType,
    RootThunkType
} from "../../components/app/store";
import {RequestStatusType, setAppErrorAC, setAppStastusAC} from "../../components/app/app-reducer";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case 'ADD-NEW-TODOLIST': {
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
        return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newChangeFilter} : tl)

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
        return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)


        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)

        default:
            return state
    }
}

// actions
export const setTodolistsAC = (todolists: Array<TodolistType>) => (
    {type: 'SET-TODOLISTS' as const, todolists})
export const addNewTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-NEW-TODOLIST' as const, todolist}
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string, newChangeFilter: FilterTodolistType) => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, todolistId, newChangeFilter}
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST' as const, todolistId}
}

export function changeTodolistStatusAC(todolistId: string, entityStatus: RequestStatusType) {
    return { type: 'CHANGE-TODOLIST-ENTITY-STATUS' as const, todolistId, entityStatus };
}

// thunks
export const fetchTodolistsTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStastusAC("loading"))
    try {
        const res = await todolistApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStastusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStastusAC("succeeded"))
    }
}
export const removeTodolistTC = (todolistId: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStastusAC("loading"))
    try {
        const res = await todolistApi.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStastusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStastusAC("failed"))
        
    }
}
export const addTodolistTC = (title: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStastusAC("loading"))
    try {
        const res = await todolistApi.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addNewTodolistAC(res.data.data.item))
            dispatch(setAppStastusAC("succeeded"))
        } else {
            if (res.data.messages) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('some error occurred'))
            }
            dispatch(setAppStastusAC('failed'))
        }

    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStastusAC("failed"))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): RootThunkType => async (dispatch) => {
    try {
        const res = await todolistApi.updateTodolist(todolistId, title)
        dispatch(changeTodolistTitleAC(todolistId, title))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStastusAC("failed"))
    }
}

// types
export type TodolistsActionsType =
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStastusAC>
    | ReturnType<typeof changeTodolistStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

/*export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}*/

/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
})
}*/

/*export const fetchTodolistsTh = (): RootThunkType => (dispatch) => {
        todolistApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}*/
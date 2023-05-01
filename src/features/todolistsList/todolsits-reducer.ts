import {FilterTodolistType} from "../../components/app/appWithRedux/AppWithRedux";
import {v1} from "uuid";
import {
    todolistApi,
    TodolistType
} from "../../api/todolist-api";
import {
    AppActionsType,
    RootThunkType
} from "../../components/app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))

        case 'ADD-NEW-TODOLIST': {
            return [{...action.todolist, filter: "all"}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
        return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newChangeFilter} : tl)


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

// thunks
export const fetchTodolistsTC = (): RootThunkType => async (dispatch) => {
    try {
        const res = await todolistApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
    }
}
export const removeTodolistTC = (todolistId: string): RootThunkType => async (dispatch) => {
    try {
        const res = await todolistApi.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {
    }
}
export const addTodolistTC = (todolistId: string, title: string): RootThunkType => async (dispatch) => {
    try {
        const res = await todolistApi.createTodolist(title)
        dispatch(addNewTodolistAC(res.data.data.item))
        debugger
    } catch (e) {
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): RootThunkType => async (dispatch) => {
    try {
        const res = await todolistApi.updateTodolist(todolistId, title)
        dispatch(changeTodolistTitleAC(todolistId, title))
    } catch (e) {
    }
}

// types
export type TodolistsActionsType =
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
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
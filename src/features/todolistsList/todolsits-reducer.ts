import {FilterTodolistType} from "../../components/app/appWithRedux/AppWithRedux";
import {
    todolistApi,
    TodolistType
} from "../../api/todolist-api";
import {
    AppActionsType,
    RootThunkType
} from "../../components/app/store";
import {RequestStatusType, appActions,} from "../../components/app/app-reducer";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import { fetchTasksTC } from "./tasks-reducer";



const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        /* export type TodolistsActionsType =
    | ReturnType<typeof searchTodolistAC> +
    | ReturnType<typeof addNewTodolistAC> +
    | ReturnType<typeof changeTodolistTitleAC> +
    | ReturnType<typeof changeTodolistFilterAC> +
    | ReturnType<typeof removeTodolistAC> +
    | ReturnType<typeof setTodolistsAC> +
    | ReturnType<typeof setAppStastusAC> -
    | ReturnType<typeof changeTodolistStatusAC> + */ 
        searchTodolist: (state, action: PayloadAction<{title: string}>) => {
            const index = state.findIndex(todo => todo.title === action.payload.title);
            if (index !== -1) {
             return [state[index]];
            }
            return []
        },
        setTodolists: (state, action: PayloadAction<{todolists: Array<TodolistType>}>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        addNewTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodolist)
        },
        changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const todo = state.find(todo => todo.id === action.payload.todolistId)
            if (todo) {
                todo.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{todolistId: string, newChangeFilter: FilterTodolistType}>) => {
            const todo = state.find(todo => todo.id === action.payload.todolistId)
            if (todo) {
                todo.filter = action.payload.newChangeFilter
            }
        },
        removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            //const newTodos = state.filter(todo => todo.id !== action.payload.todolistId)
            // "Mutate" the existing state to save the new array
            const index = state.findIndex(todo => todo.id=== action.payload.todolistId);
            //state = newTodos
            if (index !== -1) state.splice(index, 1)
        },
        changeTodolistStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) => {
            const todo = state.find(todo => todo.id === action.payload.todolistId)
            if (todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        }
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

/* export type TodolistsActionsType =
    | ReturnType<typeof searchTodolistAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStastusAC>
    | ReturnType<typeof changeTodolistStatusAC> */

export type TodolistsActionsType =
    | ReturnType<typeof todolistsActions.searchTodolist>
    | ReturnType<typeof todolistsActions.addNewTodolist>
    | ReturnType<typeof todolistsActions.changeTodolistTitle>
    | ReturnType<typeof todolistsActions.changeTodolistFilter>
    | ReturnType<typeof todolistsActions.removeTodolist>
    | ReturnType<typeof todolistsActions.setTodolists>
    //| ReturnType<typeof appActions.setAppStastus>
    | ReturnType<typeof todolistsActions.changeTodolistStatus>
/* 
export const _todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SEARCH-TODOLISTS': 
        //return state.filter(tl => tl.title.includes(action.title))
        return state.filter(tl => action.title === tl.title)

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
export const searchTodolistAC = (title: string) => {
    return {type: 'SEARCH-TODOLISTS' as const, title}
}
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
} */

// thunks
export const searchTodolistsTC = (title: string): RootThunkType => async (dispatch: Dispatch) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
   if (title) {
    dispatch(todolistsActions.searchTodolist({title: title}))
    //dispatch(setAppStastusAC("succeeded"))
    dispatch(appActions.setAppStastus({status: "succeeded"}))
   }
    } catch (e: any) {
alert("title is not finded!")
    }
    
}
export const fetchTodolistsTC = (): RootThunkType => async (dispatch: any) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    return todolistApi.getTodolists()
    .then(res => {
      dispatch(todolistsActions.setTodolists({ todolists: res.data }));
      dispatch(appActions.setAppStastus({ status: "succeeded" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id))
    })
    })
    .catch((error: any) => {
      dispatch(appActions.setAppError({ error: error.message }));
      dispatch(appActions.setAppStastus({ status: "succeeded" }));
      throw error;
    });
    /* try {
        const res = await todolistApi.getTodolists()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
        //dispatch(setAppStastusAC("succeeded"))
        dispatch(appActions.setAppStastus({status: "succeeded"}))
        return res.data
    } catch (e: any) {
        //dispatch(setAppErrorAC(e.message))
        dispatch(appActions.setAppError({error: e.message}))
        //dispatch(setAppStastusAC("succeeded"))
        dispatch(appActions.setAppStastus({status: "succeeded"}))
    } */
}
export const removeTodolistTC = (todolistId: string): RootThunkType => async (dispatch: Dispatch) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
        const res = await todolistApi.deleteTodolist(todolistId)
        dispatch(todolistsActions.removeTodolist({todolistId: todolistId}))
        //dispatch(setAppStastusAC("succeeded"))
        dispatch(appActions.setAppStastus({status: "succeeded"}))
    } catch (e: any) {
        //dispatch(setAppErrorAC(e.message))
        dispatch(appActions.setAppError({error: e.message}))
        //dispatch(setAppStastusAC("failed"))
        dispatch(appActions.setAppStastus({status: 'failed'}))
        
    }
}
export const addTodolistTC = (title: string): RootThunkType => async (dispatch: Dispatch) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
        const res = await todolistApi.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.addNewTodolist({todolist: res.data.data.item}))
            //dispatch(setAppStastusAC("succeeded"))
            dispatch(appActions.setAppStastus({status: "succeeded"}))
        } else {
            if (res.data.messages) {
                //dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(appActions.setAppError({error: res.data.messages[0]}))
            } else {
                //dispatch(setAppErrorAC('some error occurred'))
                dispatch(appActions.setAppError({error: 'some error occurred'}))
            }
            //dispatch(setAppStastusAC('failed'))
            dispatch(appActions.setAppStastus({status: 'failed'}))
        }

    } catch (e: any) {
        //dispatch(setAppErrorAC(e.message))
        dispatch(appActions.setAppError({error: e.message}))
        //dispatch(setAppStastusAC("failed"))
        dispatch(appActions.setAppStastus({status: 'failed'}))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): RootThunkType => async (dispatch: Dispatch) => {
    try {
        const res = await todolistApi.updateTodolist(todolistId, title)
        dispatch(todolistsActions.changeTodolistTitle({todolistId: todolistId, title: title}))
    } catch (e: any) {
        //dispatch(setAppErrorAC(e.message))
        dispatch(appActions.setAppError({error: e.message}))
        //dispatch(setAppStastusAC("failed"))
        dispatch(appActions.setAppStastus({status: 'failed'}))
    }
}

// types
/* export type TodolistsActionsType =
    | ReturnType<typeof searchTodolistAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStastusAC>
    | ReturnType<typeof changeTodolistStatusAC> */

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
import {TDispatch} from "./store";
import {authAPI, todolistApi} from "../../api/todolist-api";
//import {addNewTodolistAC, setTodolistsAC} from "../../features/todolistsList/todolsits-reducer";
import {authActions} from "../../features/login/auth-reducer";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { string } from "prop-types";
//import {setIsLoggedIn} from "../../features/login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string

const initialState = {
    error: null as string | null,
    status: 'idle' as RequestStatusType,
    isInitialized: false
}

export type AppInitialStateType = typeof initialState;

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
state.error = action.payload.error
        },
        setAppStastus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
})

export const appReducer = slice.reducer
export const appActions = slice.actions



/* const initialState = {
    status: 'idle' as RequestStatusType,
    error: '' as RequestErrorType,
    isInitialized: false
} */

/* export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-APP-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
} */

// actions
/* export const setAppErrorAC = (error: RequestErrorType) => ({type: "APP/SET-ERROR" as const, error})
export const setAppStastusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS" as const, status})
export const setAppInitializedAC = (value: boolean) => ({type: "APP/SET-APP-IS-INITIALIZED" as const, value}) */

export const initializeAppTC = () => async (dispatch: TDispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            //dispatch(setIsLoggedInAC(true))
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
        } else {
            if (res.data.messages) {
                const data = res.data.messages
                //dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(appActions.setAppError({error: res.data.messages[0]}))
            } else {
                //dispatch(setAppErrorAC('some error occurred'))
                dispatch(appActions.setAppError({error: 'some error occurred'}))
            }
            dispatch(appActions.setAppStastus({status: 'failed'}))
        }
        dispatch(appActions.setAppInitialized({isInitialized: true}))
    } catch (e: any) {
        dispatch(appActions.setAppError({error: e.message}))
        dispatch(appActions.setAppStastus({status: "succeeded"}))
    }

}

// types




/* export type AppActionsType =
    | ReturnType<typeof setAppStastusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC> */

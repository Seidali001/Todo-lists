import {
    appActions,
    /* setAppErrorAC, */
    /*SetAppErrorActionType,*/
    /* setAppStastusAC, */
    /*setAppStatusAC,
    SetAppStatusActionType*/
} from '../../components/app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {TDispatch} from "../../components/app/store";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

/* const initialState = {
    isLoggedIn: false
} */
/* type InitialStateType = typeof initialState */
/* 
export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const) */

// thunks

export const loginTC = (data: LoginParamsType): any => async (dispatch: TDispatch) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            //dispatch(setIsLoggedInAC(true))
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            //dispatch(setAppStastusAC("succeeded"))
            dispatch(appActions.setAppStastus({status: "succeeded"}))
            /*dispatch(addNewTodolistAC(res.data.data.userId))
            dispatch(setAppStastusAC("succeeded"))*/
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

export const logoutTC = (): any => async (dispatch: TDispatch) => {
    //dispatch(setAppStastusAC("loading"))
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            //dispatch(setIsLoggedInAC(false))
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            //dispatch(setAppStastusAC("succeeded"))
            dispatch(appActions.setAppStastus({status: "succeeded"}))
            /*dispatch(addNewTodolistAC(res.data.data.userId))
            dispatch(setAppStastusAC("succeeded"))*/
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

// types
/* type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType */

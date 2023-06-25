import {TDispatch} from "./store";
import {authAPI, todolistApi} from "../../api/todolist-api";
//import {addNewTodolistAC, setTodolistsAC} from "../../features/todolistsList/todolsits-reducer";
import {setIsLoggedInAC} from "../../features/login/auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: '' as RequestErrorType,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
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
}

// actions
export const setAppErrorAC = (error: RequestErrorType) => ({type: "APP/SET-ERROR" as const, error})
export const setAppStastusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS" as const, status})
export const setAppInitializedAC = (value: boolean) => ({type: "APP/SET-APP-IS-INITIALIZED" as const, value})

export const initializeAppTC = () => async (dispatch: TDispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))

        } else {
            if (res.data.messages) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('some error occurred'))
            }
            dispatch(setAppStastusAC('failed'))
        }
        dispatch(setAppInitializedAC(true))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStastusAC("succeeded"))
    }

}

// types
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string


export type AppActionsType =
    | ReturnType<typeof setAppStastusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>

import { Dispatch } from 'redux'
import {
    AppActionsType,
    setAppErrorAC,
    /*SetAppErrorActionType,*/
    setAppStastusAC,
    /*setAppStatusAC,
    SetAppStatusActionType*/
} from '../components/app/app-reducer'
import {authAPI, LoginParamsType} from "../api/todolist-api";
import {TDispatch} from "../components/app/store";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

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
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks


export const loginTC = (data: LoginParamsType): any => async (dispatch: TDispatch) => {
    dispatch(setAppStastusAC("loading"))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            alert('OK')
            dispatch(setAppStastusAC("succeeded"))
            /*dispatch(addNewTodolistAC(res.data.data.userId))
            dispatch(setAppStastusAC("succeeded"))*/
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

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType

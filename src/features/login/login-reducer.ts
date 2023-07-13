import {Dispatch} from "redux";
import {RootThunkType, TDispatch} from "../../components/app/store";
import {authAPI, LoginParamsType, TasksType, todolistApi} from "../../api/todolist-api";
import {appActions} from "../../components/app/app-reducer";
//import {addNewTodolistAC, setTodolistsAC} from "../todolistsList/todolsits-reducer";

const initialState: any = {
    isLoggedIn: false
}
export type initialStateType = {
    isLoggedIn: boolean
}

export type TasksActionsType = any
export const loginReducer = (state: initialStateType = initialState, action: TasksActionsType ) => {
    switch (action.type) {

        default:
            return state
    }
}

export const loginTC2 = (data: LoginParamsType): any => async (dispatch: TDispatch) => {
    dispatch(appActions.setAppStastus({status: "loading"}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            alert('OK')
            dispatch(appActions.setAppStastus({status: "succeeded"}))
            /*dispatch(addNewTodolistAC(res.data.data.userId))
            dispatch(setAppStastusAC("succeeded"))*/
        } else {
            if (res.data.messages) {
                dispatch(appActions.setAppError({error: res.data.messages[0]}))
            } else {
                dispatch(appActions.setAppError({error: 'some error occurred'}))
            }
            dispatch(appActions.setAppStastus({status: 'failed'}))
        }
    } catch (e: any) {
        dispatch(appActions.setAppError({error: e.message}))
        dispatch(appActions.setAppStastus({status: "failed"}))
    }
}

// thunks
/*export const loginTC = (data: LoginParamsType): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStastusAC("loading"))
    authAPI.login(data)
}*/




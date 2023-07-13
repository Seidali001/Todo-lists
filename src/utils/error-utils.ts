import { appActions } from '../components/app/app-reducer'
//import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'
import {TDispatch} from "../components/app/store";


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: TDispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStastus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: TDispatch) => {
    dispatch(appActions.setAppError({error: error.message}))
    dispatch(appActions.setAppStastus({status: 'failed'}))
}



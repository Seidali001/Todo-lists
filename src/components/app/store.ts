import {tasksActions, tasksReducer} from '../../features/todolistsList/tasks-reducer'
import {todolistsReducer} from '../../features/todolistsList/todolsits-reducer'
import {appReducer} from './app-reducer'
import { combineReducers, AnyAction} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authReducer} from "../../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {TasksActionsType} from "../../features/todolistsList/tasks-reducer"
import {TodolistsActionsType} from "../../features/todolistsList/todolsits-reducer"


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

//export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppActionsType = TasksActionsType | TodolistsActionsType

/*export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>*/
// определить автоматически тип всего объекта состояния
//export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootStateType = ReturnType<typeof store.getState>

// Правильный тип TypeScript для отправки thunk
export type TDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>;


// Типизация санки:
// 1) что возвр функция
// 2) тип стейта
// 3) екстра-аргументы
// 4) общий тип экшенов
export type RootThunkType<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, TasksActionsType>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
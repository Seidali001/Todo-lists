import {TasksActionsType, tasksReducer} from '../../features/todolistsList/tasks-reducer'
import {TodolistsActionsType, todolistsReducer} from '../../features/todolistsList/todolsits-reducer'
import {applyMiddleware, combineReducers, createStore, Dispatch, AnyAction} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppActionsType = TodolistsActionsType | TasksActionsType

/*export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>*/
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// Правильный тип TypeScript для отправки thunk
export type TDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>;


// Типизация санки:
// 1) что возвр функция
// 2) тип стейта
// 3) екстра-аргументы
// 4) общий тип экшенов
export type RootThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
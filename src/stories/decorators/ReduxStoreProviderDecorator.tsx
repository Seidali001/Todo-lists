import {AppRootStateType, store} from "../../components/app/store";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/todolistsList/tasks-reducer";
import {TodolistDomainType, todolistsReducer} from "../../features/todolistsList/todolsits-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import { appReducer } from "../../components/app/app-reducer";
import {applyMiddleware} from 'redux'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistID1", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: 'idle'},
        {id: "todolistID2", title: "What to read", filter: "all", addedDate: "", order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistID1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" },
            {id: '2', title: 'JS', status: TaskStatuses.New, todoListId: "todolistID1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" },
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistID1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistID2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" },
            {id: '2', title: 'milk', status: TaskStatuses.New, todoListId: "todolistID2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" },
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistID2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: "idle" }
        ]
    },
    app: {
        status: 'idle',
        error: "",
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}
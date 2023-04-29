import {TaskType} from '../Todolist';
import {v1} from "uuid";
export const TasksReducer = (state: TaskType[], action: tsarType)=> {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(el=> el.id !==action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask =  { id: v1(), title: action.payload.title, isDone: false }
            return [newTask, ...state]
        }
       /* case 'CHANGE-TASK-STATUS': {
            return state.map(el => el.id === action.payload.taskId? el.isDone = action.payload.status : el)
        }*/

        default:
            return state
    }
}

type tsarType = removeTaskACType | addTaskACType /*| changeTaskStatusACType*/

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string)=> {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id
        }
    } as const
}
 export type addTaskACType = ReturnType <typeof addTaskAC>
export const addTaskAC = (title:string)=> {
    return{
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}

/*
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId:string, status: boolean)=> {
    return{
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            status
        }
    } as const
}*/

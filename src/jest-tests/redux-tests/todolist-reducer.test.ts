import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "../../../src/features/todolistsList/todolsits-reducer";
import {FilterTodolistType} from "../../components/app/appWithRedux/AppWithRedux";
import {v1} from "uuid";
import {TodolistType} from "../../api/todolist-api";
import { RequestStatusType } from "../../components/app/app-reducer";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let todolistID5: string
let todolistID6: string

let newTodolist: TodolistDomainType

let newTodolistTitle: string
let newFilterValueActive: FilterTodolistType
let newFilterValueCompleted: FilterTodolistType
let newStatusValueCompleted: RequestStatusType

let startValueStateWithFilter: TodolistDomainType[]
let startValueStateForTask: Array<TodolistType>
let startStateWithFilter: TodolistDomainType[]


beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()
    todolistID5 = v1()

    todolistID6 = v1()

    newTodolistTitle = "What to learn"
    newFilterValueActive = "active"
    newFilterValueCompleted = "completed"

    newStatusValueCompleted = "succeeded"

    newTodolist = {id: todolistID6, title: "What to buy", addedDate: "", order: 0, filter: "all", entityStatus: 'idle'}

    startValueStateWithFilter = [
        {id: todolistID1, title: "What to buy", addedDate: "", order: 2, filter: 'all', entityStatus: 'idle'},
        {id: todolistID2, title: "What to read", addedDate: "", order: 2, filter: 'all', entityStatus: 'idle'}
    ]

    startStateWithFilter = [
        {id: todolistID4, title: "What to do", addedDate: "", order: 0, filter: "all", entityStatus: 'idle'},
        {id: todolistID5, title: "What to need", addedDate: "", order: 0, filter: "all", entityStatus: 'idle'}
    ]
})

test("test should remove one of todolist", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, removeTodolistAC(todolistID1))

    expect(endStateValue.length).toEqual(1)
    expect(endStateValue[0].title).toBe("What to read")

})


test("test should change todolist title", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endStateValue[0].title).toBe(newTodolistTitle)
    expect(endStateValue[1].title).toBe("What to read")

})

test("test should change todolist title immutability", () => {

    const copyStartValueState = [...startValueStateWithFilter]

    let endStateValue = todolistsReducer(copyStartValueState, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endStateValue[0].title).toBe("What to learn")
    expect(endStateValue[1].title).toBe("What to read")
    expect(startValueStateWithFilter[0].title).toBe("What to buy")
    expect(startValueStateWithFilter[1].title).toBe("What to read")


})

test("test should change todolist filter immutability", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, changeTodolistFilterAC(todolistID1, newFilterValueCompleted))

    expect(endStateValue[0].filter).toBe("completed")
    expect(endStateValue[1].filter).toBe("all")
    expect(startValueStateWithFilter[0].filter).toBe("all")
    expect(startValueStateWithFilter[1].filter).toBe("all")

})

test("test should change todolist status immutability", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, changeTodolistStatusAC(todolistID2, newStatusValueCompleted))

    expect(endStateValue[0].entityStatus).toBe("idle")
    expect(endStateValue[1].entityStatus).toBe("succeeded")
    

})


test("test should add new todolist", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, addNewTodolistAC(newTodolist))

    expect(endStateValue.length).toBe(3)

})
/*test("test should be set new todolist to the state", () => {

    const newTodoWithoutFilter = [{id: todolistID1, title: "What to read", addedDate: "", order: 2}]

    let endStateValue = todolistsReducer(startValueStateWithFilter, setTodolistsAC(newTodoWithoutFilter))

    expect(endStateValue.length).toBe(3)

})*/

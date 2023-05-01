import {addNewTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "../../state/todolsits-reducer";
import {TasksStateType} from "../../components/appWithRedux/AppWithRedux";
import {addTaskAC, tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../api/todolist-api";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let todolistID5: string
let todolistID6: string
let newTodolistTitle: string
let newFilterValue: string

let startStateWithoutFilter: TodolistType[]
let startState: TasksStateType;
let newTitle: string
let newTitle0:string

let newTodolist: TodolistDomainType
let startStateWithFilter: TodolistDomainType[]

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID4 = v1()
    todolistID5 = v1()
    todolistID6 = v1()
    todolistID3 = 'todolistId2'

    newTodolistTitle = "What to learn"
    newFilterValue = "active"

    newTodolist = {id: todolistID6, title: "What to buy", addedDate: "", order: 0, filter: "all"}



    startStateWithoutFilter = [
        {id: todolistID1, title: "What to buy", addedDate: "", order: 0},
        {id: todolistID2, title: "What to read", addedDate: "", order: 0}
    ]

    startStateWithFilter = [
        {id: todolistID4, title: "What to do", addedDate: "", order: 0, filter: "all"},
        {id: todolistID5, title: "What to need", addedDate: "", order: 0, filter: "all"}
    ]

    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: '2', title: 'JS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: '2', title: 'milk', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
    }
    newTitle = 'TS'
    newTitle0 = 'weather'
})

test('new array should be added when new todolist is added', () => {

    const action = addNewTodolistAC(newTodolist)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('new todolist should be added', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState = []

    const endTodolistsState = todolistsReducer(startStateWithFilter, addNewTodolistAC(newTodolist))

    expect(endTodolistsState.length).toEqual(3)
    expect(startStateWithFilter[0].title).toBe("What to do")

})

test('property with todolistId should be deleted', () => {

    const action2 = removeTodolistAC('todolistId2')

    const endState2 = tasksReducer(startState, action2)

    const keys = Object.keys(endState2)

    expect(keys.length).toBe(1)
    expect(endState2['todolistId2']).not.toBeDefined()
})

/*test("test should add new todolist and then add new task", () => {

    const actionAddTodolist = addNewTodolistAC('todolistId3', newTitle)
    const endStateForAddTodolist = todolistsReducer(startStateWithoutFilter, actionAddTodolist)

    const endStateValueForAddTask = tasksReducer(startState, addTaskAC(todolistID3, newTitle0))

    expect(endStateForAddTodolist.length).toBe(3)
   // expect(endStateValueForAddTask['todolistId3'][0].title).toBe('TS')
    expect(endStateValueForAddTask['todolistId1'].length).toBe(3)

})*/

/*test("test should add new todolist and then add new task", () => {

   let todolistID1 = v1()
   let todolistID2 = v1()
   let todolistID3 = 'todolistId3'

   let newTitleForTodolist = "What to learn"

   const todoState : TodolistDomainType[]  = [
        {id: todolistID1, title: "What to buy", addedDate: "", order: 0, filter: "all"},
        {id: todolistID2, title: "What to read", addedDate: "", order: 0, filter: "all"}
    ]
    let taskStartState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    let newTitleForTask = 'weather'

    const actionAddTodolist = addNewTodolistAC(todolistID3, newTitleForTodolist)
    const endStateForAddTodolist = todolistsReducer(todoState, actionAddTodolist)

    const endStateValueForAddTask = tasksReducer(taskStartState, addTaskAC(todolistID3, newTitleForTask))

    expect(endStateForAddTodolist.length).toBe(3)
    expect(endStateValueForAddTask['todolistId3'].length).toBe(1)

})*/

import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    changeTaskStatusAC, changeTaskTitleAC
} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../../components/appWithRedux/AppWithRedux";
import {TaskPriorities, TaskStatuses, TasksType} from "../../api/todolist-api";





let todolistId1: string
let todolistId2: string

let startValueTesting: TasksStateType
let newTask: {
    id: string,
    title: string,
    isDone: boolean
}
let newTitle1: string
let newTitle2: string
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startValueTesting = {
        [todolistId1]: [
            {id: v1(), title: "html & css", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 },
            {id: v1(), title: "js", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 },
            {id: v1(), title: "react", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 }
        ],

        [todolistId2]: [
            {id: v1(), title: "redux", status: 1, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 },
            {id: v1(), title: "mobx", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 },
            {id: v1(), title: "js", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 },
            {id: v1(), title: "ts", status: 0, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0 }
        ]
    }

    newTask = {id: v1(), title: "restApi", isDone: false}
    newTitle1 = "html5"
    newTitle2 = "redux-toolkit"
})
test("test should remove task", () => {

    const oneOfTask = startValueTesting[todolistId2].find(el => el.id === el.id)
    if (!oneOfTask){
        return
    }
    let idTask = oneOfTask.id;

    const endStateValue = tasksReducer(startValueTesting, removeTaskAC(todolistId2, idTask))

    expect(endStateValue[todolistId2].length).toBe(3)
    // expect(endStateValue.childrenCount).toBe(6)

})


test("test should add task", () => {

    const newTitle = "MobX"
    const newTask: TasksType = {
        id: todolistId1,
        title: newTitle,
        status: TaskStatuses.New,
        todoListId: todolistId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }

    const endStateValue = tasksReducer(startValueTesting, addTaskAC(newTask))

    expect(endStateValue[todolistId1].length).toBe(4)
    expect(endStateValue[todolistId2].length).toBe(4)


})

test("test should change task status", () => {

    const firstOfTask = startValueTesting[todolistId1][0]
    const secondOfTask = startValueTesting[todolistId2][0]
    //const statusChanged = firstOfTask.status

    const endStateValueForFirstTodo = tasksReducer(startValueTesting,changeTaskStatusAC(todolistId1, firstOfTask.id, 1))
    const endStateValueForSecondTodo = tasksReducer(startValueTesting,changeTaskStatusAC(todolistId2, secondOfTask.id, 0))

     expect(endStateValueForFirstTodo[todolistId1][0].status).toBe(1)
     expect(endStateValueForSecondTodo[todolistId2][0].status).toBe(0)

})
/*
test("test should change task status", () => {

    const a = 1
     let c;
    function  sum (a: number) {
        return a + 3
    }

    c = sum(2)

    expect(c).toBe(5)
    //expect(endStateValue.childrenCount).toBe(6)

})*/

test("test should change task title", () => {

    const idFirstOfTaskFromFirstTodo = startValueTesting[todolistId1][0].id
    const idFirstOfTaskFromSecondTodo = startValueTesting[todolistId2][0].id


    const endStateValue1 = tasksReducer(startValueTesting,changeTaskTitleAC(todolistId1, idFirstOfTaskFromFirstTodo, newTitle1))
    const endStateValue2 = tasksReducer(startValueTesting,changeTaskTitleAC(todolistId2, idFirstOfTaskFromSecondTodo, newTitle2))

    expect(endStateValue1[todolistId1][0].title).toBe("html5")
    expect(endStateValue2[todolistId2][0].title).toBe("redux-toolkit")

})


import {
    appReducer,
    InitialStateType,
    RequestErrorType,
    RequestStatusType,
    setAppErrorAC,
    setAppStastusAC
} from "./app-reducer";

let startValueState: InitialStateType
beforeEach(() => {


    startValueState = {
        status: "idle" as RequestStatusType,
        error: "" as RequestErrorType
    }
})

test("test should change status value", () => {

    let endStateStatusValue = appReducer(startValueState, setAppStastusAC('succeeded'))

    expect(endStateStatusValue.status).toBe('succeeded')

})

test("test should change error value", () => {

    let endStateErrorValue = appReducer(startValueState, setAppErrorAC(null))

    expect(endStateErrorValue.error).toBe(null)

})

/*test("test should change todolist title", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endStateValue[0].title).toBe(newTodolistTitle)
    expect(endStateValue[1].title).toBe("What to read")

})*/

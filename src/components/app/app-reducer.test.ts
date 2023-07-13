import {
    appReducer,
    RequestErrorType,
    RequestStatusType,
    appActions,
    AppInitialStateType
    /* setAppErrorAC,
    setAppStastusAC */
} from "./app-reducer";

/* type InitialStateType = {
    error: string | null;
    status: RequestStatusType;
    isInitialized: boolean;
} */

let startValueState: AppInitialStateType
beforeEach(() => {
    startValueState = {
    error: null as null | "" ,
    status: "idle",
    isInitialized: false
    }
})

test("test should change status value", () => {

    let endStateStatusValue = appReducer(startValueState, appActions.setAppStastus({status: 'succeeded'}))

    expect(endStateStatusValue.status).toBe('succeeded')

})

test("test should change error value", () => {

    let endStateErrorValue = appReducer(startValueState, appActions.setAppError({error: null}))

    expect(endStateErrorValue.error).toBe(null)

})

/*test("test should change todolist title", () => {

    let endStateValue = todolistsReducer(startValueStateWithFilter, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endStateValue[0].title).toBe(newTodolistTitle)
    expect(endStateValue[1].title).toBe("What to read")

})*/

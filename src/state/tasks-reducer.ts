

const User = {
    age: 23,
    name: "John",
    childrenCount: 6,
    status: "married"
}

type UserType = {
    age: number,
    name: string,
    childrenCount: number,
    status: string
}

type ActionType = {
    type: string
    [key: string]: string | number
}

export const userReducer = (state: UserType, action: ActionType): any => {
switch (action.type) {
    case 'INCREMENT-AGE':
        //let newState = state.age = state.age + 1
        //return newState
        return {
            ...state, age: state.age + 1
        }
    case 'INCREMENT-CHILDREN-COUNT':
        //let newState = state.childrenCount = state.childrenCount + 1
        //return newState
        return {
            ...state, childrenCount: state.childrenCount + 1
        }
    case 'ADD-NEW-VALUE':
        //let newState = state.childrenCount = state.childrenCount + 1
        //return newState
        return {
            ...state,
            ['mood']: 'good'
        }
    case 'CHANGE-USER-NAME':
        return {
            ...state, name: action.newName
        }
    default:
        throw new Error("something is wrong!")
}
}


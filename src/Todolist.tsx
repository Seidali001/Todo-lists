import React from "react";

type TodolistProps = {
    title?: string
    tasks: Array<TasksType>
}

type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                    <button onClick={()=> {alert(el.id)}}>x</button>
                    </li>
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
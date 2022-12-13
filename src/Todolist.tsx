import React from 'react';
import {filterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTasks: (id: number) => void,
    tasksFilter:(filterValue:filterType) => void,

}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((t) => {
                return (
                    <li key={t.id}>
                        <button onClick={() => {
                            props.removeTasks(t.id)}}>x</button>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={()=>{props.tasksFilter('All')}}>All</button>
            <button onClick={()=>{props.tasksFilter('Active')}}>Active</button>
            <button onClick={()=>{props.tasksFilter('Completed')}}>Completed</button>
        </div>
    </div>
}

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    if (filter === "Delete all Tasks") {
        tasksForTodolist.length = 0
        // tasksForTodolist = props.tasks.filter(t => t.id < 0);
    }
    if (filter === "Show first 3 tasks") {
        tasksForTodolist.length = 3;
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function deleteAllTasks(value: FilterValuesType) {
        setFilter(value)
    }

    function showFirstThreeTasks(value: FilterValuesType) {
        setFilter(value)
    }

    let [newTaskTitle, setInputTitle] = useState('')

    const onChangeNewTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyPressNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setInputTitle('')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={onKeyPressNewTaskHandler}
                       onChange={onChangeNewTaskHandler}
                       value={newTaskTitle}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={() => {
                    showFirstThreeTasks('Show first 3 tasks')
                }}>Show first 3 tasks
                </button>
                <button onClick={() => {
                    deleteAllTasks("Delete all Tasks")
                }}>Delete all Tasks
                </button>
                <button onClick={() => {
                    changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter("completed")
                }}>Completed
                </button>

            </div>
        </div>
    )
}


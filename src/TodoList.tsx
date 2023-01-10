import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
// title - заголовок
// tasks - список задач

type TodoListPropsType = {
    removeTodolist: (todolistId: string) => void
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle:(title: string, todolistId: string) =>void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const changeTodolistTitle=(title:string)=>{
        props.changeTodolistTitle(title,props.todolistId)
    }
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(task.id, props.todolistId)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
            const onChangeSetTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todolistId)
            }
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeSetTaskStatus}
                    />
                    <EditableSpan title={task.title} classes={isDoneClasses} changeTitle={onChangeSetTaskTitle}/>
                    {/*<span className={isDoneClasses}>{task.title}</span>*/}
                    <button onClick={onClickRemoveTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId)
    const onClickRemoveTodolistHandler = () => props.removeTodolist(props.todolistId)



    return (
        <div>
            <h3><EditableSpan title={props.title} classes={''} changeTitle={changeTodolistTitle} /></h3>
            <button onClick={onClickRemoveTodolistHandler}>x</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
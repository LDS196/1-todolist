import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
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

                    <Checkbox
                        checked={task.isDone}
                        onChange={onChangeSetTaskStatus}
                    size={"small"}/>
                    <EditableSpan title={task.title} classes={isDoneClasses} changeTitle={onChangeSetTaskTitle}/>
                    <IconButton onClick={onClickRemoveTaskHandler}
                    size={"small"}
                    color={'secondary'}>
                        <CancelPresentationIcon/>
                    </IconButton>
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
            <IconButton onClick={onClickRemoveTodolistHandler}
                        size={"small"}
                        color={'secondary'}>
                <CancelPresentationIcon/>
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <ButtonGroup fullWidth>
                    <Button
                        sx={{mr: '3px'}}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color={props.filter === "all" ? "primary" : "secondary"}
                        size={"small"}
                        disableElevation
                        onClick={getOnClickSetFilterHandler("all")}>All
                    </Button>
                    <Button
                        sx={{mr: '3px'}}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        size={"small"}
                        disableElevation
                        onClick={getOnClickSetFilterHandler("active")}>Active
                    </Button>
                    <Button
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        size={"small"}
                        disableElevation
                        onClick={getOnClickSetFilterHandler("completed")}>Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    );
};

export default TodoList;
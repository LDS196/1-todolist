import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {
    let [inputValue, setInputValue] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value
        setInputValue(inputValue)
    }
    const addTasksHandler = () => {
        props.addTask(inputValue);
        setInputValue('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTasksHandler()
        }
    }
    const removeTaskHandler = (tId:string) => {
        props.removeTask(tId)
    }
    const changeFilterHandler = (value:FilterValuesType)=>{
        props.changeFilter(value)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHandler} value={inputValue} onKeyDown={onKeyPressHandler}/>
            {/*<button onClick={addTasksHandler}>+</button>*/}
            <Button name={'+'} callBack={addTasksHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>

                            <Button name={'x'} callBack={() =>{removeTaskHandler(t.id)}} />
                        </li>)
                })
            }
        </ul>
        <div>
            <Button name={'all'} callBack={()=>{changeFilterHandler('all')}}/>
            <Button name={'Active'} callBack={()=>{changeFilterHandler('active')}}/>
            <Button name={'Completed'} callBack={()=>{changeFilterHandler('completed')}}/>
        </div>
    </div>
}

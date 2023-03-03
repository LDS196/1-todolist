import React, {useEffect, useState} from 'react'

import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const onChangeTitleHandler = (e: any) => {
        setTitle(e.currentTarget.value)
    }
    // useEffect(() => {
    //     todolistAPI.createTodolist(title)
    //         .then(res => setState(res.data))
    // }, [])
    const createTodolist= async ()=>{
        const res= await todolistAPI.createTodolist(title)
        setState(res.data)
    }

    return <div>
        <input placeholder={'title'} onChange={onChangeTitleHandler} value={title}/>
        <button onClick={createTodolist}>updateTodolistTitle</button>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {

    const [todolistId, settodolistId] = useState('')
    const [state, setState] = useState<any>(null)
    const onChangeTodolistIdHandler = (e: any) => {
        settodolistId(e.currentTarget.value)
    }
    const deleteTodolist= async ()=>{
        const res = await todolistAPI.deleteTodolist(todolistId)
        setState(res.data)
    }
    // useEffect(() => {
    //     todolistAPI.deleteTodolist(todolistId)
    //         .then(res => setState(res.data))
    //
    // }, [])

    return <div>
        <input placeholder={'todolistId'} onChange={onChangeTodolistIdHandler} value={todolistId}/>

        <button onClick={deleteTodolist}>deleteTodolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState('')
    const [title, setTitle] = useState('')
    const onChangeTodolistIdHandler = (e: any) => {
        settodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: any) => {
        setTitle(e.currentTarget.value)
    }
    const updateTodolistTitle = async () => {
        const result = await todolistAPI.updateTodolist(todolistId, title)
        setState(result.data)
    }
    return <div>
        <input placeholder={'todolistId'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
        <input placeholder={'title'} onChange={onChangeTitleHandler} value={title}/>
        <button onClick={updateTodolistTitle}>updateTodolistTitle</button>
        <div>{JSON.stringify(state)}</div>
    </div>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const onChangeTodolistIdHandler = (e: any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: any) => {
        setTitle(e.currentTarget.value)
    }
    const createTaskTitle = async () => {
        const result = await todolistAPI.createTask(todolistId, title)
        setState(result)
        console.log(result.data)
    }
    return <div>
        <input placeholder={'todolistId'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
        <input placeholder={'title'} onChange={onChangeTitleHandler} value={title}/>
        <button onClick={createTaskTitle}>CreateTask</button>
        <div>{JSON.stringify(state)}</div>
    </div>

}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const onChangeHandler = (e: any) => {
        setTodolistId(e.currentTarget.value)
    }

    const getTasks = async () => {
        const result = await todolistAPI.getTask(todolistId)
        setState(result.data)
        console.log(result.data.items)
    }
    return <div>
        <input placeholder={'todolistId'} onChange={onChangeHandler} value={todolistId}/>
        <button onClick={getTasks}>GetTask</button>
        <div>{JSON.stringify(state)}</div>
    </div>

}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')
    const onChangeTodolistIdHandler = (e: any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: any) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: any) => {
        setTitle(e.currentTarget.value)
    }
    const createTaskTitle = async () => {
        const result = await todolistAPI.updateTaskTitle(todolistId,taskId, title)
        setState(result)
        console.log(result.data)
    }
    return <div>
        <input placeholder={'todolistId'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
        <input placeholder={'taskId'} onChange={onChangeTaskIdHandler} value={taskId}/>
        <input placeholder={'title'} onChange={onChangeTitleHandler} value={title}/>
        <button onClick={createTaskTitle}>UpdateTaskTitle</button>
        <div>{JSON.stringify(state)}</div>
    </div>

}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const onChangeTodolistIdHandler = (e: any) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: any) => {
        setTaskId(e.currentTarget.value)
    }

    const deleteTask = async () => {
        const result = await todolistAPI.deleteTask(todolistId,taskId)
        setState(result)
        console.log(result.data)
    }
    return <div>
        <input placeholder={'todolistId'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
        <input placeholder={'taskId'} onChange={onChangeTaskIdHandler} value={taskId}/>

        <button onClick={deleteTask}>DeleteTask</button>
        <div>{JSON.stringify(state)}</div>
    </div>

}
// 4a87aca2-d4bc-4677-a854-ce5576074cc8
// d8a38f66-12e7-458f-a7ee-dabdc2d1fae9
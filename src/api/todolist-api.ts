import axios from "axios";


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ba71c7c5-1897-400e-80cb-c18588c3e8b5'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instanse.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    createTask(todolistId: string, title: string) {
        return instanse.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    getTask(todolistId: string) {
        return instanse.get<ResponseGetTasks>(`todo-lists/${todolistId}/tasks`)
    },
    updateTaskTitle(todolistId: string,taskId,title){
        return instanse.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,{title})
    },
    deleteTask(todolistId: string,taskId,){
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
type TodolistType = {
    addedDate: string
    id: symbol
    order: number
    title: string
}
type TaskType = {
    addedDate: string
    deadline: null| string
    description: null| string
    id: string
    order: number
    priority: number
    startDate: null| string
    status: 0
    title: string
    todoListId: string
}
type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type ResponseGetTasks={
    error: null| string
    items: TaskType[]
    totalCount:number
}

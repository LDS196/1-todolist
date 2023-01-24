import {TodoListPropsType} from "../TodoList";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {REMOVE_TODOLIST} from "./constants";

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleAT = {
    type: 'ChangeTodolistTitle'
    title: string
    id: string
}
export type ChangeTodoListFilterAT = {
    type: 'ChangeTodoListFilter'
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodolist]
        case 'ChangeTodolistTitle':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'ChangeTodoListFilter':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }


}

export const RemoveTodolistAC=(id:string):RemoveTodolistAT=>({type: REMOVE_TODOLIST, id})
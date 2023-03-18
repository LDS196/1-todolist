import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, SetErrorType, setStatusAC, SetStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, entityStatus: 'idle', filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
} as const)
// thunks
export const fetchTodolistsTC = () => {
    return async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        try {
            const res = await todolistsAPI.getTodolists()
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        } catch (error) {
            if (axios.isAxiosError<{ message: string }>(error)) {
                const err = error.response ? error.response?.data : error
                handleServerNetworkError(dispatch, err)
            }
        }
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setStatusAC('loading'))
            dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
            const res = await todolistsAPI.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            }
        } catch (error) {
            if (axios.isAxiosError<{ message: string }>(error)) {
                const err = error.response ? error.response?.data : error
                handleServerNetworkError(dispatch, err)
            }
        }
    }
}

export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setStatusAC('loading'))
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            if (axios.isAxiosError<{ message: string }>(error)) {
                const err = error.response ? error.response?.data : error
                handleServerNetworkError(dispatch, err)
            }
        }

    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setStatusAC('loading'))
            const res = await todolistsAPI.updateTodolist(id, title)
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            if (axios.isAxiosError<{ message: string }>(error)) {
                const err = error.response ? error.response?.data : error
                handleServerNetworkError(dispatch, err)
            }
        }


    }
}


// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetStatusType
    | SetErrorType

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

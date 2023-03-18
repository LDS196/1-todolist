import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, SetErrorType, setStatusAC, SetStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatusTask: 'idle'}, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'CHANGE-ENTITY-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId
                    ? {...t, entityStatusTask: action.status}
                    : t))
            }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatusTask: 'idle'}))}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const changeEntityTaskStatusAC = (taskId: string, todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-ENTITY-TASK-STATUS', taskId, todolistId, status} as const)
// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setStatusAC('loading'))
        const res = await todolistsAPI.getTasks(todolistId)
        if (res.data.error === null) {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setStatusAC("succeeded"))
        } else {
            handleServerNetworkError(dispatch, {message: res.data.error})
            dispatch(setStatusAC("failed"))
        }
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response?.data : error
            handleServerNetworkError(dispatch, err)
        }
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setStatusAC('loading'))
        dispatch(changeEntityTaskStatusAC(taskId, todolistId, 'loading'))
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === ResultCode.ok) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatusAC('succeeded'))
            dispatch(changeEntityTaskStatusAC(taskId, todolistId, 'succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeEntityTaskStatusAC(taskId, todolistId, 'failed'))
        }
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response?.data : error
            handleServerNetworkError(dispatch, err)
        }
    }


}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === ResultCode.ok) {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        }
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response?.data : error
            handleServerNetworkError(dispatch, err)
        }
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        try {
            dispatch(setStatusAC('loading'))
            dispatch(changeEntityTaskStatusAC(taskId, todolistId, 'loading'))
            const state = getState()
            const task = state.tasks[todolistId].find(t => t.id === taskId)
            if (!task) {
                handleServerNetworkError(dispatch, {message: 'task not found in the state'})
                return
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel
            }
            const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
                dispatch(setStatusAC("succeeded"))
               dispatch( changeEntityTaskStatusAC(taskId, todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeEntityTaskStatusAC(taskId, todolistId, 'failed'))
            }
        } catch (error) {
            if (axios.isAxiosError<{ message: string }>(error)) {
                const err = error.response ? error.response?.data : error
                handleServerNetworkError(dispatch, err)
            }
        }

    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<DomainTaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetStatusType
    | SetErrorType
    | ReturnType<typeof changeEntityTaskStatusAC>
export type DomainTaskType = TaskType & { entityStatusTask: RequestStatusType }
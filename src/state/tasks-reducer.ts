import { TasksStateType, } from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>



type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType | RemoveTodolistActionType | AddTodolistActionType
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'ADD-TODOLIST':

            return {
                ...state, [action.todolistId]: []
            }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId,} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const
}

// export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE-TODOLIST', id: todolistId} as const
// }
// export const AddTodolistAC = (title: string): AddTodolistActionType => {
//     return { type: 'ADD-TODOLIST', title: title} as const
// }
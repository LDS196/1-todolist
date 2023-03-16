import {setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../api/todolists-api'
type ErrorUtilsDispatchType = Dispatch<SetStatusType | SetErrorType>


export const  handleServerNetworkError=(dispatch:ErrorUtilsDispatchType, error:{ message: string })=>{
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}
import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { TaskStatuses } from '../../../../api/todolists-api'

import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {DomainTaskType} from "../../tasks-reducer";

type TaskPropsType = {
    task:DomainTaskType,
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.task.entityStatusTask==='loading'}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} entityStatus={props.task.entityStatusTask} />
        <IconButton onClick={onClickHandler} disabled={props.task.entityStatusTask==='loading'}  >
            <Delete/>
        </IconButton>
    </div>
})

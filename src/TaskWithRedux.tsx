// type TaskWithReduxPropsType = {
//     task: TaskType
//     todolistId: string
// }
// export const TaskWithRedux = React.memo(({task, todolistId}: TaskWithReduxPropsType) => {
//     const dispatch = useDispatch()
//
//
//     const onClickHandler = () => {
//         const action = removeTaskAC(task.id, todolistId);
//         dispatch(action);
//     }
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         let newIsDoneValue = e.currentTarget.checked
//         const action = changeTaskStatusAC(task.id, newIsDoneValue, todolistId);
//         dispatch(action);
//     }
//     const onTitleChangeHandler = useCallback((newValue: string) => {
//         const action = changeTaskTitleAC(task.id, newValue, todolistId);
//         dispatch(action);
//     }, []);
//
//
//     return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
//         <Checkbox
//             checked={task.isDone}
//             color="primary"
//             onChange={onChangeHandler}
//         />
//
//         <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
//         <IconButton onClick={onClickHandler}>
//             <Delete/>
//         </IconButton>
//     </div>
// })
export const b=1
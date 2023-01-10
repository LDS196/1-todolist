import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
type AddItemFormPropsType={
addItem:(title:string)=>void
}
export const AddItemForm:FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTaskToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItemToTodoListHandler()
    const errorMessageStyles = {color: "hotpink", marginTop: "0", marginBottom: "0"}
    const errorMessage = error && <p style={errorMessageStyles}>Please, enter item title</p>
    const errorInputClasses = error ? "inputError" : undefined
    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskToTodoListHandler}
                className={errorInputClasses}
            />
            <button onClick={onClickAddItemToTodoListHandler}>+</button>
            {errorMessage}
        </div>
    );
};


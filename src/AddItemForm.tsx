import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {Button, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
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
            <TextField
                size={"small"}
                variant="outlined"
                label="Enter title"
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskToTodoListHandler}
                helperText={error && 'Please,enter title!'}
                error={error}/>

            <Button
                    onClick={onClickAddItemToTodoListHandler}
                    variant={"outlined"}
                    size={"small"}
                    color={'success'}
                    endIcon={<AddIcon/>}>
                ADD
            </Button>
        </div>
    );
};


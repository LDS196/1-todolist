import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    classes: string
    changeTitle:(title:string)=> void
}
const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode=()=> setEditMode(true)
    const offEditMode=()=> {
        setEditMode(false);
        props.changeTitle(title)
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
const onKeyDownSetTitle=(e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            offEditMode()
        }
}
    return (
        editMode
            ?<TextField variant="standard" onKeyDown={onKeyDownSetTitle} onChange={onChangeSetLocalTitleHandler}
                        autoFocus={true} onBlur={offEditMode} value={title}/>
            // ? <input onKeyDown={onKeyDownSetTitle} onChange={onChangeSetLocalTitleHandler}
            //          autoFocus={true} onBlur={offEditMode} value={title}/>
            : <span onDoubleClick={onEditMode} className={props.classes}>{props.title}</span>
    );
};

export default EditableSpan;
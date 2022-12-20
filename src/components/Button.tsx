import React from 'react';

type PropsType = {
    name: string,
    callBack: () => void
}
const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (

            <button onClick={onClickHandler}>{props.name}</button>

    );
};

export default Button;
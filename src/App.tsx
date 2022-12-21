import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

// Hi guys! Let`s reinforce our session:

// 1. Install AXIOS -it`s a library for HTTP requests. We  use it instead method FETCH.
// https://axios-http.com/ru/docs/intro
// yarn add axios

// axios.get('https://jsonplaceholder.typicode.com/todos')
//     .then((res) => {
//         setTodos(res.data)
//     })

//2. Let`s relocate our method map, and wrap it in a new variable:
//const mapTodos=todos.map(el => {...

// return (
//     <div className="App">
//         <button onClick={onClickHandler}>CLEAN POSTS</button>
//         <ul>
//             {mapTodos}
//         </ul>
//     </div>
// );

// 3. Create new button to redisplay  our data

// 4. We are having a problem. The code is duplicated (axios.get...). Let`s create a new function and use it where we need.
//Good luck!


type PropsType =
    {
        userId: number,
        id: number,
        title: string,
        completed: boolean
    }

function App() {
    const [todos, setTodos] = useState<Array<PropsType>>([])

    // useEffect(()=>{
    //     fetch('https://jsonplaceholder.typicode.com/todos')
    //         .then(response => response.json())
    //         .then(json => setTodos(json))
    // },[])
    const getNewData = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                setTodos((res.data))
            })
    }
    // axios.get('https://jsonplaceholder.typicode.com/todos')
    //     .then((res)=>{
    //         setTodos((res.data))
    //     })

    useEffect(() => {
        getNewData()
    }, [])
    const onClickHandler = () => {
        setTodos([])
    }

    const mapTodos = todos.map(el => {

        return (
            <li>
                <span>{el.id} - </span>
                <span>{el.title}</span>
                <span>{el.completed}</span>
            </li>
        )
    })

    const onRedisplayHandler = () => {
        getNewData()
    }
    return (
        <div className="App">
            <button onClick={onRedisplayHandler}>Redisplay</button>
            <button onClick={onClickHandler}>CLEAN POSTS</button>
            <ul>

                {mapTodos}

            </ul>


        </div>
    );
}

export default App;


//----------------------------------------------------------------------------------------

// import React, {useEffect, useState} from 'react';
// import './App.css';
// import axios from "axios";
//
//
// type PropsType =
//     {
//         userId: number,
//         id: number,
//         title: string,
//         completed: boolean
//     }
//
// function App() {
//     const [todos, setTodos] = useState<Array<PropsType>>([])
//
//     const axiosRequest=()=>{
//         axios.get('https://jsonplaceholder.typicode.com/todos')
//             .then((res) => {
//                 setTodos(res.data)
//             })
//     }
//
//     useEffect(() => {
//         // fetch('https://jsonplaceholder.typicode.com/todos')
//         //     .then(response => response.json())
//         //     .then(json => setTodos(json))
//
//         // axios.get('https://jsonplaceholder.typicode.com/todos')
//         //     .then((res) => {
//         //         setTodos(res.data)
//         //     })
//
//         axiosRequest()
//     }, [])
//
//     const mapTodos=todos.map(el=>{
//         return (
//             <li>
//                 <span>{el.id} - </span>
//                 <span>{el.title}</span>
//                 <span>{el.completed}</span>
//             </li>
//         )
//     })
//
//     const onClickHandler = () => {
//         setTodos([])
//     }
//
//     const onClickHandlerForRedisplay=()=>{
//         // axios.get('https://jsonplaceholder.typicode.com/todos')
//         //     .then((res) => {
//         //         setTodos(res.data)
//         //     })
//
//         axiosRequest()
//     }
//
//     return (
//         <div className="App">
//             <button onClick={onClickHandler}>CLEAN POSTS</button>
//             <button onClick={onClickHandlerForRedisplay}>REDISPLAY</button>
//             <ul>
//                 {/*{todos.map(el => {*/}
//                 {/*    return (*/}
//                 {/*        <li>*/}
//                 {/*            <span>{el.id} - </span>*/}
//                 {/*            <span>{el.title}</span>*/}
//                 {/*            <span>{el.completed}</span>*/}
//                 {/*        </li>*/}
//                 {/*    )*/}
//                 {/*})}*/}
//
//                 {mapTodos}
//             </ul>
//         </div>
//     );
// }
//
// export default App;

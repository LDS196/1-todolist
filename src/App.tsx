import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

// Hi guys!
// 1. Let's try an alternative way. Instead of useState we can try useRef in Todolist.tsx:
// <input
//     //value={title}
//     // onChange={ onChangeHandler }
//     ref={onChangeRef}
//     onKeyPress={onKeyPressHandler}
// />
//
// Inside of  const addTask = () => {} use onChangeRef.current.value
// 2. Let's try children and F.C:
// We will use double 'tag' <Todolist></Todolist>
// <Todolist title="What to learn"
//           tasks={tasksForTodolist}
//           removeTask={removeTask}
//           changeFilter={changeFilter}
//           addTask={addTask} >
//     <div>
//         <div>Many intresting information</div>
//      </div>
// </Todolist>
//Inside of Todolist.tsx
// Type out changes in PropsType: children?:React.ReactNode
// export const Todolist:React.FC<PropsType>=({children, ...props}) =>{
//     return(
//         <div>
//             <div>...</div>
//             {children}
//         </div>
//      )
// }
// 3. Let's append some animation in our project:
//yarn add  @formkit/auto-animate -D
// we use -D, because the best practice is to add new extensions to the object inside the package.json
// "devDependencies": {
//     "@formkit/auto-animate": "^1.0.0-beta.3"
//   }
// const [listRef] = useAutoAnimate<HTMLUListElement>() in Todolist.tsx
// <ul ref={listRef}>
//Look how smoothly the tasks are added!
//P.S. Do you understand why a new task append in all Todolists?
// [because we only have one state for all our todolists, but we'll talk about that on Tuesday.]


export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}>
                <div>
                    <div>Many intresting information</div>
                </div>
            </Todolist>
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}>
                <div>
                    <div>Many intresting information</div>
                </div>
            </Todolist>
        </div>
    );
}

export default App;


//-------------------------------------------------------------------------------------------------------
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]);
//
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     function addTask(title: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         let newTasks = [task, ...tasks];
//         setTasks(newTasks);
//     }
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = tasks;
//
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <input placeholder={'A lot of boring information'}/>
//                     <div>
//                         <button>Boring Button 1</button>
//                         <button>Boring Button 2</button>
//                         <button>Boring Button 3</button>
//                     </div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}/>
//         </div>
//     );
// }
//
// export default App;
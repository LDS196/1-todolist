import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
export type filterType = 'All' | 'Active' | 'Completed';
function App() {

    // let tasks = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])


    const [filteredTasks,setFilteredTasks]= useState('All')

    let tasksFilter = (filterValue: string) => {
        setFilteredTasks((filterValue))
    }
    let durschlag = tasks

    if (filteredTasks === 'Completed') {
        durschlag = tasks.filter((el) => el.isDone)
    }
    if (filteredTasks === 'Active') {
        durschlag = tasks.filter((el) => !el.isDone)
    }

    const removeTasks = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={durschlag}
                      removeTasks={removeTasks}
                      tasksFilter={tasksFilter}
            />

        </div>
    );
}

export default App;

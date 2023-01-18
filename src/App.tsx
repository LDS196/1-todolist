import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    const todolist_1: string = v1()
    const todolist_2: string = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId];
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks={...tasks}
        // copyTasks[todolistId]= updatedTasks
        // setTasks(copyTasks)
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})

    }
    // useEffect(() => {
    //     console.log(tasks)
    // }, [])
    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
    }

    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const todolist = todolists.map(tl => {

        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return <Grid item>
        <Paper elevation={3}
                      sx={{p: '10px'}}>
        <TodoList key={tl.id}
                         todolistId={tl.id}
                         filter={tl.filter}
                         title={tl.title}
                         tasks={filteredTasksForRender}
                         removeTodolist={removeTodolist}
                         addTask={addTask}
                         removeTask={removeTask}
                         changeTaskStatus={changeTaskStatus}
                         changeTodoListFilter={changeTodoListFilter}
                         changeTaskTitle={changeTaskTitle}
                         changeTodolistTitle={changeTodolistTitle}
        />
        </Paper>
        </Grid>
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                sx={{p: '10px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist}
                </Grid>


            </Container>
        </div>
    );
}

export default App;

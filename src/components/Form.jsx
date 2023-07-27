import { useEffect, useState } from 'react';

export function Form ({ newTask }){

    const [task, setTask] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!task) return alert("Task is empty")
        newTask(task)
        setTask("")
    }

    const handleInputChange = (e) => {
        setTask(e.target.value)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="Task">Task</label>
            <textarea placeholder="Add task..." onChange={ handleInputChange } value={ task } maxLength={140}></textarea>
            <button type="submit" >SAVE</button>
        </form>
    )
}
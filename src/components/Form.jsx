import { useEffect, useState } from 'react';
import DB from '../utils/storage';

export function Form ({ newTask }){

    const [task, setTask] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        newTask(task)
        setTask("")
    }

    const handleInputChange = (e) => {
        setTask(e.target.value)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="Task">Task</label>
            <textarea placeholder="Add task..." onChange={ handleInputChange } value={ task }></textarea>
            <button type="submit" >SAVE</button>
        </form>
    )
}
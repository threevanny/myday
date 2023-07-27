import { useState } from 'react';

export function Form (){

    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(task)
    }

    const getTextFromInput = (e) => {
        setTask(e.target.value)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="Task">Task</label>
            <textarea placeholder="Add task..." onChange={ getTextFromInput }></textarea>
            <button type="submit" >SAVE</button>
        </form>
    )
}
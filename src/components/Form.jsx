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
            <textarea 
                placeholder="Add task..." onChange={ handleInputChange } value={ task } maxLength={140}
                className='bg-yellow-50 w-full h-40 p-2 rounded-md border-2 border-grey-400 mb-4 focus:outline-none'
            ></textarea>
            <button type="submit" className='h-10 w-full px-6 font-semibold rounded-md bg-green-500 text-white hover:bg-green-600' >SAVE</button>
            <div className='text-gray-300 mt-4 text-center'>
                <a href="https://github.com/threevanny/myday" target='_blank'><small className='hover:text-green-500'>GitHub</small></a>
            </div>
        </form>
    )
}
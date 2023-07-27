import { useState, useEffect } from 'react';
import {Form } from './components/Form'
import { Card } from './components/Card'
import { Navbar } from './components/Navbar'
import { generateId } from './utils/uuid'
import DB from './utils/storage'

function App() {

  const [list, setList] = useState(() =>{
    return  DB.read() ?? [] // {id: "5cDhUH" title: "Execute order 66", status: false, date: "7/27/2023, 10:50:52 AM"}
  }) 
  const [date, setDate] = useState('')
  

  function newTask(text) {
    let uuid = generateId()
    if(list.find((item) => item.id === uuid))
      uuid = generateId()
   
    setList([...list, { id: uuid, title: text, status: false, date: new Date().getTime() }])
  }

  useEffect(() => {
    DB.write(list)
  }, [ list ])


  function toggleStatus(t) {
    const updatedList = list.map(item => {
      if (item.id === t.id) {
        item.status = !item.status
      }
      return item
    })
    setList(updatedList)
  }

  function deleteTask(t) {
    const updatedList = list.filter(item => item.id !== t.id)
    setList(updatedList)
  }

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'}))
  }, [])

  return (
    <>
      <header className="bg-white p-5">
          <Navbar date={date} />
      </header>

      <div className="bg-white w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <aside className="md:w-1/3 lg:w-1/4 p-4">
              <Form newTask={newTask} />
          </aside>
          <main className="md:w-2/3 lg:w-3/4 p-4">
            {
              list.map((item) => (
                <Card key={item.id} item={item} toggleStatus={toggleStatus} deleteTask={deleteTask} />
              ))
            }
          </main>
      </div>

      {/* <footer className="bg-slate-800 mt-auto">
          <h1 className="text-2xl md:text-4xl text-white">Footer</h1>
      </footer> */}
    </>
  )
}

export default App

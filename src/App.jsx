import { useState, useEffect } from 'react';
import {Form } from './components/Form'
import { Card } from './components/Card'
import { Navbar } from './components/Navbar'
import { generateId } from './utils/uuid'
import DB from './utils/storage'

function App() {

  const [list, setList] = useState(() => {
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
      <header className="bg-gray-50 p-5 shadow-md">
          <Navbar date={date} />
      </header>

      <div className="py-5 px-80">
          <section className="mb-5">
            <Form newTask={newTask} />
          </section>
          <main className="">
            <div className="">
              {
                list.map((item) => ( <Card key={item.id} item={item} toggleStatus={toggleStatus} deleteTask={deleteTask} /> ))
              }
            </div>
          </main>
      </div>
    </>
  )
}

export default App

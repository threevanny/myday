import { useState, useEffect } from 'react';
import {Form } from './components/Form'
import { Card } from './components/Card'
import { generateId } from './utils/uuid'
import DB from './utils/storage'

function App() {

  const [list, setList] = useState(() =>{
    return  DB.read() ?? [] // {id: "5cDhUH" title: "Execute order 66", status: false, date: "7/27/2023, 10:50:52 AM"}
  }) 

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

  return (
    <>
      <Form newTask={newTask} />
      {
        list.map((item) => (
          <Card key={item.id} item={item} toggleStatus={toggleStatus} />
        ))
      }
    </>
  )
}

export default App

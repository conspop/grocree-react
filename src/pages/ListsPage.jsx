import React, { useState, useEffect } from 'react'
import ListsTable from '../components/ListsTable'
import ListsAdd from '../components/ListsAdd'
import Message from '../components/Message'
import axios from 'axios'
import tokenService from '../utils/tokenService'
import './ListsPage.css'


export default function ListsPage() {

  const [lists, setLists] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getLists = async () => {
      await axios.get('/api/lists', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => setLists(response.data))
    }
    getLists()
  },[])

  const addList = (list) => {
    // check if already in staples
    if (lists) {
      const isInLists = lists.filter(listsItem => listsItem.name === list).length > 0
      if (isInLists) {
        setMessage(`${list} is already in lists.`)
        return
      }
    }
    // update state
    const oldLists = [...lists]
    const newLists = [...lists, {name: list}]
    setLists(newLists)
    // post to db
    axios.post('/api/lists', {
      token: tokenService.getToken(),
      newListName: list,
    })
    .then(() => {console.log('Added list')})
    .catch(error => {
      console.log(error.message)
      setLists(oldLists)
    })
  }

  const deleteList = async (index) => {
    // update state
    const oldLists = [...lists]
    const newLists = [...lists]
    newLists.splice(index, 1)
    setLists(newLists)

    // delete from db
    axios.delete('/api/lists', {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(() => {console.log('Deleted list')})
    .catch(error => {
      console.log(error)
      setLists(oldLists)
    })
  }

  const updateListName = (index, newName) => {
    const oldLists = [...lists]
    const newLists = [...lists]
    newLists[index].item = {name: newName}
    setLists(newLists)

    axios.put('api/lists', {
      token: tokenService.getToken(),
      index,
      newName
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setLists(oldLists)
    })
  }

  const closeMessage = () => {
    setMessage('')
  }

  return (
    <>
      <div className='lists-container'>
        <h2>Lists</h2>
        <ListsTable 
          lists={lists} 
          deleteList={deleteList} 
          updateListName={updateListName} 
        />
        {message ? <Message message={message} closeMessage={closeMessage} /> : false}
        <ListsAdd addList={addList} />
      </div>
    </>
  )
}




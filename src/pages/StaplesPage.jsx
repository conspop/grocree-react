import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './StaplesPage.css'
import tokenService from '../utils/tokenService'
import StaplesTable from '../components/StaplesTable'
import StaplesAdd from '../components/StaplesAdd'
import Message from '../components/Message'

export default function StaplesPage() {

  const [staples, setStaples] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('/api/staples', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(response => {setStaples(response.data)})
    .catch(error => {console.log(error.message)})
  },[])

  const addStaple = (item, minimum) => {
    // check if already in staples
    const isInStaples = staples.filter(staplesItem => staplesItem.item === item).length > 0
    if (isInStaples) {
      setMessage(`${item} is already in staples.`)
      return
    }

    // update state
    const oldStaples = [...staples]
    const newStaples = [...staples, {item: {name: item}, minimum}]
    setStaples(newStaples)

    // post to db
    axios.post('/api/staples', {
      token: tokenService.getToken(),
      newStapleItem: item,
      newStapleMinimum: minimum
    })
    .then(() => {console.log('Added item')})
    .catch(error => {
      console.log(error.message)
      setStaples(oldStaples)
    })
  }

  const deleteStaple = async (index) => {
    // update state
    const oldStaples = [...staples]
    const newStaples = [...staples]
    newStaples.splice(index, 1)
    setStaples(newStaples)

    // delete from db
    axios.delete('/api/staples', {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(() => {console.log('Deleted item')})
    .catch(error => {
      console.log(error)
      setStaples(oldStaples)
    })
  }

  const updateStapleName = (index, newName) => {
    const oldStaples = [...staples]
    const newStaples = [...staples]
    newStaples[index].item = {name: newName}
    setStaples(newStaples)

    axios.put('api/staples', {
      token: tokenService.getToken(),
      index,
      newName
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setStaples(oldStaples)
    })
  }

  const updateStapleMinimum = (index, newMinimum) => {
    const oldStaples = [...staples]
    const newStaples = [...staples]
    newStaples[index].minimum = newMinimum
    setStaples(newStaples)

    axios.put('api/staples', {
      token: tokenService.getToken(),
      index,
      newMinimum
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setStaples(oldStaples)
    })
  }

  const closeMessage = () => {
    setMessage('')
  }

  return (
    <div className='staples-container'>
      <StaplesTable 
        staples={staples} 
        deleteStaple={deleteStaple} 
        updateStapleName={updateStapleName} 
        updateStapleMinimum={updateStapleMinimum}
      />
      {message ? <Message message={message} closeMessage={closeMessage} /> : false}
      <StaplesAdd addStaple={addStaple} />
    </div>
  )
}
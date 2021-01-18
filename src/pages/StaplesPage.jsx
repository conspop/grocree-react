import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './StaplesPage.css'
import tokenService from '../utils/tokenService'
import StaplesTable from '../components/StaplesTable'
import AddStaple from '../components/AddStaple'

export default function StaplesPage() {

  const [staples, setStaples] = useState([{item:'', minimum:''}])

  useEffect(() => {
    const getStaples = async () => {
      await axios.get('/api/staples', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => setStaples(response.data))
    }
    getStaples()
  },[])

  const addStaple = (item, minimum) => {
    // update state
    const oldStaples = [...staples]
    const newStaples = [...staples, {item, minimum}]
    setStaples(newStaples)

    // post to db
    axios.post('/api/staples', {
      token: tokenService.getToken(),
      item,
      minimum
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setStaples(oldStaples)
    })
  }

  const deleteStaple = async (index) => {
    const oldStaples = [...staples]
    const newStaples = [...staples]
    newStaples.splice(index, 1)
    setStaples(newStaples)
    axios.delete('/api/staples', {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setStaples(oldStaples)
    })
  }

  return (
    <>
      <StaplesTable staples={staples} deleteStaple={deleteStaple}/>
      <AddStaple addStaple={addStaple} />
    </>
  )
}
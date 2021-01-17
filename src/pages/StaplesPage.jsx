import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './StaplesPage.css'
import tokenService from '../utils/tokenService'
import StaplesTable from '../components/StaplesTable'

export default function StaplesPage() {

  const [staples, setStaples] = useState([{item:'', minimum:''}])

  useEffect(async () => {
    const initialStaples = await axios.get('/api/staples', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    }).then(response => response.data)
    setStaples(initialStaples)
  },[])

  return (
    <>
      <StaplesTable staples={staples}/>
    </>
  )
}
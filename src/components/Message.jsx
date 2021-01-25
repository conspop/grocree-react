import React, { useEffect } from 'react'

export default function Message({message, closeMessage}) {

  useEffect(() => {
    setTimeout(closeMessage, 3000)
  })

  return (
    <div className='staples-message'>
      <p>{message}</p>
    </div>
  )
}
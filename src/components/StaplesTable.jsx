import React from 'react'

export default function StaplesTable({staples, deleteStaple}) {
  return (
    <>
      <div className='staples-table'>
        <div>Item</div>
        <div>Minimum</div>
        <div></div>
        {staples.map(({item, minimum}, index) => {
          return (
            <Staple 
              index={index}
              item={item} 
              minimum={minimum} 
              deleteStaple={deleteStaple}
            />
          )
        })}
      </div>
    </>
  )
}

function Staple({index, item, minimum, deleteStaple}) {
  const handleDelete = () => {
    deleteStaple(index)
  }
  
  return (
    <>
      <div>{item}</div>
      <div>{minimum}</div>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}
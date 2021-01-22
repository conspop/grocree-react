import React from 'react'

export default function StaplesTable({staples, deleteStaple}) {
  return (
    <>
      <div className='staples-table'>
        <div className='staples-table-title'>Item</div>
        <div className='staples-table-title'>Minimum</div>
        <div className='staples-table-title'></div>
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
      <div className='staples-table-item'>{item}</div>
      <div className='staples-table-item'>{minimum}</div>
      <div className='staples-table-item'>
        <button className='delete-button' onClick={handleDelete}><i class="fas fa-minus-circle"></i></button>
      </div>
    </>
  )
}
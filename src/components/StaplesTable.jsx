import React from 'react'

export default function StaplesTable({staples}) {
  return (
    <>
      <div className='staples-table'>
        <div>Item</div>
        <div>Minimum</div>
        {staples.map(({item, minimum}) => <StaplesList item={item} minimum={minimum} />)}
      </div>
    </>
  )
}

function StaplesList({item, minimum}) {
  return (
    <>
      <div>{item}</div>
      <div>{minimum}</div>
    </>
  )
}
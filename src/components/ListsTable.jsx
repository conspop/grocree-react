import React, { useState } from 'react'
import { useRouteMatch, Link} from 'react-router-dom'


export default function ListsTable({lists, deleteList, updateListName}) {

  return (
    <>
      {lists.length > 0 ?
      <div className='lists-table'>
        <div className='lists-table-title'>
          <div>List</div>
          <div></div>
        </div>
        
        {lists.map(({name}, index) => {
          return (
            <List 
              index={index}
              name={name} 
              deleteList={deleteList}
              updateListName={updateListName}
              key={name}
            />
          )
        })}        
      </div>
      :
      <p>You have no lists.</p>}
    </>
  )
}

function List({index, name, deleteList, updateListName}) {
  const [nameInput, setNameInput] = useState(name)
  
  const handleDelete = () => {
    deleteList(index)
  }

  const handleChangeName = (event) => {
    setNameInput(event.target.value)
    updateListName(index, event.target.value)
  }
  
  return (
    <div className='lists-table-item'>
      <ListField 
        field={nameInput} 
        handleChange={handleChangeName} 
      />
      <ListLink list={name} />
      <button className='delete-button' onClick={handleDelete}><i className="fas fa-minus-circle"></i></button>
    </div>
  )
}

function ListField({field, handleChange}) {
  return (
    <input 
      value={field}
      onChange={handleChange}
    />
  )
}


function ListLink({list}) {
  const listPath = list.toLowerCase().replace(' ','-')
  const {path, url} = useRouteMatch();

  return (
    <Link
      to={`${url}/${listPath}`}
      key={listPath}
    ><i class="fas fa-chevron-circle-right"></i>
    </Link>
  )
}
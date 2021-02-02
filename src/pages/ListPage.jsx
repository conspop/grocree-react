import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ListTable from '../components/ListTable'
import ListAdd from '../components/ListAdd'
import axios from 'axios'
import tokenService from '../utils/tokenService'
import './ListPage.css'

export default function ListPage() { 

  const listNameFromUrl = useParams()
  console.log(listNameFromUrl.listName)

  const [listName, setListName] = useState('')
  const [listItems, setListItems] = useState('')

  useEffect(() => {
    const getList = async () => {
      await axios.get(`/api/lists/${listNameFromUrl.listName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => {
        console.log(response.data)
        setListName(response.data.name)
        setListItems(response.data.items)
      })
    }
    getList()
  },[])

  const addListItem = (newItem, newAmount) => {
    
    // update state
    const oldListItems = [...listItems]
    const newListItems = [...listItems, {item: {name:newItem}, amount: newAmount}]
    
    setListItems(newListItems)

    // post to db
    axios.post(`/api/lists/${listNameFromUrl.listName}`, {
      token: tokenService.getToken(),
      newItem,
      newAmount
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setListItems(oldListItems)
    })
  }

  const deleteListItem = async (index) => {
    const oldListItems = [...listItems]
    const newListItems = [...listItems]
    newListItems.splice(index, 1)
    setListItems(newListItems)
    axios.delete(`/api/lists/${listNameFromUrl.listName}`, {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setListItems(oldListItems)
    })
  }

  const updateListItemName = (index, newName) => {
    const oldListItems = [...listItems]
    const newListItems = [...listItems]
    newListItems[index].item = {name: newName}
    setListItems(newListItems)

    axios.put(`/api/lists/${listNameFromUrl.listName}`, {
      token: tokenService.getToken(),
      index,
      newName
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setListItems(oldListItems)
    })
  }

  const updateListItemAmount = (index, newAmount) => {
    const oldListItems = [...listItems]
    const newListItems = [...listItems]
    newListItems[index].amount = newAmount
    setListItems(newListItems)

    axios.put(`/api/lists/${listNameFromUrl.listName}`, {
      token: tokenService.getToken(),
      index,
      newAmount
    })
    .then(() => {console.log('Changed amount!')})
    .catch(error => {
      console.log(error.message)
      setListItems(oldListItems)
    })
  }
  

  return (
    <div className='list-container'>
      <h2>{listName}</h2>
      {listItems.length > 0 ?
        <>
          <ListTable 
            listName={listName} 
            listItems={listItems} 
            deleteListItem={deleteListItem}
            updateListItemName={updateListItemName}
            updateListItemAmount={updateListItemAmount}
          />
        </>
      :
        <p>This list has no items. Add some!</p>
      }
      <ListAdd addListItem={addListItem} />
    </div> 
  )
}
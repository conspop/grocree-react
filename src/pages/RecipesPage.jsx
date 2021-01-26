import React, { useState, useEffect } from 'react'
import { useRouteMatch, Route, Switch, Link } from 'react-router-dom'
import RecipesTable from '../components/RecipesTable'
import RecipesAdd from '../components/RecipesAdd'
import Message from '../components/Message'
import axios from 'axios'
import tokenService from '../utils/tokenService'
import './RecipesPage.css'


export default function RecipesPage() {

  const [recipes, setRecipes] = useState([{name:'', items:[{item:'', amount:''}]}])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getRecipes = async () => {
      await axios.get('/api/recipes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => setRecipes(response.data))
    }
    getRecipes()
  },[])

  const addRecipe = (recipe) => {

    // check if already in staples
    if (recipes) {
      const isInRecipes = recipes.filter(recipesItem => recipesItem.name === recipe).length > 0
      if (isInRecipes) {
        setMessage(`${recipe} is already in recipes.`)
        return
      }
    }

    // update state
    const oldRecipes = [...recipes]
    const newStaples = [...recipes, {name: recipe}]
    setRecipes(newStaples)

    // post to db
    axios.post('/api/recipes', {
      token: tokenService.getToken(),
      newRecipeName: recipe,
    })
    .then(() => {console.log('Added item')})
    .catch(error => {
      console.log(error.message)
      setRecipes(oldRecipes)
    })
  }

  const deleteRecipe = async (index) => {
    // update state
    const oldRecipes = [...recipes]
    const newRecipes = [...recipes]
    newRecipes.splice(index, 1)
    setRecipes(newRecipes)

    // delete from db
    axios.delete('/api/recipes', {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(() => {console.log('Deleted recipe')})
    .catch(error => {
      console.log(error)
      setRecipes(oldRecipes)
    })
  }

  const updateRecipeName = (index, newName) => {
    const oldRecipes = [...recipes]
    const newRecipes = [...recipes]
    newRecipes[index].item = {name: newName}
    setRecipes(newRecipes)

    axios.put('api/recipes', {
      token: tokenService.getToken(),
      index,
      newName
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setRecipes(oldRecipes)
    })
  }

  const closeMessage = () => {
    setMessage('')
  }

  return (
    <>
      <div className='recipes-container'>
      <RecipesTable 
        recipes={recipes} 
        deleteRecipe={deleteRecipe} 
        updateRecipeName={updateRecipeName} 
      />
      {message ? <Message message={message} closeMessage={closeMessage} /> : false}
      <RecipesAdd addRecipe={addRecipe} />
    </div>
    </>
  )
}




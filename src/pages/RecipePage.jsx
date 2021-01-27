import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import RecipeTable from '../components/RecipeTable'
import RecipeAdd from '../components/RecipeAdd'
import axios from 'axios'
import tokenService from '../utils/tokenService'
import './RecipePage.css'

export default function RecipePage() { 

  const recipeNameFromUrl = useParams()
  console.log(recipeNameFromUrl.recipeName)

  const [recipeName, setRecipeName] = useState('')
  const [recipeItems, setRecipeItems] = useState('')

  useEffect(() => {
    const getRecipe = async () => {
      await axios.get(`/api/recipes/${recipeNameFromUrl.recipeName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => {
        console.log(response.data)
        setRecipeName(response.data.name)
        setRecipeItems(response.data.items)
      })
    }
    getRecipe()
  },[])

  const addRecipeItem = (newItem, newAmount) => {
    
    // update state
    const oldRecipeItems = [...recipeItems]
    const newRecipeItems = [...recipeItems, {item: {name:newItem}, amount: newAmount}]
    
    setRecipeItems(newRecipeItems)

    // post to db
    axios.post(`/api/recipes/${recipeNameFromUrl.recipeName}`, {
      token: tokenService.getToken(),
      newItem,
      newAmount
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setRecipeItems(oldRecipeItems)
    })
  }

  const deleteRecipeItem = async (index) => {
    const oldRecipeItems = [...recipeItems]
    const newRecipeItems = [...recipeItems]
    newRecipeItems.splice(index, 1)
    setRecipeItems(newRecipeItems)
    axios.delete(`/api/recipes/${recipeNameFromUrl.recipeName}`, {
      data: {
        token: tokenService.getToken(),
        index
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      setRecipeItems(oldRecipeItems)
    })
  }

  const updateRecipeItemName = (index, newName) => {
    const oldRecipeItems = [...recipeItems]
    const newrecipeItems = [...recipeItems]
    newrecipeItems[index].item = {name: newName}
    setRecipeItems(newrecipeItems)

    axios.put(`/api/recipes/${recipeNameFromUrl.recipeName}`, {
      token: tokenService.getToken(),
      index,
      newName
    })
    .then(() => {console.log('Changed name!')})
    .catch(error => {
      console.log(error.message)
      setRecipeItems(oldRecipeItems)
    })
  }
  

  return (
    <div className='recipe-container'>
      <h2>{recipeName}</h2>
      {recipeItems.length > 0 ?
        <>
          <RecipeTable 
            recipeName={recipeName} 
            recipeItems={recipeItems} 
            deleteRecipeItem={deleteRecipeItem}
            updateRecipeItemName={updateRecipeItemName}
          />
        </>
      :
        <p>This recipe has no items. Add some!</p>
      }
      <RecipeAdd addRecipeItem={addRecipeItem} />
    </div> 
  )
}
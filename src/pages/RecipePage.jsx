// import React, { useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'

// import axios from 'axios'
// import tokenService from '../utils/tokenService'
// import './RecipePage.css'

// // import RecipeTable from '../components/RecipeTable'

// export default function RecipePage() { 
//   const {recipeName} = useParams()

//   const [recipe, setRecipe] = useState({name:'', items:[{item:'', amount:''}]})

//   useEffect(() => {
//     const getRecipes = async () => {
//       await axios.get(`/api/recipes/${recipeName}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + tokenService.getToken()
//         }
//       }).then(response => setRecipe(response.data))
//     }
//     getRecipes()
//   },[])

//   const addRecipeItem = (item, amount) => {
//     // update state
//     const oldRecipe = [...recipe]
//     const newRecipe = [...recipe, {item, amount}]
//     setRecipe(newRecipe)

//     // post to db
//     axios.post('/api/recipes/:recipeName', {
//       token: tokenService.getToken(),
//       item,
//       amount
//     })
//     .then(response => response.data)
//     .catch(error => {
//       console.log(error)
//       setRecipe(oldRecipe)
//     })
//   }

//   const deleteRecipeItem = async (index) => {
//     const oldRecipe = [...recipe]
//     const newRecipe = [...recipe]
//     newRecipe.splice(index, 1)
//     setRecipe(newRecipe)
//     axios.delete('/api/recipes/:recipeName', {
//       data: {
//         token: tokenService.getToken(),
//         index
//       }
//     })
//     .then(response => response.data)
//     .catch(error => {
//       console.log(error)
//       setRecipe(oldRecipe)
//     })
//   }
  

//   return (
//     <>
//       <RecipeTable recipe={recipe} deleteRecipeItem={deleteRecipeItem} />
//     </>
//   )
// }
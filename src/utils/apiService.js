import axios from 'axios'

import tokenService from './tokenService'

const functions = {
  getIngredients
};

export default functions

async function getIngredients() {
  return await axios.get('/api/ingredients', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => {
    console.log(res.data)
    return res.data
  })
  .catch(err => console.log(err.message))
}


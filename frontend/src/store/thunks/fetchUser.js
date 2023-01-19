import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUser = createAsyncThunk('user/fetch', async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(
    'http://192.168.1.49:3000/api/users/me',
    config
  )
  return response.data
})

export { fetchUser }

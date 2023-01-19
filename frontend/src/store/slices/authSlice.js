import { createSlice } from '@reduxjs/toolkit'

//Get User from localstorage

const token = localStorage.getItem('token')

const initialState = {
  token: token ? token : null,
  user: null,
  loading: true,
  error: null,
  success: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.user = null
      state.loading = false
      state.error = null
      state.success = false
    },
    setUser: (state, action) => {
      const { token, ...rest } = action.payload
      localStorage.setItem('token', token)
      state.user = { ...rest }
      state.token = token
      state.loading = false
    }
  }
})

export const { setUser, logout } = authSlice.actions

export const authReducer = authSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { fetchUser } from '../thunks/fetchUser'

//Get User from localstorage

//const user = JSON.parse(localStorage.getItem('user'))

/* const initialState = {
  user: user ? user : null
} */

const initialState = {
  user: null,
  isLoading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      state.user = null
      state.isLoading = false
    },
    setUser: (state, action) => {
      const { isAdmin, ...rest } = action.payload
      localStorage.setItem('user', JSON.stringify(rest))
      state.user = action.payload
      state.isLoading = false
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  }
})

export const { setUser, logout } = authSlice.actions

export const authReducer = authSlice.reducer

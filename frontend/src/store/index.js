import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { usersApi } from './apis/usersApi'
import { authReducer, setUser, logout } from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware)
  }
})

setupListeners(store.dispatch)

//export RTK Query Hooks
export {
  useFetchUsersQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useGetLoggedInUserQuery,
  useValidateResetTokenMutation,
  useResetPasswordMutation,
  useRequestResetTokenMutation
} from './apis/usersApi'

//export authSlice actions
export { setUser, logout }

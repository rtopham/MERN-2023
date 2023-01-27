import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl:
      (process.env.REACT_APP_BASE_URL || 'http://192.168.1.49:3000') + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints(builder) {
    return {
      registerUser: builder.mutation({
        invalidatesTags: ['Users'],
        query: (user) => {
          return {
            url: '/users',
            method: 'POST',
            body: {
              name: user.name,
              email: user.email,
              password: user.password
            }
          }
        }
      }),
      loginUser: builder.mutation({
        invalidatesTags: ['Userlogin'],
        query: (credentials) => {
          return {
            url: '/users/login',
            method: 'POST',
            body: {
              email: credentials.email,
              password: credentials.password
            }
          }
        }
      }),
      requestResetToken: builder.mutation({
        query: (email) => {
          return {
            url: '/users/password-reset-request',
            method: 'PUT',
            body: { email }
          }
        }
      }),
      validateResetToken: builder.mutation({
        query: (token) => {
          return {
            url: '/users/validate-reset-token',
            method: 'PUT',
            body: { token }
          }
        }
      }),
      resetPassword: builder.mutation({
        query: (tokenAndPassword) => {
          return {
            url: '/users/reset-password',
            method: 'PUT',
            body: tokenAndPassword
          }
        }
      }),
      updateProfile: builder.mutation({
        query: (user) => {
          return {
            url: '/users',
            method: 'PUT',
            body: user
          }
        }
      }),
      deleteUser: builder.mutation({
        invalidatesTags: ['Users'],
        query: (user) => {
          return {
            url: `/users/${user._id}`,
            method: 'DELETE'
          }
        }
      }),
      getLoggedInUser: builder.query({
        query: () => {
          return {
            url: '/users/me',
            method: 'GET'
          }
        }
      }),
      fetchUsers: builder.query({
        providesTags: ['Users'],
        query: () => {
          return {
            url: '/users',
            method: 'GET'
          }
        }
      })
    }
  }
})

export const {
  useFetchUsersQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useGetLoggedInUserQuery,
  useValidateResetTokenMutation,
  useResetPasswordMutation,
  useRequestResetTokenMutation
} = usersApi
export { usersApi }

import { Routes, Route } from 'react-router-dom'
import NoAuthRoute from './NoAuthRoute'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import ResetPassword from '../../pages/ResetPassword'
import PasswordResetRequest from '../../pages/PasswordResetRequest'

const NoAuthRoutes = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <NoAuthRoute redirectTo='/dashboard'>
            <Login />
          </NoAuthRoute>
        }
      />
      <Route
        path='/register'
        element={
          <NoAuthRoute redirectTo='/dashboard'>
            <Register />
          </NoAuthRoute>
        }
      />
      <Route
        exact
        path='/reset-password/:token'
        element={
          <NoAuthRoute redirectTo='/dashboard'>
            <ResetPassword />
          </NoAuthRoute>
        }
      />
      <Route
        exact
        path='/password-reset-request'
        element={
          <NoAuthRoute redirectTo='/dashboard'>
            <PasswordResetRequest />
          </NoAuthRoute>
        }
      />
      <Route path='*' element={null} />
    </Routes>
  )
}

export default NoAuthRoutes

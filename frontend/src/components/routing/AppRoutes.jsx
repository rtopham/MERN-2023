import { Routes, Route } from 'react-router-dom'

import NoAuthRoute from './NoAuthRoute'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import ResetPassword from '../../pages/ResetPassword'
import PasswordResetRequest from '../../pages/PasswordResetRequest'
import Dashboard from '../../pages/Dashboard'
import Admin from '../../pages/Admin'

const AppRoutes = () => {
  return (
    <Routes>
      {/*Always available routes/*/}
      <Route path='/' element={<Home />} />

      {/*NoAuthRoutes available only if NOT logged in*/}
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

      {/*AuthRuotes available only with valid login (includes Admin Routes)*/}

      <Route
        path='/dashboard'
        element={
          <PrivateRoute redirectTo='/login'>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/admin'
        element={
          <PrivateRoute redirectTo='/login'>
            <AdminRoute redirectTo='/dashboard'>
              <Admin />
            </AdminRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
export default AppRoutes

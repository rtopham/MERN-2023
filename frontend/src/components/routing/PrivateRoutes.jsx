import { Routes, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import Dashboard from '../../pages/Dashboard'
import Admin from '../../pages/Admin'

const PrivateRoutes = () => {
  return (
    <Routes>
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

      <Route path='*' element={null} />
    </Routes>
  )
}

export default PrivateRoutes

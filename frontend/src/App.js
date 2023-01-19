//React
import { useEffect } from 'react'
//React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Style Components
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import ResetPassword from './pages/ResetPassword'
import PasswordResetRequest from './pages/PasswordResetRequest'
//Routing
import PrivateRoute from './components/routing/PrivateRoute'
import AdminRoute from './components/routing/AdminRoute'
//Redux
import { logout, useGetLoggedInUserQuery, setUser } from './store'
import { useDispatch, useSelector } from 'react-redux'
//css
import './App.css'
import NoAuthRoute from './components/routing/NoAuthRoute'

function App() {
  const { token } = useSelector((state) => {
    return state.auth
  })

  const dispatch = useDispatch()

  const result = useGetLoggedInUserQuery(null, {
    pollingInterval: 900000
  })

  const { isError, data } = result

  useEffect(() => {
    if (data) {
      dispatch(setUser({ token, ...data }))
    }
  }, [data, token, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(logout())
    }
  }, [isError, dispatch])

  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
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
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App

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
import Spinner from './components/shared/Spinner'
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
import { logout } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './store/thunks/fetchUser'
//css
import './App.css'

function App() {
  const dispatch = useDispatch()

  const storedUser = JSON.parse(localStorage.getItem('user'))

  const { isLoading } = useSelector((state) => {
    return state.auth
  })

  useEffect(() => {
    if (storedUser?.token) {
      dispatch(fetchUser(storedUser.token))
    } else dispatch(logout())
  }, [])

  if (storedUser && isLoading) return <Spinner message='Loading User Data' />

  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              exact
              path='/reset-password/:token'
              element={<ResetPassword />}
            />
            <Route
              exact
              path='/password-reset-request'
              element={<PasswordResetRequest />}
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

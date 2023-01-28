//React
import { useEffect } from 'react'
//React Router
import { BrowserRouter as Router } from 'react-router-dom'
//Style Components
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
//Routing
import AppRoutes from './components/routing/AppRoutes'
//Redux
import { logout, useGetLoggedInUserQuery, setUser } from './store'
import { useDispatch, useSelector } from 'react-redux'
//Helmet
import { HelmetProvider } from 'react-helmet-async'
//css
import './App.css'

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
    if (data && !isError) {
      dispatch(setUser({ token, ...data }))
    }
  }, [data, token, isError, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(logout())
    }
  }, [isError, dispatch])

  return (
    <>
      <HelmetProvider>
        <Router>
          <Header />
          <Container>
            <AppRoutes />
          </Container>
          <Footer />
        </Router>
      </HelmetProvider>
      <ToastContainer />
    </>
  )
}

export default App

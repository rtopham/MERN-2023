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
//Routing
import NoAuthRoutes from './components/routing/NoAuthRoutes'
import PrivateRoutes from './components/routing/PrivateRoutes'
//Redux
import { logout, useGetLoggedInUserQuery, setUser } from './store'
import { useDispatch, useSelector } from 'react-redux'
//css
import './App.css'

function App() {
  const { token } = useSelector((state) => {
    return state.auth
  })

  const dispatch = useDispatch()

  const result = useGetLoggedInUserQuery(null, {
    pollingInterval: 15000
  })

  const { isError, data } = result

  useEffect(() => {
    if (data && !isError) {
      console.log(result)
      dispatch(setUser({ token, ...data }))
    }
  }, [data, token, dispatch])

  useEffect(() => {
    if (isError) {
      console.log('Got Error')
      dispatch(logout())
    }
  }, [isError, dispatch])

  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            {/*Always available routes/*/}
            <Route path='/' element={<Home />} />
            <Route path='*' element={null} />
          </Routes>
          {/*NoAuthRoutes available only if not logged in*/}
          <NoAuthRoutes />
          {/*AuthRuotes available only with valid login (includes Admin Routes)*/}
          <PrivateRoutes />
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App

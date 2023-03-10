import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, redirectTo }) => {
  const { loading, user } = useSelector((state) => {
    return state.auth
  })
  if (loading) return null
  if (user) return children

  return <Navigate to={redirectTo} />
}

export default PrivateRoute

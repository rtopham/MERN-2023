import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, redirectTo }) => {
  const { isLoading, user } = useSelector((state) => {
    return state.auth
  })
  if (isLoading) return null
  if (user) return children

  return <Navigate to={redirectTo} />
}

export default PrivateRoute

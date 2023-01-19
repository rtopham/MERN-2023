import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NoAuthRoute = ({ redirectTo }) => {
  const { loading, user } = useSelector((state) => {
    return state.auth
  })
  if (loading) return null
  if (user) return <Navigate to={redirectTo} />
  return null
}

export default NoAuthRoute

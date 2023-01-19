import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children, redirectTo }) => {
  const { user, loading } = useSelector((state) => state.auth)

  if (loading)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )

  return user.isAdmin ? children : <Navigate to={redirectTo} />
}

export default AdminRoute

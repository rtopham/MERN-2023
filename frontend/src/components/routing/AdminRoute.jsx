import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useGetLoggedInUserQuery, setUser } from '../../store'

const AdminRoute = ({ children, redirectTo }) => {
  const { user, isLoading } = useSelector((state) => state.auth)

  if (isLoading)
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

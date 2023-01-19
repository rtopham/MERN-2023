//Redux
import { useFetchUsersQuery } from '../../store'
//Components
import DataTable from '../../tables/DataTable'
import Spinner from '../shared/Spinner'
//Utils
import { usNormal } from '../../utils/dateFormats'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

const UserList = () => {
  const response = useFetchUsersQuery()

  const { data, error, isError, isLoading } = response

  if (isError)
    return <div className='mt-5'>Error...{extractErrorMessage(error)}</div>

  const config = [
    { label: 'User', render: (user) => user.name },
    {
      label: 'Email',
      render: (user) => <a href={`mailto:${user.email}`}>{user.email}</a>
    },
    { label: 'Role', render: (user) => (user.isAdmin ? 'Admin' : 'User') },
    { label: 'Joined', render: (user) => usNormal(user.createdAt) }
  ]

  const keyFn = (user) => {
    return user._id
  }

  if (isLoading) return <Spinner message='Loading Admin Data' />

  return <DataTable striped data={data} config={config} keyFn={keyFn} />
}
export default UserList

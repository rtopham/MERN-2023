//Redux
import { useFetchUsersQuery } from '../../store'
//Components
import SortableTable from '../../tables/SortableTable'
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
    {
      label: 'User',
      render: (user) => user.name,
      sortValue: (user) => user.name
    },
    {
      label: 'Email',
      render: (user) => <a href={`mailto:${user.email}`}>{user.email}</a>
    },
    { label: 'Role', render: (user) => (user.isAdmin ? 'Admin' : 'User') },
    {
      label: 'Joined',
      render: (user) => usNormal(user.createdAt),
      sortValue: (user) => user.createdAt
    }
  ]

  const keyFn = (user) => {
    return user._id
  }

  if (isLoading) return <Spinner message='Loading Admin Data' />

  return <SortableTable striped data={data} config={config} keyFn={keyFn} />
}
export default UserList

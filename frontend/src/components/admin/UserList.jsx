//Redux
import { useFetchUsersQuery } from '../../store'
//Components
import SortableTable from '../../tables/SortableTable'
import Spinner from '../shared/Spinner'
import NextPrevious from '../../pagination/NextPrevious'
//Utils
import { usNormal } from '../../utils/dateFormats'
import { extractErrorMessage } from '../../utils/extractErrorMessage'
//Hooks
import useNextPrevious from '../../pagination/useNextPrevious'
import { IconButton } from '../../icons'

const UserList = () => {
  const response = useFetchUsersQuery()
  const { data, error, isError, isLoading } = response

  const nextPrevious = useNextPrevious(3, data)

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

  const { start, stop } = nextPrevious

  const npConfig = [
    {
      label: 'first',
      render: () =>
        nextPrevious.showPrevious && (
          <IconButton
            className='text-primary me-3'
            icon='fa-regular fa-backward-fast'
            onClick={nextPrevious.handleFirst}
          />
        )
    },
    {
      label: 'previous',
      render: () =>
        nextPrevious.showPrevious && (
          <IconButton
            className='text-primary me-3'
            icon='fa-regular fa-backward-step'
            onClick={nextPrevious.handlePrevious}
          />
        )
    },
    {
      label: 'next',
      render: () =>
        nextPrevious.showNext && (
          <IconButton
            className='text-primary me-3'
            icon='fa-regular fa-forward-step'
            onClick={nextPrevious.handleNext}
          />
        )
    },
    {
      label: 'last',
      render: () =>
        nextPrevious.showNext && (
          <IconButton
            className='text-primary me-3'
            icon='fa-regular fa-forward-fast'
            onClick={nextPrevious.handleLast}
          />
        )
    }
  ]

  return (
    <>
      <p>
        Users {start} - {stop} of {data.length}
      </p>
      <SortableTable
        striped
        size='sm'
        nextPrevious={nextPrevious}
        data={data}
        config={config}
        keyFn={keyFn}
      />
      <NextPrevious
        {...nextPrevious}
        variant='outline-primary'
        size='sm'
        divClass='d-flex justify-content-end'
        first
        last
        //bootstrap
        //config={npConfig}
      />
    </>
  )
}
export default UserList

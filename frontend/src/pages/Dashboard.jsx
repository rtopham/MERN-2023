//React Router
import { useNavigate } from 'react-router-dom'

//Style Components
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'

//Shared Components
import { USER_ICON, LOCK_ICON, TRASH_ICON } from '../icons/Icon'
import Spinner from '../components/shared/Spinner'
import DeleteRecordComponent from '../components/shared/DeleteRecordComponent'

//Forms
import { useForm, profileFields, editPasswordFields } from '../forms'

//Redux
import {
  useUpdateProfileMutation,
  useDeleteUserMutation,
  setUser,
  logout
} from '../store'
import { useSelector, useDispatch } from 'react-redux'

//Utils
import { extractErrorMessage } from '../utils/extractErrorMessage'
import { checkPasswordMatch } from '../forms/form-utils/formValidation'
import EditRecordComponent from '../components/shared/EditRecordComponent'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { name, email } = user
  const editProfileForm = useForm(profileFields, { name, email })
  const editPasswordForm = useForm(editPasswordFields, {
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [deleteAccount, { isLoading: deletingAccount }] =
    useDeleteUserMutation()

  const editProfileFunction = () => {
    updateProfile(editProfileForm.values)
      .unwrap()
      .then((upDatedProfile) => {
        dispatch(
          setUser({
            ...user,
            name: upDatedProfile.name,
            email: upDatedProfile.email
          })
        )
        toast.success(`Updated User Profile for ${upDatedProfile.name}`)
      })
      .catch((error) => toast.error(extractErrorMessage(error)))
  }

  const editPasswordFunction = () => {
    const { password } = editPasswordForm.values
    updateProfile({ name, email, password })
      .unwrap()
      .then(() => {
        toast.success(`Password updated!`)
        editPasswordForm.reset()
      })
      .catch((error) => toast.error(extractErrorMessage(error)))
  }

  const handleDelete = () => {
    deleteAccount(user)
      .unwrap()
      .then(() => {
        dispatch(logout())
        navigate('/')

        toast.success(`Account deleted`)
      })
      .catch((error) => toast.error(extractErrorMessage(error)))
  }

  if (!user || isLoading || deletingAccount) return <Spinner />

  return (
    <Container style={{ width: '500px' }}>
      <div className='d-grid gap-2 mb-3'>
        <EditRecordComponent
          as='button'
          icon={USER_ICON}
          tip='Edit Profile'
          config={{ variant: 'outline-dark' }}
          modalConfig={{
            form: editProfileForm.form,
            title: 'Edit Profile',
            editFunction: editProfileFunction,
            cancelFunction: editProfileForm.reset,
            disabled:
              !editProfileForm.validateForm(editProfileForm.form) ||
              !editProfileForm.changesMade(
                { name: user.name, email: user.email },
                editProfileForm.values
              )
          }}
        >
          {' '}
          Edit Profile
        </EditRecordComponent>
      </div>

      <div className='d-grid gap-2 mb-3'>
        <EditRecordComponent
          as='button'
          icon={LOCK_ICON}
          config={{ variant: 'outline-dark' }}
          modalConfig={{
            form: editPasswordForm.form,
            title: 'Edit Password',
            editFunction: editPasswordFunction,
            cancelFunction: editPasswordForm.reset,
            disabled:
              !editPasswordForm.validateForm(editPasswordForm.form) ||
              !editPasswordForm.changesMade(
                { name: user.name, email: user.email },
                editPasswordForm.values
              ) ||
              !checkPasswordMatch(
                editPasswordForm.values.password,
                editPasswordForm.values.confirmPassword
              )
          }}
        >
          {' '}
          Edit Password
        </EditRecordComponent>
      </div>

      <div className='d-grid gap-2 mb-3'>
        <DeleteRecordComponent
          as='button'
          icon={TRASH_ICON}
          tip='Delete Account'
          config={{ variant: 'outline-dark' }}
          modalConfig={{
            titleIcon: TRASH_ICON,
            title: 'Delete Account?',
            confirmationText: 'delete account',
            body: <>This action cannot be undone.</>,
            confirmationFunction: handleDelete
          }}
        >
          {' '}
          Delete Account
        </DeleteRecordComponent>
      </div>
    </Container>
  )
}

export default Dashboard

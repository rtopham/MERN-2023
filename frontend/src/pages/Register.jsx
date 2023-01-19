//React
import { useEffect } from 'react'
//React Router
import { Link, useNavigate } from 'react-router-dom'
//Redux
import { useRegisterUserMutation, setUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
//Forms
import { useForm, useGenerateForm, registerFields } from '../forms'
//Components
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { Icon, USER_ICON } from '../icons'
import Spinner from '../components/shared/Spinner'
//Utils
import { extractErrorMessage } from '../utils/extractErrorMessage'
import { checkPasswordMatch } from '../forms/form-utils/formValidation'

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerForm = useForm(registerFields, initialState)
  const RegisterForm = useGenerateForm()

  const { form, values, validateForm } = registerForm

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault()

    registerUser(values)
      .unwrap()
      .then((user) => {
        dispatch(setUser(user))
        toast.success(`Registration successful. Logged in as ${user.name}`)
        navigate('/dashboard')
      })
      .catch((error) => toast.error(extractErrorMessage(error)))
  }
  if (isLoading) return <Spinner />

  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={USER_ICON} /> Register
          </h1>
          <p>Please register to use all features</p>
        </section>

        <section>
          <RegisterForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Register'
            buttonVariant='outline-dark'
            disabled={
              !validateForm(form) ||
              !checkPasswordMatch(values.password, values.confirmPassword)
            }
            errorChecks={[
              {
                name: 'confirmPassword',
                error:
                  validateForm(form) &&
                  !checkPasswordMatch(values.password, values.confirmPassword)
              }
            ]}
          />
        </section>
        <p></p>
        <p className='text-center'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </Container>
    </>
  )
}

export default Register

//React
import { useEffect } from 'react'
//React Router
import { Link, useNavigate } from 'react-router-dom'
//Redux
import { useLoginUserMutation, setUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
//Forms
import { useForm, useGenerateForm, loginFields } from '../forms'
//Components
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { Icon, SIGN_IN_ICON } from '../icons'
import Spinner from '../components/shared/Spinner'
//Utils
import { extractErrorMessage } from '../utils/extractErrorMessage'

const Login = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, { isLoading }] = useLoginUserMutation()

  const initialState = { email: '', password: '' }

  const loginForm = useForm(loginFields, initialState)
  const LoginForm = useGenerateForm()

  const { form, values, validateForm } = loginForm

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = values
    loginUser(userData)
      .unwrap()
      .then((user) => {
        dispatch(setUser(user))
        toast.success(`Logged in as ${user.name}`)
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
            <Icon icon={SIGN_IN_ICON} /> Login
          </h1>
          <p>Please log in to access your account</p>
        </section>

        <section>
          <LoginForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Log in'
            buttonVariant='outline-dark'
            disabled={!validateForm(form)}
          />
        </section>
        <p></p>
        <p className='text-center'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
        <p className='text-center'>
          <Link to='/password-reset-request'>Forgot password?</Link>
        </p>
      </Container>
    </>
  )
}

export default Login

//React Router
import { Link, useNavigate } from 'react-router-dom'
//Redux
import { useLoginUserMutation, setUser } from '../store'
import { useDispatch } from 'react-redux'
//Forms
import { useForm, useGenerateForm, loginFields } from '../forms'
//Components
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { Icon, SIGN_IN_ICON } from '../icons'
import Spinner from '../components/shared/Spinner'
//Utils
import { extractErrorMessage } from '../utils/extractErrorMessage'
//SEO
import SEO from '../components/shared/SEO'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, { isLoading }] = useLoginUserMutation()

  const initialState = { email: '', password: '' }

  const loginForm = useForm(loginFields, initialState)
  const LoginForm = useGenerateForm()

  const { form, values, validateForm } = loginForm

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
      <SEO
        title='Mern 2023 | Login Page'
        description='Login page for Mern 2023 application.'
        type='webapp'
        name='Singletrack Ventures'
      />
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

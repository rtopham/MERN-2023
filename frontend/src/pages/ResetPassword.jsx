//React
import { useEffect } from 'react'
//React Router
import { Link, useNavigate, useParams } from 'react-router-dom'
//Redux
import {
  useValidateResetTokenMutation,
  useResetPasswordMutation
} from '../store'
//Style Components
import { Container } from 'react-bootstrap'
import { Icon, LOCK_ICON } from '../icons'
import { toast } from 'react-toastify'
import Spinner from '../components/shared/Spinner'
//Forms
import { useForm, useGenerateForm, editPasswordFields } from '../forms'
//Utils
import { checkPasswordMatch } from '../forms/form-utils/formValidation'

const ResetPassword = () => {
  const { token } = useParams()

  const [validateResetToken, result] = useValidateResetTokenMutation()
  const [resetPassword, resetResult] = useResetPasswordMutation()

  const { isLoading, error } = result
  const { isSuccess, error: resetError } = resetResult

  const navigate = useNavigate()

  const newPasswordForm = useForm(editPasswordFields, {
    password: '',
    confirmPassword: ''
  })
  const NewPasswordForm = useGenerateForm()
  const { form, values, validateForm } = newPasswordForm

  useEffect(() => {
    validateResetToken(token)
  }, [token, validateResetToken])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password Reset')
      navigate('/login')
    }
  }, [isSuccess, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    const { password } = values
    resetPassword({ token, password })
  }
  if (isLoading) return <Spinner message='Validating Reset Token' />
  if (error || resetError) {
    return (
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <span>
              <i className='fas fa-user' /> Reset Password
            </span>
          </h1>
        </section>
        <p></p>
        <p>The reset token is not valid.</p>
        <p>
          <Link to='/password-reset-request'>
            Request a new password reset email?
          </Link>
        </p>
      </Container>
    )
  }
  return (
    <div>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={LOCK_ICON} /> Reset Password
          </h1>
          <p>Please reset your password</p>
        </section>

        <section>
          <NewPasswordForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Reset Password'
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
      </Container>
    </div>
  )
}
export default ResetPassword

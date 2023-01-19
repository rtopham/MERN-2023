import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useForm, useGenerateForm, resetRequestFields } from '../forms'
import { Icon, USER_ICON } from '../icons'
import { toast } from 'react-toastify'

import { useRequestResetTokenMutation } from '../store'
const PasswordResetRequest = () => {
  const [requestResetToken, { isSuccess, error, isError }] =
    useRequestResetTokenMutation()

  const requestForm = useForm(resetRequestFields, {
    email: ''
  })
  const RequestForm = useGenerateForm()
  const { form, values, validateForm } = requestForm

  const onSubmit = (e) => {
    const { email } = values
    e.preventDefault()
    requestResetToken(email)
    requestForm.reset()
  }

  useEffect(() => {
    if (isSuccess) toast.success('Email Sent')
    if (isError) toast.error(error)
  }, [isSuccess, isError, error])

  return (
    <div>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={USER_ICON} /> Reset Password
          </h1>
          <p>
            Enter the email address associated with your account to receive a
            password reset email.
          </p>
        </section>

        <section>
          <RequestForm
            form={form}
            onSubmit={onSubmit}
            buttonText='Send Email'
            buttonVariant='outline-dark'
            disabled={!validateForm(form)}
          />
        </section>
        <p className='mt-3 text-center'>
          <Link to='/login'>Cancel</Link>
        </p>
      </Container>
    </div>
  )
}
export default PasswordResetRequest

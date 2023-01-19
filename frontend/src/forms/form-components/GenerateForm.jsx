import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DefaultInput from './DefaultInput'
import Select from '../form-components/Select'
import Radio from './Radio'
import Switch from './Switch'
import CheckBox from './CheckBox'

const GenerateForm = ({
  form,
  onSubmit,
  buttonSize,
  buttonText,
  buttonVariant,
  disabled,
  inputSize,
  errorChecks
}) => {
  return (
    <>
      <Form onSubmit={onSubmit}>
        {form.map((input, index) => {
          switch (input.type) {
            case 'select':
              return <Select key={index} {...input} size={inputSize || 'sm'} />
            case 'radio':
              return <Radio key={index} {...input} size={inputSize || 'sm'} />
            case 'switch':
              return <Switch key={index} {...input} size={inputSize || 'sm'} />
            case 'checkbox':
              return (
                <CheckBox key={index} {...input} size={inputSize || 'sm'} />
              )
            case 'formtext':
              return (
                <div key={index} className='mb-3'>
                  <Form.Text as={input.as}>{input.text}</Form.Text>
                </div>
              )

            default:
              return (
                <DefaultInput
                  key={index}
                  {...input}
                  size={inputSize || 'sm'}
                  errorChecks={errorChecks}
                />
              )
          }
        })}
        {onSubmit && (
          <div className='d-grid gap-2'>
            <Button
              type='submit'
              variant={buttonVariant || 'outline-dark'}
              disabled={disabled}
              size={buttonSize || 'sm'}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}

export default GenerateForm

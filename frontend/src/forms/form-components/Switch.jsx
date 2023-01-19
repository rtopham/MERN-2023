import { Form } from 'react-bootstrap'

const Switch = (props) => {
  const { heading } = props

  return (
    <>
      <Form.Group className='mb-3'>
        {heading && <Form.Label>{heading}</Form.Label>}

        <Form.Check {...props} />
      </Form.Group>
    </>
  )
}

export default Switch

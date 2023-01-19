import { Form, Row, Col } from 'react-bootstrap'

const DefaultInput = (props) => {
  const {
    inline,
    label,
    inputSize,
    helpmessage,
    validateForm,
    errorChecks,
    errorMessage,
    ...rest
  } = props

  const check = errorChecks?.find((check) => check.name === props.name)

  return inline ? (
    <>
      <Row className='align-items-center'>
        {label && (
          <Col xs='auto'>
            <Form.Label>{label}</Form.Label>
          </Col>
        )}
        <Col>
          <Form.Group className={helpmessage ? 'mb-1' : 'mb-3'}>
            <Form.Control {...props} size={inputSize || 'sm'} />
            {check?.error && errorMessage}
          </Form.Group>
        </Col>
      </Row>

      {helpmessage && (
        <Row className='mb-3'>
          <Form.Text muted>{helpmessage}</Form.Text>
        </Row>
      )}
    </>
  ) : (
    <>
      <Form.Group className='mb-3'>
        {label && (
          <Form.Label>
            {label} {check?.error && errorMessage}{' '}
          </Form.Label>
        )}
        <Form.Control {...rest} size={inputSize || 'sm'} />
        {helpmessage && <Form.Text muted>{helpmessage}</Form.Text>}
      </Form.Group>
    </>
  )
}

export default DefaultInput

import { Form, Row, Col } from 'react-bootstrap'

const Select = (props) => {
  const { options, inline, label } = props

  const SelectInput = () => (
    <Form.Select className='mb-3' {...props}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </Form.Select>
  )

  return inline ? (
    <>
      <Row className='align-items-center'>
        {label && (
          <Col xs='auto'>{label && <Form.Label>{label}</Form.Label>}</Col>
        )}
        <Col>
          <SelectInput />
        </Col>
      </Row>
    </>
  ) : (
    <>
      <Form.Group className='mb-3'>
        {label && <Form.Label>{label}</Form.Label>}

        <SelectInput />
      </Form.Group>
    </>
  )
}

export default Select

import { Form } from 'react-bootstrap'

const Radio = (props) => {
  const { label, inline, options, value } = props

  return (
    <Form.Group className='mb-3'>
      {label && (
        <Form.Label className={inline ? 'me-3' : ''}>{label}</Form.Label>
      )}

      {options.map((option) => {
        return (
          <Form.Check
            key={option}
            {...props}
            label={option}
            value={option}
            checked={value === option}
          />
        )
      })}
    </Form.Group>
  )
}

export default Radio

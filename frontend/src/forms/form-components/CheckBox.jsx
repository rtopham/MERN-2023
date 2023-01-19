import React from 'react'
import { Form } from 'react-bootstrap'

const CheckBox = (props) => {
  const { value } = props
  return (
    <>
      <Form.Group className='mb-3'>
        <Form.Check {...props} checked={value === true} />
      </Form.Group>
    </>
  )
}

export default CheckBox

import { useState } from 'react'

import { getValidationStatus } from '../form-utils/formValidationStatus'

import { validateForm, changesMade } from '../form-utils/formValidation'

const useForm = (inputArray, initialState) => {
  const [formData, setFormData] = useState(initialState)

  const onChange = (e) => {
    switch (e.target.type) {
      case 'checkbox':
      case 'switch':
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.checked
        }))
        break
      case 'blockpicker':
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.hex
        }))
        break
      default:
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }
  }

  const reset = () => {
    setFormData(initialState)
  }

  const form = inputArray.map((input) => {
    return {
      ...input,
      value: formData[input.name],
      isValid: getValidationStatus(input, formData[input.name]).isValid,
      isInvalid: getValidationStatus(input, formData[input.name]).isInvalid,
      onChange: onChange
    }
  })

  return { form, values: formData, reset, validateForm, changesMade }
}

export default useForm

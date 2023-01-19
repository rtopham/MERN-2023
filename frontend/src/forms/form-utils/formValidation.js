const validateInputLength = (input, min) => {
  if (!input) return null
  const length = input.length
  if (length >= min) return 'success'
  else if (length > 0) return 'error'
  return null
}

const validateInputMinMax = (input, min, max) => {
  const length = input.length
  if (length > min && length <= max) return 'success'
  else if (length > 0) return 'error'
  return null
}

const validateBirthDate = (date) => {
  if (date.length > 10) date = date.substring(0, 10)
  const regex =
    /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  if (regex.test(date)) return 'success'
  else if (date.length > 0) return 'error'
}

const validateTime = (time) => {
  const regex = /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
  if (regex.test(time)) return 'success'
  else if (time.length > 0) return 'error'
}

const validateEmail = (email) => {
  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  if (regex.test(email)) return 'success'
  else if (email.length === 0) return null
  else if (email.length > 0) return 'error'
}

const validateWebsite = (website) => {
  const regex =
    /^(http:\/\/www.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
  if (regex.test(website)) return 'success'
  else if (website.length === 0) return null
  else if (website.length > 0) return 'error'
}

const validatePhone = (phone) => {
  if (phone.length === 0) return null
  //fitkit studio 2 follows
  /*   const regex =
    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm
  if (regex.test(phone)) return 'success' */
  const regex =
    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm
  const regex2 = /^[0-9]{10,12}$/
  if (regex.test(phone) || regex2.test(phone)) return 'success'
  else if (phone.length > 0) return 'error'
}

const validateZipCode = (zipCode) => {
  const regex =
    /(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)/g
  const regex2 = /^[A-Z0-9]{4,8}$/
  if (regex.test(zipCode) || regex2.test(zipCode)) return 'success'
  else if (zipCode.length === 0) return null
  else if (zipCode.length > 0) return 'error'
}

//Note: the password regex requires at least 8 characters, at least 1 uppercase letter, at least one lower case number and at least one number. Special characters are allowed
const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (regex.test(password)) return 'success'
  else if (password.length > 0) return 'error'
}

const validateConfirmPassword = (password, confirmPassword) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (regex.test(confirmPassword) && confirmPassword === password)
    return 'success'
  else if (confirmPassword.length > 0) return 'error'
}

const validateHeight = (height) => {
  if (height >= 48 && height <= 220) return 'success'
  else if (height.length === 0) return null
  else return 'error'
}

const validateWeight = (weight) => {
  if (weight >= 25 && weight <= 300) return 'success'
  else if (weight.length === 0) return null
  else return 'error'
}

export const validateMeasurement = (measurement, min, max) => {
  if (measurement === null) return null
  if (measurement < min || measurement > max) return 'error'

  const regex = /^[0-9]*\.?[0-9]+$/

  if (regex.test(measurement)) return 'success'
  else return 'error'
}

export const validateMeasurementWithNegativeValues = (
  measurement,
  min,
  max
) => {
  if (measurement < min || measurement > max) return 'error'
  const regex = /^[-+]?[0-9]*\.?[0-9]+$/

  if (regex.test(measurement)) return 'success'
  else return 'error'
}

const validateDate = (date) => {
  const regex =
    /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  if (regex.test(date)) return 'success'
  else if (date.length > 0) return 'error'
}

const validateRank = (rank) => {
  const regex = /^[0-9]{1,4}$/
  if (regex.test(rank)) return 'success'
  else if (rank.length > 0) return 'error'
}

const validateConfirmationText = (formText, confirmationText) => {
  if (formText === confirmationText) return 'success'
  else if (formText.length === 0) return null
  else return 'error'
}

const validateForm = (form) => {
  const inputArray = Object.entries(form)
  let valid = true

  inputArray.forEach(([key, input], index) => {
    if (input.isValid === false) valid = false
  })
  return valid
}

const checkPasswordMatch = (password, confirmPassword) => {
  const passwordsMatch = password === confirmPassword
  return passwordsMatch
}

const changesMade = (oldValues, newValues) => {
  return JSON.stringify(oldValues) !== JSON.stringify(newValues)
}

export {
  validateInputLength,
  validateInputMinMax,
  validateBirthDate,
  validateTime,
  validateEmail,
  validatePhone,
  validateWebsite,
  validateZipCode,
  validatePassword,
  validateConfirmPassword,
  validateHeight,
  validateWeight,
  validateDate,
  validateRank,
  validateConfirmationText,
  validateForm,
  checkPasswordMatch,
  changesMade
}

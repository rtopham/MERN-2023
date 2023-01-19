import { Spinner as BSSpinner } from 'react-bootstrap'

const Spinner = ({ message, variant }) => {
  return (
    <>
      <BSSpinner
        animation='border'
        variant={variant || 'dark'}
        className='d-block mx-auto'
      />

      <p className='mt-3 text-center'>{message}</p>
    </>
  )
}

export default Spinner

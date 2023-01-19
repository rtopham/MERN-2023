import { Modal, Form, Button } from 'react-bootstrap'
import { Icon } from '../../icons/Icon'

const ConfirmCancelModal = ({
  showModal,
  title,
  titleIcon,
  clickConfirm,
  clickCancel,
  confirmationButtonIcon,
  confirmationButtonText,
  confirmationButtonVariant,
  cancelButtonIcon,
  cancelButtonText,
  cancelButtonVariant,
  confirmationText,
  confirmationPrompt,
  form,
  validateForm,
  body
}) => {
  return (
    <Modal centered show={showModal}>
      <Modal.Header>
        <Modal.Title>
          {titleIcon && <Icon icon={titleIcon} />} {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {' '}
        {body}
        <Form onSubmit={clickConfirm} className='mt-3'>
          <Form.Group controlId='formText'>
            <Form.Label>
              {confirmationPrompt} type{' '}
              <i>
                <b>{confirmationText}</b>
              </i>{' '}
              below.
            </Form.Label>
            <Form.Control
              {...form[0]}
              autoFocus
              placeholder={confirmationText}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant={confirmationButtonVariant}
          disabled={!validateForm(form)}
          onClick={clickConfirm}
        >
          <Icon icon={confirmationButtonIcon} /> {confirmationButtonText}
        </Button>{' '}
        <Button variant={cancelButtonVariant} onClick={clickCancel}>
          <Icon icon={cancelButtonIcon} /> {cancelButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmCancelModal

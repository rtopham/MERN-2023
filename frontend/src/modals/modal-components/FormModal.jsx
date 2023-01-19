import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Icon } from '../../icons/Icon'
import { useGenerateForm } from '../../forms'

const FormModal = ({
  showModal,
  title,
  titleIcon,
  clickConfirm,
  clickCancel,
  confirmationButtonIcon,
  confirmationButtonText,
  cancelButtonIcon,
  cancelButtonText,
  disabled,
  confirmationButtonVariant,
  cancelButtonVariant,
  form,
  body
}) => {
  const FormComponent = useGenerateForm()
  return (
    <Modal centered show={showModal}>
      <Modal.Header>
        <Modal.Title>
          {titleIcon && <Icon icon={titleIcon} />} {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {body && <div className='mb-3'>{body}</div>}
        <FormComponent form={form} uselabels />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant={confirmationButtonVariant}
          onClick={clickConfirm}
          disabled={disabled}
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

export default FormModal

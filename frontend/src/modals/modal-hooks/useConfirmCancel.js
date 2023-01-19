import { useState } from 'react'

import { TRASH_ICON, WARNING_ICON, CANCEL_ICON } from '../../icons/icons'

import { useForm } from '../../forms'

const useConfirmCancel = (props) => {
  const modalConfig = {
    titleIcon: WARNING_ICON,
    title: 'Permanently Delete?',
    confirmationPrompt: 'To confirm deletion',
    confirmationText: 'delete',
    confirmationButtonIcon: TRASH_ICON,
    confirmationButtonText: 'Delete',
    confirmationButtonVariant: 'danger',
    cancelButtonIcon: CANCEL_ICON,
    cancelButtonText: 'Cancel',
    cancelButtonVariant: 'dark',
    ...props.modalConfig
  }

  const { confirmationText, confirmationFunction, cancelFunction } = modalConfig

  const [showModal, setShowModal] = useState(false)

  const modalForm = useForm(
    [
      {
        name: 'confirmationText',
        type: 'text',
        validationtype: 'confirmationText',
        confirmationvalue: confirmationText
      }
    ],
    { confirmationText: '' }
  )

  const handleToggle = () => {
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
    modalForm.reset()
    if (cancelFunction) cancelFunction()
  }

  const handleConfirmation = (e) => {
    e.preventDefault()
    if (confirmationFunction) confirmationFunction()
    setShowModal(false)

    modalForm.reset()
  }

  return {
    ...modalConfig,
    ...modalForm,
    showModal,
    setShowModal: handleToggle,
    clickConfirm: handleConfirmation,
    clickCancel: handleCancel
  }
}

export default useConfirmCancel

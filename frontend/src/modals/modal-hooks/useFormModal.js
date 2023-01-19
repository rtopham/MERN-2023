import { useState } from 'react'
import { EDIT_ICON, SAVE_ICON, CANCEL_ICON } from '../../icons/icons'

const useFormModal = (props) => {
  const modalConfig = {
    titleIcon: EDIT_ICON,
    title: 'Edit Record',
    confirmationButtonIcon: SAVE_ICON,
    confirmationButtonText: 'Save',
    confirmationButtonVariant: 'danger',
    cancelButtonIcon: CANCEL_ICON,
    cancelButtonText: 'Cancel',
    cancelButtonVariant: 'dark',
    ...props.modalConfig
  }
  /*   const {
    icon,
    tip,
    titleIcon,
    title,
    confirmationButtonIcon,
    confirmationButtonText,
    confirmationButtonVariant,
    cancelButtonIcon,
    cancelButtonText,
    cancelButtonVariant,
    editFunction,
    cancelFunction
  } = props */

  const { editFunction, cancelFunction } = modalConfig

  const [showModal, setShowModal] = useState(false)

  const handleToggle = () => {
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)

    if (cancelFunction) cancelFunction()
  }

  const handleConfirmation = (e) => {
    e.preventDefault()
    if (editFunction) editFunction()
    setShowModal(false)
  }

  return {
    ...modalConfig,
    showModal,
    setShowModal: handleToggle,
    clickConfirm: handleConfirmation,
    clickCancel: handleCancel
  }
}

export default useFormModal

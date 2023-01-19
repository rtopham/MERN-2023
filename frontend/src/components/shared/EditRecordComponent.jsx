import Button from 'react-bootstrap/Button'

import { Icon, IconButton } from '../../icons'

import { useFormModal, FormModal } from '../../modals'

const EditRecordComponent = (props) => {
  const { as, children, className, config, icon } = props

  const editRecordModal = useFormModal(props)

  const { setShowModal } = editRecordModal

  if (as === 'button')
    return (
      <>
        <Button className={className} {...config} onClick={setShowModal}>
          {icon && <Icon icon={icon} />} {children}
        </Button>

        <FormModal {...editRecordModal} />
      </>
    )

  return (
    <>
      <IconButton {...props} onClick={setShowModal} />

      <FormModal {...editRecordModal} />
    </>
  )
}

export default EditRecordComponent

import { Icon, IconButton } from '../../icons'

import { Button } from 'react-bootstrap'

import { ConfirmCancelModal, useConfirmCancel } from '../../modals'

const DeleteRecordComponent = (props) => {
  const deleteRecordForm = useConfirmCancel(props)

  const { as, children, icon, className, config } = props

  const { setShowModal } = deleteRecordForm

  if (as === 'button')
    return (
      <>
        <Button className={className} {...config} onClick={setShowModal}>
          {icon && <Icon icon={icon} />} {children}
        </Button>
        <ConfirmCancelModal {...deleteRecordForm} />
      </>
    )

  return (
    <>
      <IconButton {...props} onClick={setShowModal} />
      <ConfirmCancelModal {...deleteRecordForm} />
    </>
  )
}

export default DeleteRecordComponent

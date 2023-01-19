import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const Tip = ({ children, message, placement }) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip> {message}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  )
}

export default Tip

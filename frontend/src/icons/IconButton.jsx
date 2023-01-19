import { Icon } from './Icon'

export const IconButton = (props) => {
  const { children, config, onClick } = props
  return (
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer'
      }}
    >
      <Icon {...props} {...config} />
      {children}
    </span>
  )
}

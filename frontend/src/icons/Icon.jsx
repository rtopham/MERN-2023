import Tip from '../components/shared/Tip'

export const Icon = ({ icon, className, tip, style }) => {
  return tip ? (
    <Tip message={tip}>
      <i className={[icon, className].join(' ')} style={style} />
    </Tip>
  ) : (
    <i className={[icon, className].join(' ')} style={style} />
  )
}

export * from './icons'

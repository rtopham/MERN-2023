import Tip from '../components/shared/Tip'

export const Icon = ({ icon, className, tip }) => {
  return tip ? (
    <Tip message={tip}>
      <i className={icon + ' ' + className} />
    </Tip>
  ) : (
    <i className={icon + ' ' + className} />
  )
}

export * from './icons'

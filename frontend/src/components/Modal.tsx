import type { ModalProps } from '../types'

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
} as const

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div>
      <div onClick={onClose} aria-hidden="true" />
      <div>
        <div>
          <div>
            <h2>{title}</h2>
            <button onClick={onClose} aria-label="Закрыть">✕</button>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
import type { ButtonProps } from '../types'

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = ''
  
  const variantClasses = { primary: '', secondary: '', danger: '', ghost: '' }
  
  const sizeClasses = { sm: '', md: '', lg: '' }
  
  const disabledClasses = ''
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      <span>
        {children}
      </span>
    </button>
  )
}

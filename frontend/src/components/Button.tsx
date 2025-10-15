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
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'
  
  const variantClasses = {
    primary: 'bg-primary text-black hover:bg-primary-hover focus:ring-primary',
    secondary: 'bg-secondary text-black hover:bg-secondary-hover focus:ring-secondary',
    danger: 'bg-danger text-white hover:bg-danger-hover focus:ring-danger',
    ghost: 'bg-transparent text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

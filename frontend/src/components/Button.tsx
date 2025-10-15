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
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 relative overflow-hidden group'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-accent text-dark-900 hover:from-primary-600 hover:to-accent-hover focus:ring-primary shadow-glow hover:shadow-glow-lg',
    secondary: 'bg-gradient-to-r from-secondary-500 to-success text-dark-900 hover:from-secondary-600 hover:to-success focus:ring-secondary shadow-glow hover:shadow-glow-lg',
    danger: 'bg-gradient-to-r from-danger to-danger-hover text-white hover:from-danger-hover hover:to-danger focus:ring-danger shadow-glow hover:shadow-glow-lg',
    ghost: 'bg-transparent text-gray-300 border border-primary-500/30 hover:bg-primary-500/10 hover:text-white hover:border-primary-500/60 focus:ring-primary-500 backdrop-blur-sm'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  )
}

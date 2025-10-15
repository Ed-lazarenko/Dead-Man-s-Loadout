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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Enhanced Backdrop */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-dark-950/80 via-dark-900/90 to-dark-800/80 backdrop-blur-md" 
        onClick={onClose}
        aria-hidden="true" 
      />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Modal */}
      <div className={`relative w-full ${sizeClasses[size]} animate-scale-in`}>
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20 rounded-3xl blur-xl"></div>
        
        {/* Main modal container */}
        <div className="relative bg-dark-800/95 backdrop-blur-xl rounded-3xl shadow-glow-xl border border-primary-500/30">
          {/* Decorative top border */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-primary-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent font-cinzel">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:text-danger group"
              aria-label="Закрыть"
            >
              <div className="relative">
                <span className="text-2xl font-bold group-hover:rotate-90 transition-transform duration-300">✕</span>
                <div className="absolute inset-0 bg-danger/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="animate-slide-up">
              {children}
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
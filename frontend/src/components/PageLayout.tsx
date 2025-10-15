import type { PageLayoutProps } from '../types'

export default function PageLayout({ children, maxWidth = 'max-w-6xl' }: PageLayoutProps) {
  return (
    <div className="h-full flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Main content container - центрируем */}
      <div className={`relative ${maxWidth}`}>
        {/* Content wrapper */}
        <div className="bg-dark-800/40 backdrop-blur-sm rounded-3xl border border-primary-500/20 shadow-glow p-4 animate-fade-in">
          {/* Decorative top border */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

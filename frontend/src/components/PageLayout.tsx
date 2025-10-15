import type { PageLayoutProps } from '../types'

export default function PageLayout({ children, maxWidth = 'max-w-4xl' }: PageLayoutProps) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className={`${maxWidth} w-full flex flex-col items-center justify-center`}>
        {children}
      </div>
    </div>
  )
}

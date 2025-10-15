import type { PageLayoutProps } from '../types'

export default function PageLayout({ children, maxWidth = 'max-w-6xl' }: PageLayoutProps) {
  return (
    <div>
      <div>
        <div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

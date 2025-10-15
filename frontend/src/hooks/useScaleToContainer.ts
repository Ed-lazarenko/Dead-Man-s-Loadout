import { useEffect, useRef, useState } from 'react'

export function useScaleToContainer(baseWidth: number, baseHeight: number) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateFromContainer = () => {
      const el = containerRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      const factor = Math.min(width / baseWidth, height / baseHeight)
      setScale(factor)
    }

    updateFromContainer()

    const ro = new ResizeObserver(() => updateFromContainer())
    if (containerRef.current) ro.observe(containerRef.current)

    window.addEventListener('resize', updateFromContainer)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateFromContainer)
    }
  }, [baseWidth, baseHeight])

  return { containerRef, scale }
}



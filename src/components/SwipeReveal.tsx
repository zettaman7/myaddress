import { useState, useRef, useCallback } from 'react'

interface Props {
  onShare: () => void
  children: React.ReactNode
}

const REVEAL_WIDTH = 72
const THRESHOLD = 40

export default function SwipeReveal({ onShare, children }: Props) {
  const [offsetX, setOffsetX] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const startRef = useRef<{ x: number; startOffset: number } | null>(null)
  const draggingRef = useRef(false)

  const onStart = useCallback((x: number) => {
    startRef.current = { x, startOffset: isOpen ? REVEAL_WIDTH : 0 }
    draggingRef.current = true
  }, [isOpen])

  const onMove = useCallback((x: number) => {
    if (!draggingRef.current || !startRef.current) return
    const delta = x - startRef.current.x + startRef.current.startOffset
    setOffsetX(Math.max(0, Math.min(REVEAL_WIDTH, delta)))
  }, [])

  const onEnd = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (offsetX > THRESHOLD) {
      setOffsetX(REVEAL_WIDTH)
      setIsOpen(true)
    } else {
      setOffsetX(0)
      setIsOpen(false)
    }
  }, [offsetX])

  const close = () => { setOffsetX(0); setIsOpen(false) }

  const handleShare = () => { close(); onShare() }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Share button (revealed on left) */}
      <div className="absolute inset-y-0 left-0 flex items-center justify-center"
           style={{ width: REVEAL_WIDTH, backgroundColor: '#2563EB' }}>
        <button onClick={handleShare}
                className="flex flex-col items-center justify-center gap-0.5 w-full h-full text-white">
          <span className="text-lg">↑</span>
          <span className="text-[10px] font-bold">공유</span>
        </button>
      </div>

      {/* Card content — slides right */}
      <div style={{ transform: `translateX(${offsetX}px)`, transition: draggingRef.current ? 'none' : 'transform 0.25s ease' }}
           onMouseDown={e => onStart(e.clientX)}
           onMouseMove={e => onMove(e.clientX)}
           onMouseUp={onEnd}
           onMouseLeave={onEnd}
           onTouchStart={e => onStart(e.touches[0].clientX)}
           onTouchMove={e => onMove(e.touches[0].clientX)}
           onTouchEnd={onEnd}>
        {/* Dim tap area to close when open */}
        {isOpen && (
          <div className="absolute inset-0 z-10" onClick={close} />
        )}
        {children}
      </div>
    </div>
  )
}

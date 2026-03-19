import { useState, useRef } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void }

const photos = [
  { url: '/images/NvcCz.jpeg', label: '내부 전경' },
  { url: '/images/y5d7Y.jpeg', label: '고사양 PC석' },
  { url: '/images/ytKap.jpeg', label: '게이밍존' },
  { url: '/images/386b7.jpeg', label: '음료 코너' },
  { url: '/images/c8w3d.jpeg', label: '소파석' },
  { url: '/images/Qnbxg.jpeg', label: 'VIP존' },
  { url: '/images/LVlv7.jpeg', label: '식사 메뉴' },
  { url: '/images/7e21F.jpeg', label: '음향장비' },
  { url: '/images/ADAIP.jpeg', label: '주차장' },
]

export default function PhotoViewer({ navigate }: Props) {
  const [current, setCurrent] = useState(0)
  const [dragX, setDragX] = useState(0)
  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false })

  const goTo = (i: number) => setCurrent(Math.max(0, Math.min(photos.length - 1, i)))

  const onStart = (x: number) => {
    dragRef.current = { startX: x, dragging: true }
    setDragX(0)
  }
  const onMove = (x: number) => {
    if (!dragRef.current.dragging) return
    setDragX(x - dragRef.current.startX)
  }
  const onEnd = () => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    if (dragX < -50) goTo(current + 1)
    else if (dragX > 50) goTo(current - 1)
    setDragX(0)
  }

  const p = photos[current]

  return (
    <div className="w-full h-full flex flex-col bg-black">
      {/* Status bar */}
      <div className="flex-shrink-0 flex items-center px-5 h-[54px] z-10">
        <button onClick={() => navigate('detail')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>←</button>
        <div className="flex-1 text-center text-[14px] font-semibold text-white">
          {current + 1} / {photos.length}
        </div>
        <div className="w-9" />
      </div>

      {/* Main photo — draggable */}
      <div className="flex-1 relative overflow-hidden"
           style={{ cursor: 'grab' }}
           onMouseDown={e => onStart(e.clientX)}
           onMouseMove={e => onMove(e.clientX)}
           onMouseUp={onEnd}
           onMouseLeave={onEnd}
           onTouchStart={e => onStart(e.touches[0].clientX)}
           onTouchMove={e => onMove(e.touches[0].clientX)}
           onTouchEnd={onEnd}>
        <img src={p.url} alt={p.label}
             className="w-full h-full object-cover select-none"
             style={{ transform: `translateX(${dragX}px)`, transition: dragX === 0 ? 'transform 0.2s' : 'none' }}
             draggable={false} />
        <span className="absolute bottom-4 left-4 text-white text-[14px] font-semibold px-3 py-1.5 rounded-xl"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>{p.label}</span>

        {current > 0 && (
          <button onClick={() => goTo(current - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>‹</button>
        )}
        {current < photos.length - 1 && (
          <button onClick={() => goTo(current + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>›</button>
        )}
      </div>

      {/* Dots */}
      <div className="flex-shrink-0 flex items-center justify-center gap-1.5 py-4">
        {photos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{ width: i === current ? 20 : 6, height: 6, backgroundColor: i === current ? '#FFFFFF' : 'rgba(255,255,255,0.35)' }} />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void }

const photos = [
  { bg: 'linear-gradient(135deg, #0f1c2e 0%, #1a2f4a 100%)', emoji: '💻', label: '내부 전경' },
  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', emoji: '🖥', label: '고사양 PC석' },
  { bg: 'linear-gradient(135deg, #0f2238 0%, #1e3a5f 100%)', emoji: '🎮', label: '게이밍존' },
  { bg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', emoji: '☕', label: '음료 코너' },
  { bg: 'linear-gradient(135deg, #14532d 0%, #166534 100%)', emoji: '🛋', label: '소파석' },
  { bg: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)', emoji: '🏆', label: 'VIP존' },
  { bg: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)', emoji: '🍜', label: '식사 메뉴' },
  { bg: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)', emoji: '🚿', label: '샤워시설' },
  { bg: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', emoji: '🎧', label: '음향장비' },
  { bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', emoji: '🅿', label: '주차장' },
]

export default function PhotoViewer({ navigate }: Props) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(photos.length - 1, c + 1))
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

      {/* Main photo */}
      <div className="flex-1 flex items-center justify-center relative" style={{ background: p.bg }}>
        <span style={{ fontSize: 80 }}>{p.emoji}</span>
        <span className="absolute bottom-4 left-4 text-white text-[14px] font-semibold px-3 py-1.5 rounded-xl"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>{p.label}</span>

        {/* Left arrow */}
        {current > 0 && (
          <button onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>‹</button>
        )}

        {/* Right arrow */}
        {current < photos.length - 1 && (
          <button onClick={next}
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

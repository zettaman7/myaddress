import { useState, useRef } from 'react'
import { Page } from '../App'
import TabBar from '../components/TabBar'
import MiniCard from '../components/MiniCard'

interface Props {
  navigate: (to: Page) => void
  setSelectedHasAlias: (v: boolean) => void
}

function NaverMap() {
  return (
    <div className="absolute inset-0" style={{ backgroundColor: '#F0EBE0' }}>
      <div className="absolute" style={{ left: 0, right: 0, top: '35%', height: 20, backgroundColor: '#E8E2D4', borderTop: '1px solid #D8D0C0', borderBottom: '1px solid #D8D0C0' }} />
      <div className="absolute" style={{ left: 0, right: 0, top: '57%', height: 12, backgroundColor: '#E8E2D4' }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: '40%', width: 18, backgroundColor: '#E8E2D4' }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: '64%', width: 10, backgroundColor: '#E8E2D4' }} />
      <div className="absolute" style={{ left: 0, right: 0, top: '18%', height: 7, backgroundColor: '#EAE4D8' }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: '20%', width: 7, backgroundColor: '#EAE4D8' }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: '78%', width: 7, backgroundColor: '#EAE4D8' }} />
      {[
        { l: '2%',  t: '2%',  w: '16%', h: '14%', c: '#E2D8C8' },
        { l: '22%', t: '2%',  w: '16%', h: '14%', c: '#D8D0BE' },
        { l: '43%', t: '2%',  w: '18%', h: '14%', c: '#DDD5C3' },
        { l: '66%', t: '2%',  w: '11%', h: '14%', c: '#E0D8C6' },
        { l: '80%', t: '2%',  w: '17%', h: '14%', c: '#D6CEC0' },
        { l: '2%',  t: '20%', w: '16%', h: '13%', c: '#DDD5C5' },
        { l: '22%', t: '20%', w: '16%', h: '13%', c: '#E4DCC8' },
        { l: '43%', t: '20%', w: '18%', h: '13%', c: '#D8D0C0' },
        { l: '66%', t: '20%', w: '11%', h: '13%', c: '#DDD5C3' },
        { l: '80%', t: '20%', w: '17%', h: '13%', c: '#D4CCC0' },
        { l: '2%',  t: '37%', w: '16%', h: '18%', c: '#B8D4A8' },
        { l: '22%', t: '37%', w: '16%', h: '18%', c: '#E0D8C6' },
        { l: '43%', t: '37%', w: '18%', h: '18%', c: '#DACED0' },
        { l: '66%', t: '37%', w: '11%', h: '18%', c: '#BCDAAC' },
        { l: '80%', t: '37%', w: '17%', h: '18%', c: '#D8D0C0' },
        { l: '2%',  t: '59%', w: '16%', h: '25%', c: '#D8D0C2' },
        { l: '22%', t: '59%', w: '16%', h: '25%', c: '#E0D8C8' },
        { l: '43%', t: '59%', w: '18%', h: '25%', c: '#DDD5C3' },
        { l: '66%', t: '59%', w: '11%', h: '25%', c: '#D4CCC0' },
        { l: '80%', t: '59%', w: '17%', h: '25%', c: '#DACED2' },
      ].map((b, i) => (
        <div key={i} className="absolute" style={{ left: b.l, top: b.t, width: b.w, height: b.h, backgroundColor: b.c, border: '1px solid #CEC6B4' }} />
      ))}
    </div>
  )
}

function LocationPin({ x, y, size = 20, opacity = 1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: x, top: y, opacity, zIndex: 5 }}>
      <div className="rounded-full" style={{ width: size, height: size, backgroundColor: '#E8563A', border: '2px solid white', boxShadow: '0 2px 6px rgba(232,86,58,0.5)' }} />
      <div style={{ width: 0, height: 0, borderLeft: `${size * 0.22}px solid transparent`, borderRight: `${size * 0.22}px solid transparent`, borderTop: `${size * 0.38}px solid #E8563A`, marginTop: -1 }} />
    </div>
  )
}

function PinLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <div className="absolute z-10 px-1.5 py-0.5 bg-white rounded shadow-sm text-[9px] font-bold text-slate-900 whitespace-nowrap"
         style={{ left: x, top: y, boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}>
      {text}
    </div>
  )
}

const cards = [
  {
    icon: '🖥',
    iconBg: '#EFF6FF',
    alias: '강동구 가성비 PC방',
    original: '하이프PC방',
    meta: '⭐ 4.4  ·  🟢 영업중  ·  📍 0.4km  ·  ₩1,000/hr',
    tags: '#24시간  #학생할인  #고사양PC',
    reason: '💡 가격 우선 검색에 최적 · 평가 4.4 · 거리 0.4km',
    badge: '학생할인 30%',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    hasAlias: true,
  },
  {
    icon: '💻',
    iconBg: '#F1F5F9',
    alias: '암사역 저렴한 PC방',
    original: '마포 PC파크',
    meta: '⭐ 4.5  ·  🟢 영업중  ·  📍 1.2km  ·  ₩1,200/hr',
    tags: '#24시간  #RTX석',
    reason: '💡 가격 2위 · 평가 4.5 · 거리 1.2km',
    badge: null,
    badgeBg: '',
    badgeColor: '',
    hasAlias: false,
  },
]

export default function SearchResults({ navigate, setSelectedHasAlias }: Props) {
  const [showMini, setShowMini] = useState(false)
  const [activeFilter, setActiveFilter] = useState(0)
  const filters = ['✓ 영업중', '저가순', '행사중', '고사양석']

  const [mapX, setMapX] = useState(0)
  const [mapY, setMapY] = useState(0)
  const [mapDragging, setMapDragging] = useState(false)
  const dragRef = useRef({ ox: 0, oy: 0, sx: 0, sy: 0 })

  const onMouseDown = (e: React.MouseEvent) => { setMapDragging(true); dragRef.current = { ox: mapX, oy: mapY, sx: e.clientX, sy: e.clientY } }
  const onMouseMove = (e: React.MouseEvent) => { if (!mapDragging) return; const { ox, oy, sx, sy } = dragRef.current; setMapX(ox + e.clientX - sx); setMapY(oy + e.clientY - sy) }
  const onMouseUp = () => setMapDragging(false)
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; setMapDragging(true); dragRef.current = { ox: mapX, oy: mapY, sx: t.clientX, sy: t.clientY } }
  const onTouchMove = (e: React.TouchEvent) => { if (!mapDragging) return; const t = e.touches[0]; const { ox, oy, sx, sy } = dragRef.current; setMapX(ox + t.clientX - sx); setMapY(oy + t.clientY - sy) }
  const onTouchEnd = () => setMapDragging(false)

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Full-screen map — draggable */}
      <div
        className="absolute inset-0 z-0"
        style={{ cursor: mapDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        {/* Moving layer: map + pins */}
        <div className="absolute inset-0" style={{ transform: `translate(${mapX}px, ${mapY}px)`, transition: mapDragging ? 'none' : 'transform 0.1s ease' }}>
          <NaverMap />
          <LocationPin x={130} y={220} size={20} />
          <PinLabel x={62} y={208} text="강동구 가성비 PC방 [91]" />
          <LocationPin x={246} y={310} size={14} opacity={0.8} />
          <PinLabel x={178} y={296} text="암사역 저렴한 PC방 [84]" />
          <LocationPin x={83}  y={380} size={12} opacity={0.5} />
          <LocationPin x={307} y={230} size={12} opacity={0.5} />
        </div>
      </div>

      {/* Nav header */}
      <div className="relative z-20 flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        {/* Status bar */}
        <div className="flex items-center px-5 h-[46px]">
          <span className="text-[15px] font-semibold text-white">9:41</span>
          <div className="flex-1" />
          <span className="text-[12px] text-white">▲ WiFi 🔋</span>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2.5 mx-5 px-4 bg-white rounded-full" style={{ height: 46 }}>
          <span style={{ color: '#2563EB', fontSize: 16 }}>🔍</span>
          <span className="flex-1 text-[12px] font-semibold text-slate-900 truncate">가격이 저렴하고 평가가 좋은 PC방</span>
          <button onClick={() => navigate('home')}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 text-xs flex-shrink-0"
                  style={{ backgroundColor: '#E2E8F0' }}>✕</button>
        </div>

        {/* Priority row */}
        <div className="flex items-center gap-1.5 mx-5 mt-2 mb-2" style={{ height: 26 }}>
          <span className="text-[11px]" style={{ color: '#94A3B8' }}>우선순위:</span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white" style={{ backgroundColor: '#2563EB' }}>가격</span>
          <span className="text-[11px]" style={{ color: '#64748B' }}>{'>'}</span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ backgroundColor: '#132B47', color: '#94A3B8', border: '1px solid #2563EB' }}>평가</span>
          <span className="text-[11px]" style={{ color: '#64748B' }}>{'>'}</span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ backgroundColor: '#132B47', color: '#94A3B8', border: '1px solid #2563EB' }}>거리</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="relative z-20 flex gap-2 px-5 py-2.5 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
        {filters.map((f, i) => (
          <button key={i} onClick={() => setActiveFilter(i)}
                  className="flex-shrink-0 px-3 h-[34px] rounded-full text-[11px] font-semibold transition-colors"
                  style={{ backgroundColor: activeFilter === i ? '#2563EB' : '#FFFFFF', color: activeFilter === i ? '#FFFFFF' : '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Count badge */}
      <div className="absolute z-10 px-3 py-1.5 rounded-full text-[12px] font-bold text-white"
           style={{ left: '50%', transform: 'translateX(-50%)', top: 415, backgroundColor: '#1E3A5F', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        PC방 47곳 발견 · 가격 우선 정렬 ▾
      </div>

      {/* Bottom result panel */}
      <div className="absolute bottom-0 inset-x-0 z-20" style={{ top: 448 }}>
        <div className="w-full h-full bg-white flex flex-col" style={{ borderRadius: '16px 16px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
          {/* Handle */}
          <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-slate-300" />
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 pb-2" style={{ scrollbarWidth: 'none' }}>
            {cards.map((c, i) => (
              <button key={i} onClick={() => {
                setSelectedHasAlias(c.hasAlias)
                i === 0 ? setShowMini(true) : navigate('detail')
              }}
                      className="w-full flex items-start gap-3 p-3 text-left rounded-xl"
                      style={{ backgroundColor: i === 0 ? '#FFFFFF' : '#F8FAFC', border: i === 0 ? '1px solid #E2E8F0' : 'none' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                     style={{ backgroundColor: c.iconBg }}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold" style={{ color: '#1E3A5F' }}>{c.alias}</span>
                    {c.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: c.badgeBg, color: c.badgeColor }}>{c.badge}</span>
                    )}
                  </div>
                  <span className="text-[11px]" style={{ color: '#64748B' }}>{c.original}</span>
                  <span className="text-[10px]" style={{ color: '#64748B' }}>{c.meta}</span>
                  <span className="text-[10px]" style={{ color: '#64748B' }}>{c.tags}</span>
                  <span className="text-[10px] font-semibold" style={{ color: '#2563EB' }}>{c.reason}</span>
                </div>
              </button>
            ))}
          </div>

          <TabBar activePage="search" navigate={navigate} />
        </div>
      </div>

      {/* Mini card overlay */}
      {showMini && (
        <MiniCard onClose={() => setShowMini(false)} onDetail={() => navigate('detail')} />
      )}
    </div>
  )
}

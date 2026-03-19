import { useState, useRef } from 'react'
import { Page } from '../App'
import TabBar from '../components/TabBar'
import LongPressAliasSheet from '../components/LongPressAliasSheet'

interface Props { navigate: (to: Page) => void }

// ─── CSS map ──────────────────────────────────────────────────────────────────
function NaverMap({ offsetX = 0, offsetY = 0 }: { offsetX?: number; offsetY?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#F0EBE0' }}>
      <div className="absolute" style={{ inset: 0, transform: `translate(${offsetX}px, ${offsetY}px)`, transition: 'transform 0.25s ease' }}>
        <div className="absolute" style={{ left: 0, right: 0, top: '38%', height: 22, backgroundColor: '#E8E2D4', borderTop: '1px solid #D8D0C0', borderBottom: '1px solid #D8D0C0' }} />
        <div className="absolute" style={{ left: 0, right: 0, top: '60%', height: 14, backgroundColor: '#E8E2D4' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '42%', width: 20, backgroundColor: '#E8E2D4', borderLeft: '1px solid #D8D0C0', borderRight: '1px solid #D8D0C0' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '66%', width: 12, backgroundColor: '#E8E2D4' }} />
        <div className="absolute" style={{ left: 0, right: 0, top: '20%', height: 8, backgroundColor: '#EAE4D8' }} />
        <div className="absolute" style={{ left: 0, right: 0, top: '75%', height: 8, backgroundColor: '#EAE4D8' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '22%', width: 8, backgroundColor: '#EAE4D8' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '80%', width: 8, backgroundColor: '#EAE4D8' }} />
        {[
          { l: '2%',  t: '4%',  w: '18%', h: '14%', c: '#E2D8C8' }, { l: '23%', t: '4%',  w: '17%', h: '14%', c: '#D8D0BE' },
          { l: '45%', t: '4%',  w: '18%', h: '14%', c: '#DDD5C3' }, { l: '68%', t: '4%',  w: '12%', h: '14%', c: '#E0D8C6' },
          { l: '83%', t: '4%',  w: '14%', h: '14%', c: '#D6CEC0' }, { l: '2%',  t: '22%', w: '18%', h: '14%', c: '#DDD5C5' },
          { l: '23%', t: '22%', w: '17%', h: '14%', c: '#E4DCC8' }, { l: '45%', t: '22%', w: '18%', h: '14%', c: '#D8D0C0' },
          { l: '68%', t: '22%', w: '12%', h: '14%', c: '#DDD5C3' }, { l: '83%', t: '22%', w: '14%', h: '14%', c: '#D4CCC0' },
          { l: '23%', t: '43%', w: '17%', h: '15%', c: '#E0D8C6' }, { l: '45%', t: '43%', w: '18%', h: '15%', c: '#DACED0' },
          { l: '83%', t: '43%', w: '14%', h: '15%', c: '#D8D0C0' }, { l: '2%',  t: '63%', w: '18%', h: '33%', c: '#D8D0C2' },
          { l: '23%', t: '63%', w: '17%', h: '33%', c: '#E0D8C8' }, { l: '45%', t: '63%', w: '18%', h: '33%', c: '#DDD5C3' },
          { l: '68%', t: '63%', w: '12%', h: '33%', c: '#D4CCC0' }, { l: '83%', t: '63%', w: '14%', h: '33%', c: '#DACED2' },
        ].map((b, i) => <div key={i} className="absolute" style={{ left: b.l, top: b.t, width: b.w, height: b.h, backgroundColor: b.c, border: '1px solid #CEC6B4' }} />)}
        <div className="absolute rounded" style={{ left: '2%', top: '43%', width: '18%', height: '15%', backgroundColor: '#B8D4A8', border: '1px solid #A8C498' }} />
        <div className="absolute rounded" style={{ left: '68%', top: '43%', width: '12%', height: '15%', backgroundColor: '#BCDAAC' }} />
        <div className="absolute" style={{ left: '45%', top: '43%', width: '18%', height: '15%', backgroundColor: '#C8DEFA', border: '2px solid #2563EB' }} />
      </div>
    </div>
  )
}

// ─── Location pin ─────────────────────────────────────────────────────────────
function LocationPin({ x, y, size = 20, opacity = 1, label, selected = false, gps = false }: {
  x: number; y: number; size?: number; opacity?: number; label?: string; selected?: boolean; gps?: boolean
}) {
  const pinColor = gps ? '#059669' : selected ? '#2563EB' : '#E8563A'
  return (
    <div className="absolute flex flex-col items-center" style={{ left: x, top: y, opacity, zIndex: 5 }}>
      {label && (
        <div className="absolute whitespace-nowrap px-1.5 py-0.5 rounded shadow text-[9px] font-bold"
          style={{ top: -22, left: '50%', transform: 'translateX(-50%)', backgroundColor: selected ? '#2563EB' : gps ? '#059669' : '#FFFFFF', color: selected || gps ? '#FFFFFF' : '#0F172A', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}>
          {label}
        </div>
      )}
      {(selected || gps) && (
        <div className="absolute rounded-full" style={{ width: size + 16, height: size + 16, top: -(size + 16) / 2 + size / 2, left: -(size + 16) / 2 + size / 2, backgroundColor: gps ? 'rgba(5,150,105,0.15)' : 'rgba(37,99,235,0.15)', border: `2px solid ${gps ? 'rgba(5,150,105,0.4)' : 'rgba(37,99,235,0.4)'}` }} />
      )}
      <div className="rounded-full" style={{ width: size, height: size, backgroundColor: pinColor, border: '2px solid white', boxShadow: `0 2px 6px rgba(0,0,0,0.35)` }} />
      <div style={{ width: 0, height: 0, borderLeft: `${size * 0.22}px solid transparent`, borderRight: `${size * 0.22}px solid transparent`, borderTop: `${size * 0.38}px solid ${pinColor}`, marginTop: -1 }} />
    </div>
  )
}

// ─── Crosshair pin ────────────────────────────────────────────────────────────
function CrosshairPin({ dragging }: { dragging: boolean }) {
  return (
    <div className="absolute flex flex-col items-center z-40 pointer-events-none"
         style={{ left: '50%', top: '42%', transform: 'translate(-50%, -100%)' }}>
      <div className="absolute" style={{ width: 18, height: 5, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.22)', bottom: dragging ? -10 : -4, left: '50%', transform: 'translateX(-50%)', filter: 'blur(4px)', transition: 'bottom 0.15s ease', opacity: dragging ? 0.5 : 1 }} />
      <div className="absolute rounded-full" style={{ width: 44, height: 44, top: -10, left: -10, backgroundColor: 'rgba(37,99,235,0.14)', border: '2px solid rgba(37,99,235,0.32)' }} />
      <div className="rounded-full transition-all" style={{ width: 26, height: 26, backgroundColor: '#2563EB', border: '3px solid white', boxShadow: dragging ? '0 8px 24px rgba(37,99,235,0.6)' : '0 4px 16px rgba(37,99,235,0.45)', transform: dragging ? 'translateY(-6px)' : 'none', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }} />
      <div className="transition-all" style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '11px solid #2563EB', marginTop: -2, transform: dragging ? 'translateY(-6px)' : 'none', transition: 'transform 0.15s ease' }} />
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface PlaceInfo { name: string; address: string }
const TAPPABLE_PLACE: PlaceInfo = { name: '강남 PC프라자', address: '서울 강남구 테헤란로 152, 지하 1층' }

function resolveAddress(offsetX: number, offsetY: number): PlaceInfo {
  if (offsetX === 0 && offsetY === 0) return { name: '강남 PC프라자', address: '서울 강남구 테헤란로 152, 지하 1층' }
  if (offsetX > 40)  return { name: '강남 PC프라자 별관', address: '서울 강남구 테헤란로 154, 1층' }
  if (offsetX < -40) return { name: '테헤란 PC방', address: '서울 강남구 테헤란로 148, 2층' }
  return { name: '강남 PC프라자', address: '서울 강남구 테헤란로 152, 지하 1층' }
}

type MapMode = 'browse' | 'pin-adjust'

export default function MainHome({ navigate }: Props) {
  const [activeFilter, setActiveFilter] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState<PlaceInfo | null>(null)
  const [mode, setMode] = useState<MapMode>('browse')
  // pin-adjust drag state
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Browse mode map pan state
  const [browseX, setBrowseX] = useState(0)
  const [browseY, setBrowseY] = useState(0)
  const [browseDragging, setBrowseDragging] = useState(false)
  const browseDragRef = useRef({ ox: 0, oy: 0, sx: 0, sy: 0 })

  // Long-press state
  const [longPressPin, setLongPressPin] = useState<{ x: number; y: number } | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressMoved = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getLongPressAddress = (x: number, y: number) => {
    const addresses = [
      '서울 강동구 천호대로 1071', '서울 강동구 성내로 12', '서울 강동구 올림픽로 123',
      '서울 강동구 암사동 45', '서울 강동구 고덕로 88',
    ]
    return addresses[Math.abs(Math.floor(x / 80 + y / 100)) % addresses.length]
  }

  const startLongPress = (clientX: number, clientY: number) => {
    longPressMoved.current = false
    longPressTimer.current = setTimeout(() => {
      if (longPressMoved.current) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      setLongPressPin({ x: clientX - rect.left, y: clientY - rect.top })
      setBrowseDragging(false)
    }, 500)
  }

  const cancelLongPress = (clientX: number, clientY: number) => {
    const { sx, sy } = browseDragRef.current
    if (Math.abs(clientX - sx) > 8 || Math.abs(clientY - sy) > 8) {
      longPressMoved.current = true
      if (longPressTimer.current) clearTimeout(longPressTimer.current)
    }
  }

  const onBrowseMouseDown = (e: React.MouseEvent) => {
    setBrowseDragging(true)
    browseDragRef.current = { ox: browseX, oy: browseY, sx: e.clientX, sy: e.clientY }
    startLongPress(e.clientX, e.clientY)
  }
  const onBrowseMouseMove = (e: React.MouseEvent) => {
    cancelLongPress(e.clientX, e.clientY)
    if (!browseDragging) return
    const { ox, oy, sx, sy } = browseDragRef.current
    setBrowseX(ox + e.clientX - sx); setBrowseY(oy + e.clientY - sy)
  }
  const onBrowseMouseUp = () => {
    setBrowseDragging(false)
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }
  const onBrowseTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    setBrowseDragging(true)
    browseDragRef.current = { ox: browseX, oy: browseY, sx: t.clientX, sy: t.clientY }
    startLongPress(t.clientX, t.clientY)
  }
  const onBrowseTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0]
    cancelLongPress(t.clientX, t.clientY)
    if (!browseDragging) return
    const { ox, oy, sx, sy } = browseDragRef.current
    setBrowseX(ox + t.clientX - sx); setBrowseY(oy + t.clientY - sy)
  }
  const onBrowseTouchEnd = () => {
    setBrowseDragging(false)
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }

  const filters = ['전체', '영업중', '저가순', '행사중 🎉', '24시간']

  const enterPinAdjust = () => { setOffsetX(0); setOffsetY(0); setMode('pin-adjust') }
  const isNudged = offsetX !== 0 || offsetY !== 0
  const currentPlace = resolveAddress(offsetX, offsetY)

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); setDragOrigin({ x: offsetX, y: offsetY }); setDragStart({ x: e.clientX, y: e.clientY }) }
  const onMouseMove = (e: React.MouseEvent) => { if (!dragging) return; setOffsetX(dragOrigin.x + (e.clientX - dragStart.x)); setOffsetY(dragOrigin.y + (e.clientY - dragStart.y)) }
  const onMouseUp = () => setDragging(false)
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; setDragging(true); setDragOrigin({ x: offsetX, y: offsetY }); setDragStart({ x: t.clientX, y: t.clientY }) }
  const onTouchMove = (e: React.TouchEvent) => { if (!dragging) return; const t = e.touches[0]; setOffsetX(dragOrigin.x + (t.clientX - dragStart.x)); setOffsetY(dragOrigin.y + (t.clientY - dragStart.y)) }
  const onTouchEnd = () => setDragging(false)

  // ── PIN-ADJUST MODE ───────────────────────────────────────────────────────
  if (mode === 'pin-adjust') {
    return (
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <NaverMap offsetX={offsetX} offsetY={offsetY} />
        <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 70px rgba(0,0,0,0.15)' }} />

        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 h-[54px] flex items-center px-5 z-30 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}>
          <span className="text-[15px] font-semibold text-white">9:41</span>
          <div className="flex-1" />
          <span className="text-[12px] text-white">▲ WiFi 🔋</span>
        </div>

        {/* Top banner */}
        <div className="absolute inset-x-4 z-30 flex items-center gap-2 px-4 py-3 rounded-2xl pointer-events-auto"
             style={{ top: 62, backgroundColor: 'rgba(15,23,42,0.84)', backdropFilter: 'blur(8px)' }}>
          <button onClick={() => { setMode('browse'); navigate('alias-select') }}
                  className="flex-shrink-0 text-[12px] font-semibold px-2.5 py-1.5 rounded-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#CBD5E1' }}>← 목록</button>
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-[12px] text-white font-semibold">지도를 드래그하여 위치 조정</span>
            <span className="text-[10px]" style={{ color: '#93C5FD' }}>핀이 가리키는 위치로 별칭이 등록됩니다</span>
          </div>
          {isNudged && (
            <button onClick={() => { setOffsetX(0); setOffsetY(0) }}
                    className="flex-shrink-0 text-[11px] font-bold px-2 py-1 rounded-lg"
                    style={{ backgroundColor: 'rgba(217,119,6,0.3)', color: '#FCD34D' }}>초기화</button>
          )}
        </div>

        <CrosshairPin dragging={dragging} />

        {!isNudged && !dragging && (
          <div className="absolute z-30 pointer-events-none flex flex-col items-center gap-1"
               style={{ left: '50%', top: '50%', transform: 'translateX(-50%)' }}>
            <div className="flex gap-3 text-white" style={{ fontSize: 18, opacity: 0.65 }}>
              <span>←</span><span>↕</span><span>→</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.85)' }}>
              손가락으로 드래그
            </span>
          </div>
        )}

        <button className="absolute z-30 flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-semibold pointer-events-auto"
                style={{ right: 16, top: '36%', backgroundColor: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', color: '#0F172A' }}
                onClick={() => { setOffsetX(0); setOffsetY(0) }}>📡 GPS</button>

        {/* Bottom confirm sheet */}
        <div className="absolute inset-x-4 z-30 flex flex-col gap-3 p-4 rounded-2xl pointer-events-auto"
             style={{ bottom: 24, backgroundColor: '#FFFFFF', boxShadow: '0 -4px 32px rgba(0,0,0,0.22)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: isNudged ? '#FEF3C7' : '#EFF6FF' }}>🖥</div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-[14px] font-extrabold truncate" style={{ color: '#0F172A' }}>{currentPlace.name}</span>
              <span className="text-[11px] truncate" style={{ color: '#64748B' }}>📍 {currentPlace.address}</span>
            </div>
            {isNudged && <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>조정됨</span>}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
               style={{ backgroundColor: isNudged ? '#FEF3C7' : '#EFF6FF' }}>
            <span className="text-[11px] font-semibold" style={{ color: isNudged ? '#D97706' : '#2563EB' }}>
              {isNudged ? '📍 위치 조정 완료' : '📡 GPS 자동 감지 — 현재 위치입니다'}
            </span>
          </div>
          <button onClick={() => { setMode('browse'); navigate('alias-confirm') }}
                  className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-[14px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>
            📌 이 위치로 별칭 등록하기
          </button>
        </div>
      </div>
    )
  }

  // ── BROWSE MODE ───────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: browseDragging ? 'grabbing' : 'default', userSelect: 'none' }}
      onMouseDown={onBrowseMouseDown} onMouseMove={onBrowseMouseMove} onMouseUp={onBrowseMouseUp} onMouseLeave={onBrowseMouseUp}
      onTouchStart={onBrowseTouchStart} onTouchMove={onBrowseTouchMove} onTouchEnd={onBrowseTouchEnd}
    >
      {/* Moving layer: map + pins */}
      <div className="absolute inset-0" style={{ transform: `translate(${browseX}px, ${browseY}px)`, transition: browseDragging ? 'none' : 'transform 0.1s ease' }}>
        <NaverMap />
        <LocationPin x={135} y={255} size={20} label="강동구 가성비 PC방 [91]" />
        <LocationPin x={257} y={370} size={14} opacity={0.8} />
        <LocationPin x={83}  y={442} size={12} opacity={0.65} />
        <LocationPin x={309} y={295} size={12} opacity={0.65} />
        {selectedPlace && <LocationPin x={196} y={338} size={22} label="강남 PC프라자" selected />}
        {/* Tappable building */}
        <button onClick={() => setSelectedPlace(TAPPABLE_PLACE)} className="absolute z-10"
                style={{ left: '45%', top: '43%', width: '18%', height: '15%', opacity: 0 }} />
      </div>

      <div className="absolute inset-x-0 top-0 pointer-events-none z-10"
           style={{ height: 180, background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)' }} />

      {/* Status bar */}
      <div className="absolute inset-x-0 top-0 h-[54px] flex items-center px-5 z-20">
        <span className="text-[15px] font-semibold text-white">9:41</span>
        <div className="flex-1" />
        <span className="text-[12px] text-white">▲ WiFi 🔋</span>
      </div>

      {/* Search bar */}
      <div className="absolute inset-x-5 z-20" style={{ top: 60 }}>
        <button onClick={() => navigate('search')}
                className="w-full h-[50px] flex items-center gap-2.5 px-4 bg-white rounded-full"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
          <span className="text-base text-slate-400">🔍</span>
          <span className="flex-1 text-[13px] text-slate-400 text-left">장소, 별칭, 해시태그 검색...</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F1F5F9' }}>
            <span style={{ fontSize: 15, color: '#2563EB' }}>🎤</span>
          </div>
          <div className="flex items-center px-2.5 py-1 rounded-[12px]" style={{ backgroundColor: '#EFF6FF' }}>
            <span className="text-[11px] font-semibold" style={{ color: '#2563EB' }}>이 지역에서 검색</span>
          </div>
        </button>
      </div>

      {/* Filter chips */}
      <div className="absolute inset-x-5 flex gap-2 z-20 overflow-x-auto" style={{ top: 124, scrollbarWidth: 'none' }}>
        {['전체', '영업중', '저가순', '행사중 🎉', '24시간'].map((f, i) => (
          <button key={i} onClick={() => setActiveFilter(i)}
                  className="flex-shrink-0 px-3 h-9 rounded-full text-xs font-semibold transition-colors"
                  style={{ backgroundColor: activeFilter === i ? '#2563EB' : '#FFFFFF', color: activeFilter === i ? '#FFFFFF' : '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            {f}
          </button>
        ))}
      </div>

      {selectedPlace && (
        <div className="absolute inset-0 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
             onClick={() => setSelectedPlace(null)} />
      )}

      {/* Current location button */}
      <div className="absolute z-25" style={{ left: 20, bottom: selectedPlace ? 280 : 116, transition: 'bottom 0.3s ease' }}>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full text-sm font-semibold text-slate-700"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <span>📍</span><span>현재 위치</span>
        </button>
      </div>

      {/* Register FAB */}
      {!selectedPlace && (
        <div className="absolute z-25" style={{ right: 20, bottom: 116 }}>
          <button onClick={() => navigate('alias-select')}
                  className="flex items-center gap-2 px-4 py-3 rounded-full text-[13px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.45)' }}>
            <span>+</span><span>별칭 등록</span>
          </button>
        </div>
      )}

      {/* Place bottom sheet */}
      {selectedPlace && (
        <div className="absolute inset-x-4 z-30 rounded-2xl flex flex-col gap-3 p-4"
             style={{ bottom: 100, backgroundColor: '#FFFFFF', boxShadow: '0 -4px 32px rgba(0,0,0,0.22)' }}
             onClick={e => e.stopPropagation()}>
          <div className="flex items-start gap-2">
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[16px] font-extrabold" style={{ color: '#0F172A' }}>{selectedPlace.name}</span>
              <span className="text-[12px]" style={{ color: '#64748B' }}>📍 {selectedPlace.address}</span>
            </div>
            <button onClick={() => setSelectedPlace(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: 16 }}>✕</button>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#FEF3C7' }}>
            <span className="text-[12px] font-semibold" style={{ color: '#D97706' }}>⚠ 아직 별칭이 등록되지 않은 장소입니다</span>
          </div>
          <span className="text-[11px]" style={{ color: '#94A3B8' }}>별칭을 등록하면 사람들이 이 장소를 더 쉽게 찾을 수 있어요</span>
          <button onClick={() => { setSelectedPlace(null); navigate('alias-confirm') }}
                  className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-[14px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>
            📌 이 장소에 별칭 등록하기
          </button>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-30">
        <TabBar activePage="home" navigate={navigate} />
      </div>

      {longPressPin && (
        <LongPressAliasSheet
          pinX={longPressPin.x}
          pinY={longPressPin.y}
          address={getLongPressAddress(longPressPin.x, longPressPin.y)}
          onConfirm={() => { setLongPressPin(null); navigate('alias-confirm') }}
          onClose={() => setLongPressPin(null)}
        />
      )}
    </div>
  )
}

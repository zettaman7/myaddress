import { useState, useRef, useEffect } from 'react'
import { Page } from '../App'
import TabBar from '../components/TabBar'
import MiniCard from '../components/MiniCard'
import SwipeReveal from '../components/SwipeReveal'
import { sharePlace } from '../utils/share'
import LongPressAliasSheet from '../components/LongPressAliasSheet'

interface Props {
  navigate: (to: Page) => void
  setSelectedHasAlias: (v: boolean) => void
  setAliasInitCenter: (v: { lat: number; lng: number }) => void
  setAliasReturnPage: (p: Page) => void
  setDetailReturnPage: (p: Page) => void
}

const RESULT_PINS = [
  { lat: 37.5382, lng: 127.1243, alias: '강동구 가성비 PC방' },
  { lat: 37.5320, lng: 127.1350, alias: '암사역 저렴한 PC방' },
  { lat: 37.5400, lng: 127.1100, alias: '' },
  { lat: 37.5450, lng: 127.1300, alias: '' },
]

const cards = [
  {
    icon: '🖥',
    iconBg: '#EFF6FF',
    alias: '강동구 가성비 PC방',
    original: '하이프PC방',
    address: '서울 강동구 천호대로 1071',
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
    original: '암사역 게임존',
    address: '서울 강동구 암사동 123',
    meta: '⭐ 4.5  ·  🟢 영업중  ·  📍 1.2km  ·  ₩1,200/hr',
    tags: '#24시간  #RTX석',
    reason: '💡 가격 2위 · 평가 4.5 · 거리 1.2km',
    badge: null,
    badgeBg: '',
    badgeColor: '',
    hasAlias: false,
  },
]

export default function SearchResults({ navigate, setSelectedHasAlias, setAliasInitCenter, setAliasReturnPage, setDetailReturnPage }: Props) {
  const [showMini, setShowMini] = useState(false)
  const [activeFilter, setActiveFilter] = useState(0)
  const filters = ['✓ 영업중', '저가순', '행사중', '고사양석']

  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  const [longPressPin, setLongPressPin] = useState<{
    x: number; y: number; lat: number; lng: number; address: string
  } | null>(null)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const overlaysRef = useRef<any[]>([])
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStart = useRef({ x: 0, y: 0, moved: false })

  useEffect(() => {
    if (!mapContainerRef.current) return
    let mounted = true

    const initMap = () => {
      if (!mounted || !mapContainerRef.current) return
      const container = mapContainerRef.current

      let map: any
      try {
        map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(37.5382, 127.1243),
          level: 5,
        })
      } catch (e) {
        if (mounted) setMapError('지도 로드 실패')
        return
      }
      kakaoMapRef.current = map
      if (mounted) setMapLoaded(true)

      const doRelayout = () => { if (mounted) map.relayout() }
      setTimeout(doRelayout, 50)
      setTimeout(doRelayout, 300)
      const handleResize = () => { if (mounted) map.relayout() }
      window.addEventListener('resize', handleResize)
      window.visualViewport?.addEventListener('resize', handleResize)
      const ro = new ResizeObserver(doRelayout)
      ro.observe(container)

      RESULT_PINS.forEach(pin => {
        const position = new window.kakao.maps.LatLng(pin.lat, pin.lng)
        const marker = new window.kakao.maps.Marker({ position, map })
        markersRef.current.push(marker)

        if (pin.alias) {
          const content = `<div style="background:white;padding:2px 8px;border-radius:4px;font-size:9px;font-weight:700;color:#0F172A;box-shadow:0 1px 4px rgba(0,0,0,0.18);white-space:nowrap;pointer-events:none">${pin.alias} [${Math.floor(Math.random() * 30 + 70)}]</div>`
          const overlay = new window.kakao.maps.CustomOverlay({
            content,
            position,
            yAnchor: 3.2,
            map,
          })
          overlaysRef.current.push(overlay)
        }
      })

      // Long press via DOM events
      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0]
        touchStart.current = { x: t.clientX, y: t.clientY, moved: false }
        longPressTimer.current = setTimeout(() => {
          if (touchStart.current.moved || !mounted) return
          const rect = container.getBoundingClientRect()
          const px = touchStart.current.x - rect.left
          const py = touchStart.current.y - rect.top
          let latlng: any
          try {
            latlng = map.getProjection().fromContainerPixelToLatLng(
              new window.kakao.maps.Point(px, py)
            )
          } catch {
            latlng = map.getCenter()
          }
          const geocoder = new window.kakao.maps.services.Geocoder()
          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
            if (!mounted) return
            const address = status === window.kakao.maps.services.Status.OK
              ? result[0].road_address?.address_name || result[0].address.address_name
              : `${latlng.getLat().toFixed(5)}, ${latlng.getLng().toFixed(5)}`
            setLongPressPin({ x: px, y: py, lat: latlng.getLat(), lng: latlng.getLng(), address })
          })
        }, 600)
      }
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0]
        if (Math.abs(t.clientX - touchStart.current.x) > 8 || Math.abs(t.clientY - touchStart.current.y) > 8) {
          touchStart.current.moved = true
          if (longPressTimer.current) clearTimeout(longPressTimer.current)
        }
      }
      const onTouchEnd = () => {
        if (longPressTimer.current) clearTimeout(longPressTimer.current)
      }
      const onContextMenu = (e: Event) => e.preventDefault()

      container.addEventListener('touchstart', onTouchStart, { passive: true })
      container.addEventListener('touchmove', onTouchMove, { passive: true })
      container.addEventListener('touchend', onTouchEnd, { passive: true })
      container.addEventListener('contextmenu', onContextMenu)

      return () => {
        ro.disconnect()
        window.removeEventListener('resize', handleResize)
        window.visualViewport?.removeEventListener('resize', handleResize)
        container.removeEventListener('touchstart', onTouchStart)
        container.removeEventListener('touchmove', onTouchMove)
        container.removeEventListener('touchend', onTouchEnd)
        container.removeEventListener('contextmenu', onContextMenu)
        markersRef.current.forEach(m => m.setMap(null))
        overlaysRef.current.forEach(o => o.setMap(null))
        markersRef.current = []
        overlaysRef.current = []
      }
    }

    let cleanup: (() => void) | undefined

    const tryLoad = () => {
      if (!mounted) return
      if (typeof window.kakao !== 'undefined') {
        window.kakao.maps.load(() => {
          if (mounted) cleanup = initMap() || undefined
        })
      } else {
        setTimeout(tryLoad, 100)
      }
    }
    tryLoad()

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Full-screen map */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0"
           style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
           onContextMenu={e => e.preventDefault()} />

      {/* Map loading/error fallback */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none"
             style={{ backgroundColor: '#F0EBE0' }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <span className="text-[12px] text-white font-semibold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>지도 불러오는 중...</span>
          </div>
        </div>
      )}

      {/* Nav header */}
      <div className="relative z-20 flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-[44px] sm:h-[54px]" />

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
                  className="flex-shrink-0 px-3 h-[34px] rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: activeFilter === i ? '#2563EB' : '#FFFFFF', color: activeFilter === i ? '#FFFFFF' : '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Count badge */}
      <div className="absolute z-10 px-3 py-1.5 rounded-full text-[12px] font-bold text-white"
           style={{ left: '50%', transform: 'translateX(-50%)', top: 405, backgroundColor: '#1E3A5F', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        PC방 47곳 발견 · 가격 우선 정렬 ▾
      </div>

      {/* Bottom result panel */}
      <div className="absolute bottom-0 inset-x-0 z-20" style={{ top: 438 }}>
        <div className="w-full h-full bg-white flex flex-col" style={{ borderRadius: '16px 16px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
          {/* Handle */}
          <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-slate-300" />
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 pb-2" style={{ scrollbarWidth: 'none' }}>
            {cards.map((c, i) => (
              <SwipeReveal key={i}
                           onShare={() => sharePlace({ alias: c.alias, name: c.original, address: c.address })}>
                <button onClick={() => {
                  setSelectedHasAlias(c.hasAlias)
                  i === 0 ? setShowMini(true) : (setDetailReturnPage('search'), navigate('detail'))
                }}
                        className="w-full flex items-start gap-3 p-3 text-left"
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
              </SwipeReveal>
            ))}
          </div>

          <TabBar activePage="search" navigate={navigate} />
        </div>
      </div>

      {/* Mini card overlay */}
      {showMini && (
        <MiniCard onClose={() => setShowMini(false)} onDetail={() => { setDetailReturnPage('search'); navigate('detail') }} />
      )}

      {longPressPin && (
        <LongPressAliasSheet
          pinX={longPressPin.x}
          pinY={longPressPin.y}
          address={longPressPin.address}
          onConfirm={() => {
            setAliasReturnPage('search')
            setAliasInitCenter({ lat: longPressPin.lat, lng: longPressPin.lng })
            setLongPressPin(null)
            navigate('alias-confirm')
          }}
          onClose={() => setLongPressPin(null)}
        />
      )}
    </div>
  )
}

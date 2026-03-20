import { useState, useRef, useEffect } from 'react'
import { Page } from '../App'
import TabBar from '../components/TabBar'
import LongPressAliasSheet from '../components/LongPressAliasSheet'

interface Props {
  navigate: (to: Page) => void
  setAliasInitCenter: (v: { lat: number; lng: number }) => void
  setAliasReturnPage: (p: Page) => void
  setDetailReturnPage: (p: Page) => void
}

interface PinPlace {
  id: number; lat: number; lng: number
  name: string; alias: string; address: string
  rating: string; status: string; dist: string; price: string
  tags: string; hasAlias: boolean; icon: string
}

const MAP_PINS: PinPlace[] = [
  {
    id: 1, lat: 37.5382, lng: 127.1243,
    name: '하이프PC방', alias: '강동구 가성비 PC방', address: '서울 강동구 천호대로 1071',
    rating: '4.7', status: '영업중', dist: '0.3km', price: '₩1,000/hr',
    tags: '#24시간 #학생할인 #고사양PC', hasAlias: true, icon: '🖥',
  },
  {
    id: 2, lat: 37.5320, lng: 127.1350,
    name: '암사역 게임존', alias: '암사역 저렴한 PC방', address: '서울 강동구 암사동 123',
    rating: '4.5', status: '영업중', dist: '1.2km', price: '₩1,200/hr',
    tags: '#24시간 #RTX석', hasAlias: false, icon: '🖥',
  },
  {
    id: 3, lat: 37.5400, lng: 127.1100,
    name: '강동게임센터', alias: '', address: '서울 강동구 성내로 12',
    rating: '4.2', status: '영업중', dist: '0.8km', price: '₩1,500/hr',
    tags: '#금연 #초보환영', hasAlias: false, icon: '🎮',
  },
  {
    id: 4, lat: 37.5450, lng: 127.1300,
    name: 'PC파크 강동점', alias: '', address: '서울 강동구 올림픽로 456',
    rating: '4.0', status: '마감', dist: '1.5km', price: '₩1,300/hr',
    tags: '#고사양 #주차가능', hasAlias: false, icon: '💻',
  },
]

export default function MainHome({ navigate, setAliasInitCenter, setAliasReturnPage, setDetailReturnPage }: Props) {
  const [activeFilter, setActiveFilter] = useState(0)
  const [selectedPin, setSelectedPin] = useState<PinPlace | null>(null)
  const [longPressPin, setLongPressPin] = useState<{
    x: number; y: number; lat: number; lng: number; address: string
  } | null>(null)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const overlaysRef = useRef<any[]>([])
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

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
        if (mounted) setMapError('지도를 불러오지 못했습니다. 카카오 개발자 콘솔에서 도메인을 등록해주세요.')
        return
      }
      kakaoMapRef.current = map
      if (mounted) setMapLoaded(true)

      // Add markers
      MAP_PINS.forEach(pin => {
        const position = new window.kakao.maps.LatLng(pin.lat, pin.lng)
        const marker = new window.kakao.maps.Marker({ position, map })
        markersRef.current.push(marker)

        // Alias label overlay
        if (pin.hasAlias) {
          const content = `<div style="background:white;padding:2px 8px;border-radius:4px;font-size:9px;font-weight:700;color:#0F172A;box-shadow:0 1px 4px rgba(0,0,0,0.18);white-space:nowrap;pointer-events:none">${pin.alias}</div>`
          const overlay = new window.kakao.maps.CustomOverlay({
            content,
            position,
            yAnchor: 3.2,
            map,
          })
          overlaysRef.current.push(overlay)
        }

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (!touchStart.current.moved) setSelectedPin(pin)
        })
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

    // Timeout fallback: if kakao never loads in 5s, show error
    const errorTimer = setTimeout(() => {
      if (mounted && !kakaoMapRef.current) {
        setMapError('카카오맵 로드 실패. 카카오 개발자 콘솔에서 http://localhost:5173 도메인을 등록해주세요.')
      }
    }, 5000)

    const tryLoad = () => {
      if (!mounted) return
      if (typeof window.kakao !== 'undefined') {
        try {
          window.kakao.maps.load(() => {
            clearTimeout(errorTimer)
            if (mounted) cleanup = initMap() || undefined
          })
        } catch (e) {
          console.error('[KakaoMap] load() failed:', e)
          clearTimeout(errorTimer)
          if (mounted) setMapError('카카오맵 초기화 실패. 개발자 콘솔을 확인해주세요.')
        }
      } else {
        setTimeout(tryLoad, 100)
      }
    }
    tryLoad()

    return () => {
      mounted = false
      clearTimeout(errorTimer)
      cleanup?.()
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden"
         style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
         onContextMenu={e => e.preventDefault()}>
      {/* Kakao Map container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0"
           style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
           onContextMenu={e => e.preventDefault()} />

      {/* Map loading / error fallback */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none"
             style={{ backgroundColor: '#F0EBE0' }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <span className="text-[12px] text-slate-500">지도 불러오는 중...</span>
          </div>
        </div>
      )}
      {mapError && (
        <div className="absolute inset-0 z-5 flex items-center justify-center px-8"
             style={{ backgroundColor: '#F0EBE0' }}>
          <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
            <span className="text-2xl">🗺️</span>
            <p className="text-[13px] font-bold mt-2 mb-1" style={{ color: '#0F172A' }}>지도 로드 실패</p>
            <p className="text-[11px] leading-relaxed" style={{ color: '#64748B' }}>{mapError}</p>
          </div>
        </div>
      )}

      {/* Top gradient for readability */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-10"
           style={{ height: 180, background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)' }} />

      {/* Status bar */}
      <div className="absolute inset-x-0 top-0 h-[54px] flex items-center px-5 z-20 pointer-events-none">
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
                  className="flex-shrink-0 px-3 h-9 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: activeFilter === i ? '#2563EB' : '#FFFFFF', color: activeFilter === i ? '#FFFFFF' : '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Backdrop when pin selected */}
      {selectedPin && (
        <div className="absolute inset-0 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
             onClick={() => setSelectedPin(null)} />
      )}

      {/* Current location button */}
      <div className="absolute z-20" style={{ left: 20, bottom: selectedPin ? 304 : 116, transition: 'bottom 0.3s ease' }}>
        <button
          onClick={() => kakaoMapRef.current?.setCenter(new window.kakao.maps.LatLng(37.5382, 127.1243))}
          className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full text-sm font-semibold text-slate-700"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <span>📍</span><span>현재 위치</span>
        </button>
      </div>

      {/* Register FAB */}
      {!selectedPin && (
        <div className="absolute z-20" style={{ right: 20, bottom: 116 }}>
          <button onClick={() => { setAliasReturnPage('home'); navigate('alias-confirm') }}
                  className="flex items-center gap-2 px-4 py-3 rounded-full text-[13px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.45)' }}>
            <span>+</span><span>별칭 등록</span>
          </button>
        </div>
      )}

      {/* Pin mini card */}
      {selectedPin && (
        <div className="absolute inset-x-4 z-30 rounded-2xl p-4 flex flex-col gap-2.5"
             style={{ bottom: 104, backgroundColor: '#FFFFFF', boxShadow: '0 -4px 32px rgba(0,0,0,0.22)' }}
             onClick={e => e.stopPropagation()}>
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                 style={{ backgroundColor: selectedPin.hasAlias ? '#EFF6FF' : '#FEF3C7' }}>
              {selectedPin.icon}
            </div>
            <div className="flex-1 min-w-0">
              {selectedPin.hasAlias && (
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5"
                      style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  @{selectedPin.alias}
                </span>
              )}
              <p className="text-[15px] font-extrabold truncate" style={{ color: '#0F172A' }}>{selectedPin.name}</p>
              <p className="text-[11px] truncate" style={{ color: '#64748B' }}>📍 {selectedPin.address}</p>
            </div>
            <button onClick={() => setSelectedPin(null)}
                    className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: 14 }}>✕</button>
          </div>

          <div className="flex items-center gap-2 text-[11px]" style={{ color: '#475569' }}>
            <span>⭐ {selectedPin.rating}</span>
            <span>·</span>
            <span style={{ color: selectedPin.status === '영업중' ? '#059669' : '#EF4444' }}>
              🟢 {selectedPin.status}
            </span>
            <span>·</span>
            <span>📍 {selectedPin.dist}</span>
            <span>·</span>
            <span className="font-semibold" style={{ color: '#0F172A' }}>{selectedPin.price}</span>
          </div>

          <p className="text-[11px]" style={{ color: '#94A3B8' }}>{selectedPin.tags}</p>

          <div className="flex gap-2 pt-0.5">
            <button onClick={() => {
              setAliasReturnPage('home')
              setAliasInitCenter({ lat: selectedPin.lat, lng: selectedPin.lng })
              setSelectedPin(null)
              navigate('alias-confirm')
            }}
                    className="flex-1 h-11 rounded-xl text-[13px] font-bold"
                    style={{ backgroundColor: '#F1F5F9', color: '#374151' }}>
              {selectedPin.hasAlias ? '✏️ 별칭 편집' : '📌 별칭 등록'}
            </button>
            <button onClick={() => { setDetailReturnPage('home'); setSelectedPin(null); navigate('detail') }}
                    className="flex-[2] h-11 rounded-xl text-[13px] font-bold text-white"
                    style={{ backgroundColor: '#2563EB' }}>
              상세보기 →
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-30">
        <TabBar activePage="home" navigate={navigate} />
      </div>

      {longPressPin && (
        <LongPressAliasSheet
          pinX={longPressPin.x}
          pinY={longPressPin.y}
          address={longPressPin.address}
          onConfirm={() => {
            setAliasReturnPage('home')
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

import { useState, useRef, useEffect } from 'react'
import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  initialCenter?: { lat: number; lng: number } | null
  returnTo?: Page
}

interface ShopInfo { icon: string; name: string; address: string; category: string; dist: string; hasAlias: boolean; lat: number; lng: number }

const NEARBY_SHOPS: ShopInfo[] = [
  { icon: '🖥', name: '강남 PC프라자',        address: '서울 강남구 테헤란로 152, 지하 1층', category: 'PC방',   dist: '0m',  hasAlias: false, lat: 37.4985, lng: 127.0284 },
  { icon: '☕', name: '스타벅스 강남테헤란점', address: '서울 강남구 테헤란로 150, 1층',      category: '카페',   dist: '15m', hasAlias: true,  lat: 37.4987, lng: 127.0282 },
  { icon: '🍜', name: '하카타 분코 라멘',      address: '서울 강남구 테헤란로 148, 지하 1층', category: '음식점', dist: '28m', hasAlias: false, lat: 37.4983, lng: 127.0278 },
]

const DEFAULT_CENTER = { lat: 37.4985, lng: 127.0284 }
const DEFAULT_ADDR = { name: '서울특별시 강남구 테헤란로 152', address: '역삼동 823-1' }

export default function AliasConfirm({ navigate, initialCenter, returnTo = 'home' }: Props) {
  const [selectedShop, setSelectedShop] = useState<ShopInfo | null>(null)
  const [hasMapMoved, setHasMapMoved] = useState(false)
  const [mapDerivedAddress, setMapDerivedAddress] = useState<{ name: string; address: string }>(DEFAULT_ADDR)

  const [mapLoaded, setMapLoaded] = useState(false)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  const center = initialCenter ?? DEFAULT_CENTER

  useEffect(() => {
    if (!mapContainerRef.current) return
    let mounted = true

    const initMap = () => {
      if (!mounted || !mapContainerRef.current) return
      const container = mapContainerRef.current

      let map: any
      try {
        map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: 3,
        })
      } catch { return }
      kakaoMapRef.current = map
      if (mounted) setMapLoaded(true)

      setTimeout(() => { if (mounted) map.relayout() }, 100)

      const handleResize = () => { if (mounted) map.relayout() }
      window.addEventListener('resize', handleResize)
      window.visualViewport?.addEventListener('resize', handleResize)

      // GPS marker at center
      markerRef.current = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(center.lat, center.lng),
        map,
      })

      // Dragend → reverse geocode
      window.kakao.maps.event.addListener(map, 'dragend', () => {
        if (!mounted) return
        setHasMapMoved(true)
        setSelectedShop(null)
        const mapCenter = map.getCenter()
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2Address(mapCenter.getLng(), mapCenter.getLat(), (result: any, status: any) => {
          if (!mounted) return
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result[0]
            setMapDerivedAddress({
              name: addr.road_address?.address_name || addr.address.address_name,
              address: addr.address.address_name,
            })
          }
        })
      })

      return () => {
        window.removeEventListener('resize', handleResize)
        window.visualViewport?.removeEventListener('resize', handleResize)
        if (markerRef.current) markerRef.current.setMap(null)
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

  const handleSelectShop = (shop: ShopInfo | null) => {
    setSelectedShop(shop)
    setHasMapMoved(false)
    if (shop && kakaoMapRef.current) {
      kakaoMapRef.current.setCenter(new window.kakao.maps.LatLng(shop.lat, shop.lng))
      setMapDerivedAddress({ name: shop.name, address: shop.address })
    } else if (!shop && kakaoMapRef.current) {
      kakaoMapRef.current.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng))
      setMapDerivedAddress(DEFAULT_ADDR)
    }
  }

  const isNudged = hasMapMoved && !selectedShop

  const activePlace = selectedShop
    ? { icon: selectedShop.icon, name: selectedShop.name, address: selectedShop.address, tag: '장소 선택됨', tagColor: '#059669', tagBg: '#D1FAE5' }
    : isNudged
      ? { icon: '📍', name: mapDerivedAddress.name, address: mapDerivedAddress.address, tag: '위치 조정됨', tagColor: '#D97706', tagBg: '#FEF3C7' }
      : { icon: '📡', name: DEFAULT_ADDR.name, address: DEFAULT_ADDR.address, tag: 'GPS 감지됨', tagColor: '#2563EB', tagBg: '#DBEAFE' }

  const ctaLabel = selectedShop
    ? `🏪 ${selectedShop.name} · 등록 시작 →`
    : isNudged
      ? '📍 조정된 위치로 등록 시작 →'
      : '이 위치로 별칭 등록 시작 →'

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* ── 헤더 ── */}
      <div className="flex-shrink-0">
        <div className="h-[44px] sm:h-[54px]" />
        <div className="flex items-center gap-3 px-5 pb-2">
          <button onClick={() => navigate(returnTo)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>←</button>
          <span className="text-[13px] font-semibold" style={{ color: '#64748B' }}>별칭 등록 1 / 4 단계</span>
        </div>
        <div className="mx-5 mb-2">
          <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
            <div className="h-full rounded-full" style={{ width: '25%', backgroundColor: '#2563EB' }} />
          </div>
        </div>
      </div>

      {/* ── 지도 (고정 높이) ── */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 240 }}>
        {/* Kakao Map */}
        <div ref={mapContainerRef} className="absolute inset-0" />

        {/* Loading fallback */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
               style={{ backgroundColor: '#F0EBE0' }}>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <span className="text-[11px]" style={{ color: '#64748B' }}>지도 로딩중...</span>
            </div>
          </div>
        )}

        {/* GPS badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full pointer-events-none"
             style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}>
          <div className="w-2 h-2 rounded-full flex-shrink-0"
               style={{ backgroundColor: selectedShop ? '#059669' : isNudged ? '#D97706' : '#059669' }} />
          <span className="text-[11px] font-semibold"
                style={{ color: selectedShop ? '#059669' : isNudged ? '#D97706' : '#059669' }}>
            {selectedShop ? '장소 선택됨' : isNudged ? '위치 조정됨' : 'GPS 감지됨'}
          </span>
        </div>

        {/* GPS reset */}
        {(isNudged || selectedShop) && (
          <button className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)', color: '#0F172A' }}
                  onClick={() => handleSelectShop(null)}>
            📡 초기화
          </button>
        )}

        {/* Crosshair — 장소 선택 시 흐리게 */}
        <div className="absolute flex flex-col items-center z-20 pointer-events-none transition-opacity"
             style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%)', opacity: selectedShop ? 0.35 : 1 }}>
          <div className="absolute rounded-full"
               style={{ width: 44, height: 44, top: -9, left: -9, backgroundColor: 'rgba(37,99,235,0.15)', border: '2px solid rgba(37,99,235,0.3)' }} />
          <div className="rounded-full"
               style={{ width: 26, height: 26, backgroundColor: '#2563EB', border: '3px solid white',
                        boxShadow: '0 3px 12px rgba(37,99,235,0.45)' }} />
          <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                        borderTop: '11px solid #2563EB', marginTop: -1 }} />
        </div>

        {/* 드래그 힌트 */}
        {!isNudged && !selectedShop && (
          <div className="absolute z-10 pointer-events-none"
               style={{ left: '50%', top: 'calc(50% + 22px)', transform: 'translateX(-50%)' }}>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.42)', color: 'rgba(255,255,255,0.9)' }}>
              드래그하여 위치 조정
            </span>
          </div>
        )}
      </div>

      {/* ── 하단 통합 패널 (스크롤 가능) ── */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ borderTop: '1px solid #E2E8F0' }}>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

          {/* 선택된 위치 카드 */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors"
                 style={{ backgroundColor: selectedShop ? '#F0FDF4' : isNudged ? '#FFFBEB' : '#EFF6FF',
                          border: `1.5px solid ${selectedShop ? '#BBF7D0' : isNudged ? '#FCD34D' : '#BFDBFE'}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                   style={{ backgroundColor: selectedShop ? '#D1FAE5' : isNudged ? '#FEF3C7' : '#DBEAFE' }}>
                {activePlace.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold truncate" style={{ color: '#0F172A' }}>{activePlace.name}</p>
                <p className="text-[11px] truncate" style={{ color: '#64748B' }}>{activePlace.address}</p>
              </div>
              <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: activePlace.tagBg, color: activePlace.tagColor }}>
                {activePlace.tag}
              </span>
            </div>
          </div>

          {/* 구분선 + 주변 장소 헤더 */}
          <div className="flex items-center gap-3 px-4 pb-2">
            <div className="flex-1 h-px" style={{ backgroundColor: '#F1F5F9' }} />
            <span className="text-[11px] font-semibold flex-shrink-0" style={{ color: '#94A3B8' }}>또는 주변 장소 선택</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#F1F5F9' }} />
          </div>

          {/* 주변 장소 목록 */}
          {NEARBY_SHOPS.map((shop, i) => (
            <button key={i} onClick={() => handleSelectShop(selectedShop?.name === shop.name ? null : shop)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                    style={{
                      borderBottom: '1px solid #F8FAFC',
                      backgroundColor: selectedShop?.name === shop.name ? '#EFF6FF' : 'transparent',
                    }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                   style={{ backgroundColor: shop.hasAlias ? '#F0FDF4' : '#EFF6FF' }}>
                {shop.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold truncate" style={{ color: '#0F172A' }}>{shop.name}</p>
                <p className="text-[10px] truncate" style={{ color: '#64748B' }}>{shop.address}</p>
                <div className="flex gap-1.5 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>{shop.category}</span>
                  <span className="text-[10px]" style={{ color: '#94A3B8' }}>📍 {shop.dist}</span>
                  {shop.hasAlias && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>별칭 있음</span>}
                </div>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                   style={{ backgroundColor: selectedShop?.name === shop.name ? '#2563EB' : '#F1F5F9' }}>
                {selectedShop?.name === shop.name && <span className="text-white text-[10px]">✓</span>}
              </div>
            </button>
          ))}

          {/* GPS 주소로 등록 옵션 */}
          <button onClick={() => handleSelectShop(null)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{ backgroundColor: !selectedShop && !isNudged ? '#EFF6FF' : 'transparent' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                 style={{ backgroundColor: '#F0FDF4' }}>📡</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold truncate" style={{ color: '#0F172A' }}>GPS 현재 위치로 등록</p>
              <p className="text-[10px] truncate" style={{ color: '#64748B' }}>{DEFAULT_ADDR.name}</p>
            </div>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: !selectedShop && !isNudged ? '#2563EB' : '#F1F5F9' }}>
              {!selectedShop && !isNudged && <span className="text-white text-[10px]">✓</span>}
            </div>
          </button>

          <div className="h-2" />
        </div>

        {/* CTA — 고정 하단 */}
        <div className="flex-shrink-0 px-4 pb-6 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
          <button onClick={() => navigate('register')}
                  className="w-full h-12 rounded-2xl text-[14px] font-bold text-white transition-colors"
                  style={{ backgroundColor: '#2563EB' }}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

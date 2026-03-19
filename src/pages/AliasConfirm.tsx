import { useState, useRef } from 'react'
import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  startInSelect?: boolean   // true = FAB flow (show shop list first)
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ShopInfo { icon: string; name: string; address: string; category: string; dist: string; hasAlias: boolean }

const NEARBY_SHOPS: ShopInfo[] = [
  { icon: '🖥', name: '강남 PC프라자',        address: '서울 강남구 테헤란로 152, 지하 1층', category: 'PC방',  dist: '0m',  hasAlias: false },
  { icon: '☕', name: '스타벅스 강남테헤란점', address: '서울 강남구 테헤란로 150, 1층',      category: '카페',  dist: '15m', hasAlias: true  },
  { icon: '🍜', name: '하카타 분코 라멘',      address: '서울 강남구 테헤란로 148, 지하 1층', category: '음식점', dist: '28m', hasAlias: false },
]

const GPS_ADDRESS = { road: '서울특별시 강남구 테헤란로 152', detail: '역삼동 823-1' }

// ─── Map canvas (draggable, used in map-adjust mode) ──────────────────────────
function MapCanvas({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#F0EBE0' }}>
      <div className="absolute" style={{ inset: 0, transform: `translate(${offsetX}px, ${offsetY}px)`, transition: 'transform 0.1s ease' }}>
        <div className="absolute" style={{ left: 0, right: 0, top: '38%', height: 22, backgroundColor: '#E8E2D4', borderTop: '1px solid #D8D0C0', borderBottom: '1px solid #D8D0C0' }} />
        <div className="absolute" style={{ left: 0, right: 0, top: '60%', height: 14, backgroundColor: '#E8E2D4' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '42%', width: 20, backgroundColor: '#E8E2D4', borderLeft: '1px solid #D8D0C0' }} />
        <div className="absolute" style={{ top: 0, bottom: 0, left: '66%', width: 12, backgroundColor: '#E8E2D4' }} />
        {[
          { l: '2%', t: '4%', w: '18%', h: '14%', c: '#E2D8C8' }, { l: '23%', t: '4%', w: '17%', h: '14%', c: '#D8D0BE' },
          { l: '45%', t: '4%', w: '18%', h: '14%', c: '#C8DEFA', border: '2px solid #2563EB' }, { l: '68%', t: '4%', w: '12%', h: '14%', c: '#E0D8C6' },
          { l: '83%', t: '4%', w: '14%', h: '14%', c: '#D6CEC0' }, { l: '2%', t: '22%', w: '18%', h: '14%', c: '#DDD5C5' },
          { l: '23%', t: '22%', w: '17%', h: '14%', c: '#E4DCC8' }, { l: '45%', t: '22%', w: '18%', h: '14%', c: '#D8D0C0' },
          { l: '2%', t: '43%', w: '18%', h: '15%', c: '#B8D4A8' }, { l: '23%', t: '43%', w: '17%', h: '15%', c: '#E0D8C6' },
          { l: '2%', t: '63%', w: '18%', h: '33%', c: '#D8D0C2' }, { l: '23%', t: '63%', w: '17%', h: '33%', c: '#E0D8C8' },
          { l: '45%', t: '63%', w: '18%', h: '33%', c: '#DDD5C3' },
        ].map((b, i) => <div key={i} className="absolute" style={{ left: b.l, top: b.t, width: b.w, height: b.h, backgroundColor: b.c, border: b.border ?? '1px solid #CEC6B4' }} />)}
      </div>
    </div>
  )
}

// ─── Shared nav header (white, step 1/4) ──────────────────────────────────────
function StepHeader({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div className="flex items-center px-5 h-[54px] flex-shrink-0">
        <span className="text-[15px] font-semibold" style={{ color: '#0F172A' }}>9:41</span>
        <div className="flex-1" />
        <span className="text-[12px]" style={{ color: '#64748B' }}>▲ WiFi 🔋</span>
      </div>
      <div className="flex items-center gap-3 px-5 pb-3 flex-shrink-0">
        <button onClick={onBack}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>←</button>
        <span className="text-[13px] font-semibold" style={{ color: '#64748B' }}>별칭 등록 1 / 4 단계</span>
      </div>
      <div className="mx-5 mb-4 flex-shrink-0">
        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full rounded-full" style={{ width: '25%', backgroundColor: '#2563EB' }} />
        </div>
      </div>
    </>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function AliasConfirm({ navigate, startInSelect = false }: Props) {
  const [mode, setMode] = useState<'select' | 'confirm'>(startInSelect ? 'select' : 'confirm')
  const [hasShops, setHasShops] = useState(true)
  const [selectedShop, setSelectedShop] = useState<ShopInfo>(NEARBY_SHOPS[0])
  const [selectedAddress, setSelectedAddress] = useState({ name: '강남 PC프라자', address: '서울 강남구 테헤란로 152, 지하 1층' })

  // Map drag state (confirm mode)
  const [mapOffsetX, setMapOffsetX] = useState(0)
  const [mapOffsetY, setMapOffsetY] = useState(0)
  const [mapDragging, setMapDragging] = useState(false)
  const mapDragOrigin = useRef({ ox: 0, oy: 0, sx: 0, sy: 0 })

  const isNudged = mapOffsetX !== 0 || mapOffsetY !== 0
  const mapAddress = (() => {
    if (mapOffsetX > 40)  return { name: '강남 PC프라자 별관', address: '서울 강남구 테헤란로 154, 1층' }
    if (mapOffsetX < -40) return { name: '테헤란 PC방', address: '서울 강남구 테헤란로 148, 2층' }
    return selectedAddress
  })()
  const displayAddress = isNudged ? mapAddress : selectedAddress

  const onMapMouseDown = (e: React.MouseEvent) => { setMapDragging(true); mapDragOrigin.current = { ox: mapOffsetX, oy: mapOffsetY, sx: e.clientX, sy: e.clientY } }
  const onMapMouseMove = (e: React.MouseEvent) => { if (!mapDragging) return; const { ox, oy, sx, sy } = mapDragOrigin.current; setMapOffsetX(ox + e.clientX - sx); setMapOffsetY(oy + e.clientY - sy) }
  const onMapMouseUp = () => setMapDragging(false)
  const onMapTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; setMapDragging(true); mapDragOrigin.current = { ox: mapOffsetX, oy: mapOffsetY, sx: t.clientX, sy: t.clientY } }
  const onMapTouchMove = (e: React.TouchEvent) => { if (!mapDragging) return; const t = e.touches[0]; const { ox, oy, sx, sy } = mapDragOrigin.current; setMapOffsetX(ox + t.clientX - sx); setMapOffsetY(oy + t.clientY - sy) }
  const onMapTouchEnd = () => setMapDragging(false)

  const handleSelectShop = (shop: ShopInfo) => {
    setSelectedShop(shop)
    setSelectedAddress({ name: shop.name, address: shop.address })
    setMapOffsetX(0); setMapOffsetY(0)
    setMode('confirm')
  }

  const handleSelectAddress = () => {
    setSelectedAddress({ name: GPS_ADDRESS.road, address: GPS_ADDRESS.detail })
    setMapOffsetX(0); setMapOffsetY(0)
    setMode('confirm')
  }

  // ── SELECT MODE (step 1a) ──────────────────────────────────────────────────
  if (mode === 'select') {
    return (
      <div className="w-full h-full flex flex-col bg-white">
        <StepHeader onBack={() => navigate('home')} />

        <div className="flex-1 overflow-y-auto flex flex-col" style={{ scrollbarWidth: 'none' }}>

          {/* Heading */}
          <div className="px-5 pb-4 flex flex-col gap-1">
            <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>장소를 선택해주세요</h1>
            <p className="text-[13px]" style={{ color: '#94A3B8' }}>
              별칭을 등록할 장소를 선택하거나 현재 위치 주소로 등록하세요
            </p>
          </div>

          {/* GPS accuracy badge */}
          <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-xl self-start"
               style={{ backgroundColor: '#F0FDF4' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#059669' }} />
            <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
              📡 GPS 정확도 양호 · 서울 강남구 테헤란로 152 근처
            </span>
          </div>

          {hasShops ? (
            /* ── Case A: Nearby shops ─────────────────────────────────────── */
            <>
              <div className="px-5 mb-2 flex items-center justify-between">
                <span className="text-[13px] font-bold" style={{ color: '#374151' }}>현재 위치 근처 상점</span>
                <span className="text-[11px]" style={{ color: '#94A3B8' }}>{NEARBY_SHOPS.length}개 발견</span>
              </div>

              {NEARBY_SHOPS.map((shop, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectShop(shop)}
                  className="flex items-center gap-3 px-5 py-4 text-left"
                  style={{ borderBottom: '1px solid #F8FAFC' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                       style={{ backgroundColor: shop.hasAlias ? '#F0FDF4' : '#EFF6FF' }}>
                    {shop.icon}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold truncate" style={{ color: '#0F172A' }}>{shop.name}</span>
                    <span className="text-[11px] truncate" style={{ color: '#64748B' }}>{shop.address}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>{shop.category}</span>
                      <span className="text-[10px]" style={{ color: '#94A3B8' }}>📍 {shop.dist}</span>
                      {shop.hasAlias && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>별칭 있음</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                       style={{ backgroundColor: '#EFF6FF' }}>
                    <span className="text-[13px] font-bold" style={{ color: '#2563EB' }}>→</span>
                  </div>
                </button>
              ))}

              {/* GPS address fallback */}
              <div className="mx-5 mt-3 flex flex-col gap-2 p-4 rounded-2xl"
                   style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span className="text-[12px] font-bold" style={{ color: '#374151' }}>상점이 아닌 도로명 주소로 등록</span>
                <span className="text-[12px]" style={{ color: '#0F172A' }}>{GPS_ADDRESS.road}</span>
                <span className="text-[11px]" style={{ color: '#64748B' }}>{GPS_ADDRESS.detail}</span>
                <button onClick={handleSelectAddress}
                        className="mt-1 h-9 rounded-xl flex items-center justify-center text-[12px] font-semibold"
                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  이 주소로 등록 →
                </button>
              </div>
            </>
          ) : (
            /* ── Case B: No shops — GPS address ──────────────────────────── */
            <div className="px-5 flex flex-col gap-3">
              <div className="flex items-start gap-2.5 px-3 py-3 rounded-xl"
                   style={{ backgroundColor: '#FEF3C7' }}>
                <span>⚠️</span>
                <span className="text-[12px]" style={{ color: '#92400E' }}>
                  현재 위치에 등록된 상점이 없습니다. 도로명 주소로 별칭을 등록할 수 있습니다.
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-2xl"
                   style={{ backgroundColor: '#F8FAFC', border: '2px solid #2563EB' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>도로명</span>
                  <span className="text-[11px]" style={{ color: '#94A3B8' }}>GPS 자동 감지</span>
                </div>
                <span className="text-[16px] font-extrabold" style={{ color: '#0F172A' }}>{GPS_ADDRESS.road}</span>
                <span className="text-[12px]" style={{ color: '#64748B' }}>{GPS_ADDRESS.detail}</span>
              </div>
              <button onClick={handleSelectAddress}
                      className="w-full h-[52px] rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                      style={{ backgroundColor: '#2563EB' }}>
                📌 이 주소로 별칭 등록하기
              </button>
            </div>
          )}

          {/* Map fine-tune option */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 mx-5 my-4 px-4 py-3 rounded-2xl"
            style={{ backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1' }}
          >
            <span className="text-xl">🗺</span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold" style={{ color: '#374151' }}>지도에서 직접 위치 지정</span>
              <span className="text-[11px]" style={{ color: '#94A3B8' }}>지도 위에서 핀을 드래그하여 위치 조정</span>
            </div>
            <span className="text-[13px]" style={{ color: '#94A3B8' }}>→</span>
          </button>

          {/* Demo toggle */}
          <div className="mx-5 mb-6 flex justify-end">
            <button
              onClick={() => setHasShops(v => !v)}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
            >
              {hasShops ? '[데모] 상점없음 보기' : '[데모] 상점있음 보기'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── CONFIRM MODE (step 1b) — integrated map ───────────────────────────────
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <StepHeader onBack={() => startInSelect ? setMode('select') : navigate('home')} />

      {/* Interactive map */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ cursor: mapDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={onMapMouseDown} onMouseMove={onMapMouseMove} onMouseUp={onMapMouseUp} onMouseLeave={onMapMouseUp}
        onTouchStart={onMapTouchStart} onTouchMove={onMapTouchMove} onTouchEnd={onMapTouchEnd}
      >
        <MapCanvas offsetX={mapOffsetX} offsetY={mapOffsetY} />

        {/* GPS status badge — top left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full pointer-events-none"
             style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}>
          <div className="w-2 h-2 rounded-full flex-shrink-0"
               style={{ backgroundColor: isNudged ? '#D97706' : '#059669' }} />
          <span className="text-[11px] font-semibold"
                style={{ color: isNudged ? '#D97706' : '#059669' }}>
            {isNudged ? '📍 위치 조정됨' : '📡 GPS 감지됨'}
          </span>
        </div>

        {/* GPS reset button — top right */}
        <button
          className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold pointer-events-auto"
          style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)', color: '#0F172A' }}
          onClick={() => { setMapOffsetX(0); setMapOffsetY(0) }}
        >
          📡 GPS
        </button>

        {/* Crosshair pin — fixed center */}
        <div className="absolute flex flex-col items-center z-20 pointer-events-none"
             style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%)' }}>
          <div className="absolute rounded-full"
               style={{ width: 44, height: 44, top: -9, left: -9, backgroundColor: 'rgba(37,99,235,0.15)', border: '2px solid rgba(37,99,235,0.3)' }} />
          <div className="rounded-full"
               style={{ width: 26, height: 26, backgroundColor: '#2563EB', border: '3px solid white',
                        boxShadow: mapDragging ? '0 8px 24px rgba(37,99,235,0.55)' : '0 3px 12px rgba(37,99,235,0.45)',
                        transform: mapDragging ? 'translateY(-6px)' : 'none', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }} />
          <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                        borderTop: '11px solid #2563EB', marginTop: -1,
                        transform: mapDragging ? 'translateY(-6px)' : 'none', transition: 'transform 0.15s ease' }} />
        </div>

        {/* Drag hint — shown only before first drag */}
        {!isNudged && !mapDragging && (
          <div className="absolute z-10 flex flex-col items-center gap-1 pointer-events-none"
               style={{ left: '50%', top: 'calc(50% + 24px)', transform: 'translateX(-50%)' }}>
            <div className="flex gap-3" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
              <span>←</span><span>↕</span><span>→</span>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.42)', color: 'rgba(255,255,255,0.9)' }}>
              드래그하여 위치 조정
            </span>
          </div>
        )}
      </div>

      {/* Bottom panel */}
      <div className="flex-shrink-0 flex flex-col gap-2 px-5 pt-3 pb-6 bg-white"
           style={{ borderTop: '1px solid #F1F5F9' }}>
        {/* Place card */}
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl"
             style={{ backgroundColor: isNudged ? '#FFFBEB' : '#EFF6FF', border: `1.5px solid ${isNudged ? '#FCD34D' : '#BFDBFE'}` }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
               style={{ backgroundColor: isNudged ? '#FEF3C7' : '#DBEAFE' }}>
            {startInSelect ? selectedShop.icon : '🖥'}
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[14px] font-bold truncate" style={{ color: '#0F172A' }}>{displayAddress.name}</span>
            <span className="text-[11px] truncate" style={{ color: '#64748B' }}>{displayAddress.address}</span>
          </div>
          <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: isNudged ? '#FEF3C7' : '#DBEAFE', color: isNudged ? '#D97706' : '#2563EB' }}>
            {isNudged ? '📍 조정됨' : '📡 GPS'}
          </span>
        </div>

        {/* CTA */}
        <button onClick={() => navigate('register')}
                className="w-full h-[52px] rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#2563EB' }}>
          {isNudged ? '조정된 위치로 등록 시작 →' : '이 위치로 별칭 등록 시작 →'}
        </button>
      </div>
    </div>
  )
}

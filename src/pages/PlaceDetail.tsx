import { useRef } from 'react'
import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  hasAlias?: boolean
  setAliasEditReturn: (v: 'detail' | 'mypage') => void
}

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

export default function PlaceDetail({ navigate, hasAlias = false, setAliasEditReturn }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* ── Hero image area ─────────────────────────────────────────────── */}
      <div className="relative flex-shrink-0" style={{ height: 260 }}>
        {/* Hero background (mock gradient photo) */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1c2e 0%, #1a2f4a 60%, #0f2238 100%)' }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: 72, opacity: 0.35 }}>💻</div>
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />

        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 h-[54px] flex items-center px-5 z-10">
          <span className="text-[15px] font-semibold text-white">9:41</span>
          <div className="flex-1" />
          <span className="text-[12px] text-white">▲ WiFi 🔋</span>
        </div>

        {/* Back + share buttons */}
        <button onClick={() => navigate('search')}
                className="absolute flex items-center justify-center rounded-xl text-white text-xl z-10"
                style={{ left: 20, top: 72, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.4)' }}>←</button>
        <button className="absolute flex items-center justify-center rounded-xl text-white text-xl z-10"
                style={{ right: 20, top: 72, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.4)' }}>↑</button>

        {/* Alias badge row (bottom of hero) */}
        <div className="absolute bottom-4 left-5 flex gap-2 z-10">
          {hasAlias && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>@강동구 가성비 PC방</span>
          )}
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>PC방</span>
        </div>
      </div>

      {/* ── Scrollable content ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

        {/* Title section */}
        <div className="flex flex-col gap-1.5 px-5 pt-4 pb-3">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>강동구 가성비 PC방</h1>
          <span className="text-[12px]" style={{ color: '#94A3B8' }}>원상호: 하이프PC방</span>
          <div className="flex items-center gap-1.5 flex-wrap text-[12px]" style={{ color: '#64748B' }}>
            <span>⭐ 4.4 (312개)</span>
            <span>·</span>
            <span style={{ color: '#059669' }}>🟢 영업중</span>
            <span>·</span>
            <span>📍 0.4km</span>
          </div>
          <span className="text-[12px]" style={{ color: '#64748B' }}>📍 서울 강동구 천호대로 1071, 지하 2층</span>
        </div>

        {/* Price */}
        <div className="mx-5 mb-4 flex items-baseline gap-1.5 px-4 py-3 rounded-2xl"
             style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#94A3B8' }}>💰</span>
          <span className="text-[26px] font-extrabold" style={{ color: '#0F172A' }}>₩1,000</span>
          <span className="text-[13px]" style={{ color: '#94A3B8' }}>/시간</span>
          <span className="ml-auto text-[11px]" style={{ color: '#64748B' }}>정액 ₩6,000 (6hr)</span>
        </div>

        {/* Hashtags */}
        <div className="px-5 mb-4 flex gap-2 flex-wrap">
          {['#고사양PC', '#24시간', '#학생할인', '#금연'].map((tag, i) => (
            <span key={i} className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                  style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>{tag}</span>
          ))}
        </div>

        {/* Photo carousel */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-5 mb-2">
            <span className="text-[13px] font-bold" style={{ color: '#0F172A' }}>사진 ({photos.length})</span>
            <button className="text-[12px] font-semibold" style={{ color: '#2563EB' }}
                    onClick={() => navigate('photo-view')}>전체보기</button>
          </div>
          <div ref={scrollRef}
               className="flex gap-2 px-5 overflow-x-auto"
               style={{ scrollbarWidth: 'none' }}>
            {photos.map((p, i) => (
              <button key={i}
                      onClick={() => navigate('photo-view')}
                      className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center relative"
                      style={{ width: 115, height: 90, background: p.bg }}>
                <span style={{ fontSize: 26 }}>{p.emoji}</span>
                <span className="absolute bottom-1 left-1 text-[9px] font-semibold text-white px-1 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Event */}
        <div className="px-5 mb-4">
          <div className="px-4 py-3 rounded-2xl" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <span className="text-[13px] font-bold" style={{ color: '#92400E' }}>🎉 학생증 제시 30% 할인</span>
            <div className="text-[11px] mt-0.5" style={{ color: '#D97706' }}>~2026.03.31 · 시간당 ₩700</div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 mb-4 flex gap-3">
          {[{ value: '4.4', label: '별점' }, { value: '312', label: '리뷰' }, { value: '8.2K', label: '방문' }].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[18px] font-extrabold" style={{ color: '#0F172A' }}>{s.value}</span>
              <span className="text-[11px]" style={{ color: '#94A3B8' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Alias CTA — context-aware */}
        <div className="px-5 pb-6">
          {hasAlias ? (
            <button onClick={() => { setAliasEditReturn('detail'); navigate('alias-edit') }}
                    className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold"
                    style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
              ✏️ 별칭 편집하기
            </button>
          ) : (
            <button onClick={() => navigate('alias-confirm')}
                    className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                    style={{ backgroundColor: '#2563EB' }}>
              📍 별칭 등록하기
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom action bar ─────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex gap-3 px-5 py-3 bg-white border-t border-slate-100">
        {[
          { icon: '🗺', label: '길안내', bg: '#EFF6FF', color: '#2563EB' },
          { icon: '📞', label: '전화',   bg: '#F0FDF4', color: '#059669' },
          { icon: '🔖', label: '저장',   bg: '#F8FAFC', color: '#64748B' },
        ].map((btn, i) => (
          <button key={i} className="flex-1 flex flex-col items-center justify-center gap-1 rounded-xl py-3 text-[11px] font-semibold"
                  style={{ backgroundColor: btn.bg, color: btn.color }}>
            <span className="text-xl leading-none">{btn.icon}</span>
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

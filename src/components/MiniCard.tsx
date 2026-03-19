import { sharePlace } from '../utils/share'

const MINI_PLACE = { alias: '강동구 가성비 PC방', name: '하이프PC방', address: '서울 강동구 천호대로 1071' }

interface Props {
  onClose: () => void
  onDetail: () => void
}

export default function MiniCard({ onClose, onDetail }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-30" onClick={onClose} />

      {/* Card */}
      <div className="absolute inset-x-5 z-40 bg-white rounded-2xl flex flex-col gap-3 p-4"
           style={{ bottom: 110, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>

        {/* Header: alias + match */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center px-2.5 py-1 rounded-lg flex-1 min-w-0" style={{ backgroundColor: '#EFF6FF' }}>
            <span className="text-[13px] font-bold truncate" style={{ color: '#2563EB' }}>강동구 가성비 PC방</span>
          </div>
          <div className="flex items-center px-2 py-1 rounded-lg flex-shrink-0" style={{ backgroundColor: '#DCFCE7' }}>
            <span className="text-[11px] font-bold" style={{ color: '#059669' }}>일치도 98%</span>
          </div>
        </div>

        {/* Row 1: star · status · distance · time */}
        <span className="text-[12px]" style={{ color: '#475569' }}>
          ⭐ 4.7 &nbsp; 🟢 영업중 &nbsp; 📍 0.3km &nbsp; 🕐 15분 영업
        </span>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>₩1,500</span>
          <span className="text-[13px]" style={{ color: '#94A3B8' }}>/시간</span>
          <div className="flex-1" />
          <div className="flex items-center px-2 py-0.5 rounded" style={{ backgroundColor: '#FEF3C7' }}>
            <span className="text-[10px] font-semibold" style={{ color: '#D97706' }}>최저가 근처 1위</span>
          </div>
        </div>

        {/* Hashtags */}
        <span className="text-[11px]" style={{ color: '#64748B' }}>#고사양 &nbsp; #24시간 &nbsp; #학생할인 &nbsp; #금연</span>

        {/* Original name */}
        <span className="text-[11px]" style={{ color: '#94A3B8' }}>원상호: 하이프PC방</span>

        {/* Recommendation reason */}
        <div className="flex items-start gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#EFF6FF' }}>
          <span className="text-[12px] font-medium leading-snug" style={{ color: '#2563EB' }}>
            추천: 가격 우선 검색에 가장 잘 맞고 평가 4.7 안정적, 거리 0.3km 근접
          </span>
        </div>

        {/* Event row */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#FEF3C7' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#D97706' }}>
            🎉 학생할인 30%  ·  오늘 18:00까지
          </span>
        </div>

        {/* Priority summary */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>정렬기준:</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: '#2563EB' }}>가격</span>
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>{'>'}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: '#E2E8F0', color: '#64748B' }}>평가</span>
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>{'>'}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: '#E2E8F0', color: '#64748B' }}>거리</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button onClick={() => sharePlace(MINI_PLACE)}
                  className="h-12 px-4 rounded-xl flex items-center justify-center gap-1.5 text-[14px] font-bold flex-shrink-0"
                  style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
            ↑ 공유
          </button>
          <button onClick={onDetail}
                  className="flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>
            상세보기  →
          </button>
        </div>
      </div>
    </>
  )
}

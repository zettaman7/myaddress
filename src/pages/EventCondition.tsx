import { useState } from 'react'
import { Page } from '../App'
import StatusBar from '../components/StatusBar'

interface Props { navigate: (to: Page) => void }

export default function EventCondition({ navigate }: Props) {
  const [discType, setDiscType] = useState('% 할인율')
  const [eligibility, setEligibility] = useState('전체 회원')

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Navy header */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <StatusBar variant="light" />
        <div className="flex items-center gap-3 px-5 pb-3">
          <button onClick={() => navigate('event-period')}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                  style={{ color: '#1E3A5F' }}>←</button>
          <span className="text-[12px] font-semibold" style={{ color: '#FCD34D' }}>행사 등록  3 / 4 단계</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0 h-1" style={{ backgroundColor: '#E2E8F0' }}>
        <div className="h-full" style={{ width: '75%', backgroundColor: '#D97706' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>할인 조건을 설정해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>어떤 혜택을 제공하시나요?</p>
        </div>

        {/* Alias ref */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
            ✓ @강남구 넓고 빠른 게임아지트  ·  강남 PC프라자
          </span>
        </div>

        {/* Discount type */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>할인 유형</span>
          <div className="flex gap-2">
            {['% 할인율', '원 할인금액'].map(t => (
              <button key={t} onClick={() => setDiscType(t)}
                      className="px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
                      style={{
                        backgroundColor: discType === t ? '#2563EB' : '#F1F5F9',
                        color: discType === t ? '#FFFFFF' : '#64748B',
                      }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Discount amount */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>
            {discType === '% 할인율' ? '할인율' : '할인금액'}
          </span>
          <div className="flex items-baseline gap-2 px-4 py-3 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="text-[28px] font-extrabold" style={{ color: '#2563EB' }}>20</span>
            <span className="text-[18px] font-semibold" style={{ color: '#475569' }}>
              {discType === '% 할인율' ? '%' : '원'}
            </span>
          </div>
        </div>

        {/* Eligibility */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>적용 대상</span>
          <div className="flex gap-2 flex-wrap">
            {['전체 회원', '신규 회원', 'VIP 회원'].map(e => (
              <button key={e} onClick={() => setEligibility(e)}
                      className="px-3 py-2 rounded-xl text-[12px] font-semibold transition-colors"
                      style={{
                        backgroundColor: eligibility === e ? '#2563EB' : '#F1F5F9',
                        color: eligibility === e ? '#FFFFFF' : '#64748B',
                      }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Min usage time */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>최소 이용 시간</span>
          <div className="flex items-center h-12 px-4 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="text-[13px] font-semibold" style={{ color: '#0F172A' }}>2시간 이상</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3" style={{ backgroundColor: '#F8FAFC' }}>
        <button onClick={() => navigate('event-final')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#D97706' }}>
          다음 단계 →
        </button>
      </div>
    </div>
  )
}

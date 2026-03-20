import { useState } from 'react'
import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  eventReturnPage?: Page
  eventAliasName?: string
}

const EVENT_TYPES = ['할인행사', '무료증정', '포인트적립', '기타']

export default function EventRegister({ navigate, eventReturnPage = 'mypage', eventAliasName = '@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자' }: Props) {
  const [selectedType, setSelectedType] = useState('할인행사')
  const [eventName, setEventName] = useState('')

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Navy header */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-[44px] sm:h-[54px]" />
        <div className="flex items-center gap-3 px-5 pb-3">
          <button onClick={() => navigate(eventReturnPage)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                  style={{ color: '#1E3A5F' }}>←</button>
          <span className="text-[12px] font-semibold" style={{ color: '#FCD34D' }}>행사 등록  1 / 4 단계</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0 h-1" style={{ backgroundColor: '#E2E8F0' }}>
        <div className="h-full" style={{ width: '25%', backgroundColor: '#D97706' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>행사 기본 정보를 입력해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>어떤 행사를 진행하시나요?</p>
        </div>

        {/* Alias ref */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[12px] font-bold" style={{ color: '#059669' }}>✓</span>
          <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
            {eventAliasName}
          </span>
        </div>

        {/* Event type */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>행사 유형</span>
          <div className="flex gap-2 flex-wrap">
            {EVENT_TYPES.map(t => (
              <button key={t} onClick={() => setSelectedType(t)}
                      className="px-3 py-2 rounded-xl text-[12px] font-semibold transition-colors"
                      style={{
                        backgroundColor: selectedType === t ? '#FEF3C7' : '#F1F5F9',
                        color: selectedType === t ? '#D97706' : '#64748B',
                        border: selectedType === t ? '1px solid #FDE68A' : '1px solid transparent',
                      }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Event name */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>행사명</span>
          <div className="flex items-center h-12 px-3 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <input
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              placeholder="예) 월드컵 응원 특별 할인 행사"
              className="flex-1 text-[13px] outline-none bg-transparent"
              style={{ color: '#0F172A' }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3" style={{ backgroundColor: '#F8FAFC' }}>
        <button onClick={() => navigate('event-period')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#D97706' }}>
          다음 단계 →
        </button>
      </div>
    </div>
  )
}

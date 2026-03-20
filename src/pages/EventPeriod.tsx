import { useState } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void; eventAliasName?: string }

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

export default function EventPeriod({ navigate, eventAliasName = '@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자' }: Props) {
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금'])
  const [allDay, setAllDay] = useState(false)

  const toggleDay = (d: string) =>
    setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Navy header */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-[44px] sm:h-[54px]" />
        <div className="flex items-center gap-3 px-5 pb-3">
          <button onClick={() => navigate('event')}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                  style={{ color: '#1E3A5F' }}>←</button>
          <span className="text-[12px] font-semibold" style={{ color: '#FCD34D' }}>행사 등록  2 / 4 단계</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0 h-1" style={{ backgroundColor: '#E2E8F0' }}>
        <div className="h-full" style={{ width: '50%', backgroundColor: '#D97706' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>행사 기간을 설정해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>언제 행사를 진행하시나요?</p>
        </div>

        {/* Alias ref */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
            ✓ {eventAliasName}
          </span>
        </div>

        {/* Date range */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>행사 기간</span>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col gap-1 px-3 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>시작일</span>
              <span className="text-[15px] font-bold" style={{ color: '#0F172A' }}>2026. 03. 25</span>
            </div>
            <span className="text-[16px]" style={{ color: '#94A3B8' }}>→</span>
            <div className="flex-1 flex flex-col gap-1 px-3 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>종료일</span>
              <span className="text-[15px] font-bold" style={{ color: '#0F172A' }}>2026. 04. 05</span>
            </div>
          </div>
        </div>

        {/* Day of week */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>행사 요일</span>
          <div className="flex gap-1.5">
            {DAYS.map(d => (
              <button key={d} onClick={() => toggleDay(d)}
                      className="flex-1 h-10 rounded-xl text-[12px] font-bold transition-colors"
                      style={{
                        backgroundColor: selectedDays.includes(d) ? '#2563EB' : '#F1F5F9',
                        color: selectedDays.includes(d) ? '#FFFFFF' : '#64748B',
                      }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time range */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>행사 시간</span>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col gap-1 px-3 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>시작 시간</span>
              <span className="text-[15px] font-bold" style={{ color: allDay ? '#CBD5E1' : '#0F172A' }}>10:00 AM</span>
            </div>
            <span className="text-[16px]" style={{ color: '#94A3B8' }}>~</span>
            <div className="flex-1 flex flex-col gap-1 px-3 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>종료 시간</span>
              <span className="text-[15px] font-bold" style={{ color: allDay ? '#CBD5E1' : '#0F172A' }}>11:00 PM</span>
            </div>
          </div>
          <button className="flex items-center justify-between px-1"
                  onClick={() => setAllDay(v => !v)}>
            <span className="text-[12px] font-semibold" style={{ color: '#475569' }}>종일 행사</span>
            <div className="flex items-center h-6 w-11 rounded-full px-0.5 transition-colors"
                 style={{ backgroundColor: allDay ? '#2563EB' : '#E2E8F0', justifyContent: allDay ? 'flex-end' : 'flex-start' }}>
              <div className="w-5 h-5 rounded-full bg-white" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3" style={{ backgroundColor: '#F8FAFC' }}>
        <button onClick={() => navigate('event-condition')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#D97706' }}>
          다음 단계 →
        </button>
      </div>
    </div>
  )
}

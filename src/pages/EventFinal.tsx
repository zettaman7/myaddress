import { Page } from '../App'

interface Props { navigate: (to: Page) => void }

export default function EventFinal({ navigate }: Props) {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Navy header */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="flex items-center px-5 h-[54px]">
          <span className="text-[15px] font-semibold text-white">9:41</span>
          <div className="flex-1" />
          <span className="text-[12px] text-white">▲ WiFi 🔋</span>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <button onClick={() => navigate('event-condition')}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                  style={{ color: '#1E3A5F' }}>←</button>
          <span className="text-[12px] font-semibold" style={{ color: '#FCD34D' }}>행사 등록  4 / 4 단계</span>
        </div>
      </div>

      {/* Progress bar full */}
      <div className="flex-shrink-0 h-1 w-full" style={{ backgroundColor: '#D97706' }} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>행사 내용을 확인해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>등록 전 내용을 한번 더 확인해주세요</p>
        </div>

        {/* Alias ref */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
            ✓ @강남구 넓고 빠른 게임아지트  ·  강남 PC프라자
          </span>
        </div>

        {/* Navy event preview card */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl" style={{ backgroundColor: '#1E3A5F' }}>
          <span className="inline-flex self-start px-2 py-1 rounded-lg text-[11px] font-bold text-white"
                style={{ backgroundColor: '#D97706' }}>할인행사</span>
          <span className="text-[17px] font-extrabold text-white">월드컵 응원 특별 할인 행사</span>
          <span className="text-[11px]" style={{ color: '#93C5FD' }}>@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자</span>
          <div className="h-px" style={{ backgroundColor: '#2D4F7A' }} />
          {[
            { icon: '📅', label: '기간', value: '2026.03.25 ~ 04.05 (월~금)' },
            { icon: '⏰', label: '시간', value: '10:00 AM ~ 11:00 PM' },
            { icon: '🎁', label: '혜택', value: '전체 회원 20% 할인 (최소 2시간)' },
            { icon: '👥', label: '대상', value: '전체 회원' },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[12px] flex-shrink-0">{row.icon}</span>
              <span className="text-[11px] font-semibold w-8 flex-shrink-0" style={{ color: '#93C5FD' }}>{row.label}</span>
              <span className="text-[12px] text-white">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-2xl" style={{ backgroundColor: '#EFF6FF' }}>
          <span>ℹ️</span>
          <span className="text-[11px]" style={{ color: '#2563EB' }}>
            행사 등록 후 24시간 이내 취소 가능합니다.{'\n'}
            등록된 행사는 마이페이지에서 관리할 수 있습니다.
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3" style={{ backgroundColor: '#F8FAFC' }}>
        <button onClick={() => navigate('excel')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#059669' }}>
          ✓ 행사 등록 완료
        </button>
      </div>
    </div>
  )
}

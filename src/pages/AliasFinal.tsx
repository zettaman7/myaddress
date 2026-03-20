import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  aliasReturnPage?: Page
  setEventReturnPage?: (p: Page) => void
  setEventAliasName?: (name: string) => void
}

export default function AliasFinal({ navigate, aliasReturnPage = 'home', setEventReturnPage, setEventAliasName }: Props) {
  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* Status bar spacer */}
      <div className="h-[44px] sm:h-[54px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }} />

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 h-[64px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <button onClick={() => navigate('alias-detail')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                style={{ color: '#1E3A5F' }}>←</button>
        <span className="text-[13px] font-semibold" style={{ color: '#FCD34D' }}>별칭 등록 4 / 4 단계</span>
        <div className="flex-1" />
        <button onClick={() => navigate(aliasReturnPage)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#CBD5E1' }}>✕</button>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-1" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full" style={{ width: '100%', backgroundColor: '#059669' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Heading */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>최종 확인해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>등록 전 내용을 한번 더 확인해주세요</p>
        </div>

        {/* Navy preview card */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl" style={{ backgroundColor: '#1E3A5F' }}>
          <span className="text-[18px] font-extrabold text-white">@강남구 넓고 빠른 게임아지트</span>
          <span className="text-[13px] font-semibold" style={{ color: '#93C5FD' }}>강남 PC프라자</span>
          <span className="text-[12px]" style={{ color: '#93C5FD' }}>📍 서울 강남구 테헤란로 152, 지하 1층</span>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl"
             style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          {[
            { label: '지역', value: '서울특별시 · 강남구' },
            { label: '해시태그', value: '#24시간영업 #주차가능 #조용한분위기 #넓은 #빠른 #맛있는 #다양한 #메뉴' },
            { label: '대표메뉴', value: '일반석 ₩1,500/hr  ·  소파석 ₩2,000/hr' },
            { label: '영업시간', value: '24시간' },
            { label: '전화번호', value: '02-1234-5678' },
            { label: '웹사이트', value: 'www.pcbang-gn.co.kr' },
            { label: '사진', value: '2장 등록됨' },
          ].map((row, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[11px] font-semibold w-16 flex-shrink-0 pt-0.5" style={{ color: '#94A3B8' }}>{row.label}</span>
              <span className="text-[12px] flex-1 leading-relaxed" style={{ color: '#0F172A' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-2xl" style={{ backgroundColor: '#EFF6FF' }}>
          <span>ℹ️</span>
          <span className="text-[11px]" style={{ color: '#2563EB' }}>
            등록된 별칭은 심사 후 24시간 이내 활성화됩니다.{'\n'}허위 정보 등록 시 계정이 제한될 수 있습니다.
          </span>
        </div>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3 flex flex-col gap-3">
        <button onClick={() => navigate('mypage')}
                className="w-full h-12 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#059669' }}>
          ✓ 등록 완료
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }} />
          <span className="text-[11px]" style={{ color: '#94A3B8' }}>또는</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }} />
        </div>

        <button onClick={() => {
                  setEventReturnPage?.('alias-final')
                  setEventAliasName?.('@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자')
                  navigate('event')
                }}
                className="w-full h-12 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#D97706' }}>
          🎉 행사 등록하기 →
        </button>
      </div>
    </div>
  )
}

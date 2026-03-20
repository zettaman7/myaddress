import { Page } from '../App'
import TabBar from '../components/TabBar'
import { sharePlace } from '../utils/share'

interface Props {
  navigate: (to: Page) => void
  setAliasEditReturn: (v: 'detail' | 'mypage') => void
}

const stats = [
  { value: '3', label: '영구 별칭', sub: '무료 3개 사용중', valueColor: '#2563EB', subColor: '#94A3B8' },
  { value: '1', label: '임시 별칭', sub: 'D-2 만료 예정', valueColor: '#D97706', subColor: '#D97706' },
  { value: '247', label: '총 공유 횟수', sub: '이번 달 +38', valueColor: '#059669', subColor: '#059669' },
]

const aliases = [
  {
    name: '@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자',
    alias: '강남구 넓고 빠른 게임아지트',
    placeName: '강남 PC프라자',
    address: '서울 강남구 테헤란로 152, 지하 1층',
    badges: [
      { label: '신규등록', bg: '#D1FAE5', text: '#059669' },
      { label: '영구', bg: '#EFF6FF', text: '#2563EB' },
    ],
    actions: [
      { label: '편집', bg: '#F1F5F9', text: '#475569', isEdit: true },
      { label: '공유', bg: '#EFF6FF', text: '#2563EB', isEdit: false },
    ],
    cardBg: '#FFFFFF',
    cardBorder: '#F1F5F9',
  },
  {
    name: '@xmas_party2025  ·  파티룸홍대@party_hd',
    alias: 'xmas_party2025',
    placeName: '파티룸홍대',
    address: '서울 마포구 와우산로 17, 2층',
    badges: [
      { label: 'D-2 만료', bg: '#FEF3C7', text: '#D97706' },
    ],
    actions: [
      { label: '연장', bg: '#FEF3C7', text: '#D97706' },
      { label: '공유', bg: '#EFF6FF', text: '#2563EB' },
    ],
    cardBg: '#FFFBEB',
    cardBorder: '#FEF3C7',
  },
]

export default function MyPage({ navigate, setAliasEditReturn }: Props) {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center px-5 bg-white border-b border-slate-100" style={{ height: 56 }}>
        <span className="text-lg font-bold text-slate-900">마이페이지</span>
        <div className="flex-1" />
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#F1F5F9' }}>
          ⚙
        </button>
      </div>

      {/* Scroll content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {/* Profile card */}
        <div className="flex flex-col gap-2.5 px-4 py-5 rounded-[20px] bg-white">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2563EB' }}>
            <span className="text-2xl font-black text-white">홍</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[17px] font-bold text-slate-900">홍길동</span>
            <span className="text-xs text-slate-400">hong@myaddress.kr</span>
          </div>
          <span
            className="inline-flex self-start px-2.5 py-1 rounded-[10px] text-[11px] font-semibold"
            style={{ backgroundColor: '#D1FAE5', color: '#059669' }}
          >
            B2C 일반회원
          </span>
        </div>

        {/* Stats grid */}
        <div className="flex gap-2">
          {stats.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col gap-1 px-3.5 py-4 rounded-[16px] bg-white">
              <span className="text-2xl font-extrabold" style={{ color: s.valueColor }}>{s.value}</span>
              <span className="text-[11px] text-slate-500">{s.label}</span>
              <span className="text-[10px]" style={{ color: s.subColor }}>{s.sub}</span>
            </div>
          ))}
        </div>

        {/* Aliases section */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold text-slate-900">등록된 별칭주소</span>
            <button className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold" style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
              전체 보기
            </button>
          </div>

          {aliases.map((a, i) => (
            <div key={i}
              className="flex flex-col gap-2 p-3.5 rounded-[16px] border"
              style={{ backgroundColor: a.cardBg, borderColor: a.cardBorder }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <button
                    onClick={() => navigate('detail')}
                    className="text-[13px] font-bold text-slate-900 text-left truncate hover:text-primary transition-colors"
                  >
                    {a.name}
                  </button>
                  <span className="text-[11px] text-slate-400 truncate">{a.address}</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {a.actions.map((act, j) => (
                    <button
                      key={j}
                      onClick={() => {
                        if (act.isEdit) { setAliasEditReturn('mypage'); navigate('alias-edit') }
                        else sharePlace({ alias: a.alias, name: a.placeName, address: a.address })
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                      style={{ backgroundColor: act.bg, color: act.text }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {a.badges.map((b, j) => (
                  <span
                    key={j}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                    style={{ backgroundColor: b.bg, color: b.text }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade banner */}
        <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px]" style={{ backgroundColor: '#1E3A5F' }}>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-sm font-bold text-white">별칭 슬롯을 더 추가하고 싶으신가요?</span>
            <span className="text-xs" style={{ color: '#93C5FD' }}>구독 플랜으로 무제한 별칭 이용</span>
          </div>
          <button className="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold" style={{ color: '#1E3A5F' }}>
            업그레이드
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar activePage="mypage" navigate={navigate} />
    </div>
  )
}

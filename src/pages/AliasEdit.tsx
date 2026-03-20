import { useState } from 'react'
import { Page } from '../App'

interface Props {
  navigate: (to: Page) => void
  returnTo: 'detail' | 'mypage'
  setEventReturnPage?: (p: Page) => void
  setEventAliasName?: (name: string) => void
}

const ALL_TAGS = ['#24시간영업', '#주차가능', '#조용한분위기', '#넓음', '#빠른', '#고사양', '#금연', '#학생할인']
const INITIAL_ACTIVE = ['#24시간영업', '#주차가능', '#넓음', '#빠른']

interface InfoRow { label: string; value: string; icon: string }

const INITIAL_INFO: InfoRow[] = [
  { label: '영업시간', value: '24시간', icon: '🕐' },
  { label: '전화번호', value: '02-1234-5678', icon: '📞' },
  { label: '웹사이트', value: 'www.pcbang-gn.co.kr', icon: '🌐' },
]

export default function AliasEdit({ navigate, returnTo, setEventReturnPage, setEventAliasName }: Props) {
  const [aliasInput, setAliasInput] = useState('넓고 빠른 게임아지트')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set(INITIAL_ACTIVE))
  const [info, setInfo] = useState<InfoRow[]>(INITIAL_INFO)
  const [editingIdx, setEditingIdx] = useState<number | null>(null)

  const toggleTag = (tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Status bar spacer */}
      <div className="h-[44px] sm:h-[54px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }} />

      {/* Nav bar (navy) */}
      <div className="flex items-center gap-3 px-5 h-[64px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <button
          onClick={() => navigate(returnTo)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
          style={{ color: '#1E3A5F' }}
        >←</button>
        <span className="text-[13px] font-semibold" style={{ color: '#FCD34D' }}>별칭 편집</span>
      </div>

      {/* Progress bar — full green */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-1" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full" style={{ width: '100%', backgroundColor: '#059669' }} />
        </div>
      </div>

      {/* Scroll content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4" style={{ scrollbarWidth: 'none' }}>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[20px] font-extrabold" style={{ color: '#0F172A' }}>별칭 정보를 수정해주세요</h1>
          <p className="text-[12px]" style={{ color: '#94A3B8' }}>수정할 항목을 편집한 후 완료해주세요</p>
        </div>

        {/* Place info ref card */}
        <div className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>
            ✓  강남 PC프라자  ·  서울 강남구 테헤란로 152, 지하 1층
          </span>
        </div>

        {/* Alias section */}
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>별칭명</span>
          <div
            className="flex items-center h-[50px] px-4 rounded-xl border-2 gap-1"
            style={{ borderColor: '#2563EB', backgroundColor: '#EFF6FF' }}
          >
            <span className="text-[18px] font-bold flex-shrink-0" style={{ color: '#2563EB' }}>@</span>
            <span className="text-[14px] font-semibold flex-shrink-0" style={{ color: '#94A3B8' }}>강남구 </span>
            <input
              value={aliasInput}
              onChange={e => setAliasInput(e.target.value)}
              className="flex-1 text-[14px] font-semibold outline-none bg-transparent"
              style={{ color: '#0F172A' }}
            />
          </div>
          <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>✓ 사용 가능한 별칭입니다!</span>
        </div>

        {/* Hashtag section */}
        <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>해시태그</span>
          <div className="flex gap-2 flex-wrap">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
                style={{
                  backgroundColor: activeTags.has(tag) ? '#EFF6FF' : '#F1F5F9',
                  color: activeTags.has(tag) ? '#2563EB' : '#64748B',
                  border: activeTags.has(tag) ? '1px solid #BFDBFE' : '1px solid transparent',
                }}
              >
                {tag}
              </button>
            ))}
            <button
              className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ backgroundColor: '#F1F5F9', color: '#94A3B8', border: '1px dashed #CBD5E1' }}
            >
              + 태그 추가
            </button>
          </div>
        </div>

        {/* Business info section */}
        <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-white">
          <span className="text-[12px] font-bold" style={{ color: '#374151' }}>사업장 정보</span>
          {info.map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[14px] flex-shrink-0">{row.icon}</span>
              <span className="text-[11px] font-semibold w-14 flex-shrink-0" style={{ color: '#94A3B8' }}>{row.label}</span>
              {editingIdx === i ? (
                <input
                  autoFocus
                  value={row.value}
                  onChange={e => {
                    const next = [...info]
                    next[i] = { ...next[i], value: e.target.value }
                    setInfo(next)
                  }}
                  onBlur={() => setEditingIdx(null)}
                  className="flex-1 text-[12px] px-2 py-1 rounded-lg outline-none"
                  style={{ backgroundColor: '#EFF6FF', color: '#0F172A', border: '1px solid #BFDBFE' }}
                />
              ) : (
                <span className="flex-1 text-[12px]" style={{ color: '#0F172A' }}>{row.value}</span>
              )}
              <button
                onClick={() => setEditingIdx(editingIdx === i ? null : i)}
                className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
              >
                수정
              </button>
            </div>
          ))}
        </div>

        <div className="h-2" />
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3 bg-white flex flex-col gap-2">
        <button
          onClick={() => navigate(returnTo)}
          className="w-full h-[50px] rounded-2xl flex items-center justify-center text-[15px] font-bold text-white gap-2"
          style={{ backgroundColor: '#059669' }}
        >
          ✓  수정 완료
        </button>
        <button
          onClick={() => {
            setEventReturnPage?.('alias-edit')
            setEventAliasName?.('@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자')
            navigate('event')
          }}
          className="w-full h-[44px] rounded-2xl flex items-center justify-center text-[13px] font-bold gap-1.5"
          style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}
        >
          🎉 행사 등록하기
        </button>
      </div>
    </div>
  )
}

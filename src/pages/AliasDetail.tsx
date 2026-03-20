import { useState } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void; aliasReturnPage?: Page }

const ALL_TAGS = ['#24시간영업', '#주차가능', '#조용한분위기', '#넓은', '#빠른', '#맛있는', '#다양한', '#메뉴']

const mockPhotos = [
  { bg: 'linear-gradient(135deg, #0f1c2e 0%, #1a2f4a 100%)', emoji: '💻' },
  { bg: 'linear-gradient(135deg, #14532d 0%, #166534 100%)', emoji: '🍜' },
]

export default function AliasDetail({ navigate, aliasReturnPage = 'home' }: Props) {
  const [selectedTags, setSelectedTags] = useState(ALL_TAGS.slice(0, 3))
  const toggleTag = (t: string) =>
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center px-5 h-[54px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <span className="text-[15px] font-semibold text-white">9:41</span>
        <div className="flex-1" />
        <span className="text-[12px] text-white">▲ WiFi 🔋</span>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 h-[64px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <button onClick={() => navigate('register')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                style={{ color: '#1E3A5F' }}>←</button>
        <span className="text-[13px] font-semibold" style={{ color: '#FCD34D' }}>별칭 등록 3 / 4 단계</span>
        <div className="flex-1" />
        <button onClick={() => navigate(aliasReturnPage)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#CBD5E1' }}>✕</button>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-1" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full" style={{ width: '75%', backgroundColor: '#2563EB' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[20px] font-extrabold" style={{ color: '#0F172A' }}>상세 정보를 입력해주세요</h1>
        </div>

        {/* Address confirm */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>
            ✓ 강남 PC프라자  ·  서울 강남구 테헤란로 152, 지하 1층
          </span>
        </div>

        {/* Hashtags */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>해시태그 (최대 10개)</span>
          <div className="flex gap-2 flex-wrap">
            {ALL_TAGS.map(tag => {
              const active = selectedTags.includes(tag)
              return (
                <button key={tag} onClick={() => toggleTag(tag)}
                        className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
                        style={{
                          backgroundColor: active ? '#EFF6FF' : '#F1F5F9',
                          color: active ? '#2563EB' : '#64748B',
                          border: active ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                        }}>
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>대표 메뉴</span>
          {[
            { name: '일반석', price: '₩1,500/hr' },
            { name: '소파석', price: '₩2,000/hr' },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[13px] font-semibold" style={{ color: '#0F172A' }}>{m.name}</span>
              <span className="text-[13px] font-bold" style={{ color: '#2563EB' }}>{m.price}</span>
            </div>
          ))}
        </div>

        {/* Photo upload */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold" style={{ color: '#374151' }}>사진 등록</span>
            <span className="text-[11px]" style={{ color: '#94A3B8' }}>{mockPhotos.length} / 10</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed gap-1"
                    style={{ width: 80, height: 80, borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' }}>
              <span style={{ fontSize: 22 }}>📷</span>
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>사진 추가</span>
            </button>
            {mockPhotos.map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                   style={{ width: 80, height: 80, background: p.bg }}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business info */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>사업장 정보</span>
          {[
            { label: '영업시간', value: '24시간', icon: '🕐' },
            { label: '전화번호', value: '02-1234-5678', icon: '📞' },
            { label: '웹사이트', value: 'www.pcbang-gn.co.kr', icon: '🌐' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-[11px] font-semibold w-16 flex-shrink-0" style={{ color: '#94A3B8' }}>{item.label}</span>
              <span className="text-[12px] font-semibold flex-1" style={{ color: '#0F172A' }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3">
        <button onClick={() => navigate('alias-final')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#2563EB' }}>
          다음 단계 · 최종 확인 →
        </button>
      </div>
    </div>
  )
}

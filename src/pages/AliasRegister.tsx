import { useState } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void; aliasReturnPage?: Page }

export default function AliasRegister({ navigate, aliasReturnPage = 'home' }: Props) {
  const [aliasInput, setAliasInput] = useState('넓고 빠른 게임아지트')
  const autoDistrict = '강남구'
  const fullAlias = `@${autoDistrict} ${aliasInput}`
  const aiSuggestions = ['@강남구_게임아지트1', '@강남구_빠른게임아지트']

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 h-[64px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <button onClick={() => navigate('alias-confirm')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white"
                style={{ color: '#1E3A5F' }}>←</button>
        <span className="text-[13px] font-semibold" style={{ color: '#FCD34D' }}>별칭 등록 2 / 4 단계</span>
        <div className="flex-1" />
        <button onClick={() => navigate(aliasReturnPage)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#CBD5E1' }}>✕</button>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="h-1" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full" style={{ width: '50%', backgroundColor: '#2563EB' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Heading */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[22px] font-extrabold" style={{ color: '#0F172A' }}>별칭을 설정해주세요</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>기억하기 쉽고 찾기 쉬운 별칭을 만들어보세요</p>
        </div>

        {/* Address confirm */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>
            ✓ 강남 PC프라자  ·  서울 강남구 테헤란로 152, 지하 1층
          </span>
        </div>

        {/* Auto district */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold" style={{ color: '#374151' }}>지역구 (자동 설정)</span>
            <span className="text-[11px]" style={{ color: '#94A3B8' }}>원상호 주소 기반</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>🔒 강남구</span>
            <span className="text-[11px]" style={{ color: '#94A3B8' }}>자동 설정됨</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#1E3A5F' }}>
            <div className="flex-1">
              <div className="text-[11px] font-bold text-white">추가 지역구 등록</div>
              <div className="text-[10px]" style={{ color: '#93C5FD' }}>유료 플랜으로 여러 지역구에 등록 가능</div>
            </div>
            <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-white flex-shrink-0"
                    style={{ color: '#1E3A5F' }}>업그레이드</button>
          </div>
        </div>

        {/* Alias input */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>별칭명</span>
          <div className="flex items-center h-[52px] px-4 rounded-xl border-2 gap-1"
               style={{ borderColor: '#2563EB', backgroundColor: '#FFFFFF' }}>
            <span className="text-[18px] font-bold flex-shrink-0" style={{ color: '#2563EB' }}>@</span>
            <span className="text-[14px] font-semibold flex-shrink-0" style={{ color: '#94A3B8' }}>{autoDistrict} </span>
            <input
              value={aliasInput}
              onChange={e => setAliasInput(e.target.value)}
              className="flex-1 text-[14px] font-semibold outline-none bg-transparent"
              style={{ color: '#0F172A' }}
            />
          </div>
          <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>✓ 사용 가능한 별칭입니다!</span>
        </div>

        {/* AI suggestions */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold" style={{ color: '#94A3B8' }}>✦ AI 추천 별칭</span>
          <div className="flex gap-2 flex-wrap">
            {aiSuggestions.map((s, i) => (
              <button key={i}
                      onClick={() => setAliasInput(s.replace(`@${autoDistrict}_`, ''))}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
                      style={{ backgroundColor: '#F1F5F9', color: '#374151', border: '1px solid #E2E8F0' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-semibold" style={{ color: '#94A3B8' }}>미리보기</span>
          <div className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="text-[14px] font-extrabold" style={{ color: '#2563EB' }}>{fullAlias}</span>
            <span className="text-[11px] font-semibold" style={{ color: '#64748B' }}>원상호: 강남 PC프라자</span>
            <span className="text-[10px]" style={{ color: '#94A3B8' }}>서울 강남구 테헤란로 152, 지하 1층</span>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3">
        <button onClick={() => navigate('alias-detail')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#2563EB' }}>
          다음 단계 · 상세 정보 →
        </button>
      </div>
    </div>
  )
}

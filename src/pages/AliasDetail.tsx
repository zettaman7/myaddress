import { useState, useRef } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void; aliasReturnPage?: Page }

const PRESET_TAGS = ['#24시간영업', '#주차가능', '#조용한분위기', '#넓은', '#빠른', '#고사양PC', '#금연', '#학생할인']

interface MenuItem { id: number; name: string; price: string }
interface PhotoItem { id: number; url: string; file?: File }

let nextId = 1

export default function AliasDetail({ navigate, aliasReturnPage = 'home' }: Props) {
  // ── 해시태그
  const [selectedTags, setSelectedTags] = useState<string[]>(['#24시간영업', '#주차가능', '#넓은'])
  const [customTagInput, setCustomTagInput] = useState('')

  const toggleTag = (t: string) =>
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : prev.length < 10 ? [...prev, t] : prev)

  const addCustomTag = () => {
    const tag = customTagInput.trim().startsWith('#') ? customTagInput.trim() : `#${customTagInput.trim()}`
    if (customTagInput.trim() && !selectedTags.includes(tag) && selectedTags.length < 10) {
      setSelectedTags(prev => [...prev, tag])
      setCustomTagInput('')
    }
  }

  // ── 대표 메뉴
  const [menus, setMenus] = useState<MenuItem[]>([
    { id: nextId++, name: '일반석', price: '1,500' },
    { id: nextId++, name: '소파석', price: '2,000' },
  ])

  const updateMenu = (id: number, field: 'name' | 'price', value: string) =>
    setMenus(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))

  const addMenu = () => {
    if (menus.length < 8) setMenus(prev => [...prev, { id: nextId++, name: '', price: '' }])
  }

  const removeMenu = (id: number) => setMenus(prev => prev.filter(m => m.id !== id))

  // ── 사진
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const remaining = 10 - photos.length
    files.slice(0, remaining).forEach(file => {
      const url = URL.createObjectURL(file)
      setPhotos(prev => [...prev, { id: nextId++, url, file }])
    })
    e.target.value = ''
  }

  const removePhoto = (id: number) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id)
      if (photo) URL.revokeObjectURL(photo.url)
      return prev.filter(p => p.id !== id)
    })
  }

  // ── 사업장 정보
  const [bizInfo, setBizInfo] = useState({
    hours: '24시간',
    phone: '02-1234-5678',
    website: 'www.pcbang-gn.co.kr',
  })

  const updateBiz = (field: keyof typeof bizInfo, value: string) =>
    setBizInfo(prev => ({ ...prev, [field]: value }))

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* Status bar spacer */}
      <div className="h-[44px] sm:h-[54px] flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }} />

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

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5 pt-4" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1">
          <h1 className="text-[20px] font-extrabold" style={{ color: '#0F172A' }}>상세 정보를 입력해주세요</h1>
          <p className="text-[12px]" style={{ color: '#94A3B8' }}>* 표시 항목은 필수입니다</p>
        </div>

        {/* Address confirm */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <span className="text-[11px] font-semibold" style={{ color: '#059669' }}>
            ✓ 강남 PC프라자  ·  서울 강남구 테헤란로 152, 지하 1층
          </span>
        </div>

        {/* ── 해시태그 */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold" style={{ color: '#374151' }}>
              해시태그 <span style={{ color: '#EF4444' }}>*</span>
            </span>
            <span className="text-[11px]" style={{ color: selectedTags.length >= 10 ? '#EF4444' : '#94A3B8' }}>
              {selectedTags.length} / 10
            </span>
          </div>

          {/* 프리셋 태그 */}
          <div className="flex gap-2 flex-wrap">
            {PRESET_TAGS.map(tag => {
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

          {/* 선택된 커스텀 태그 */}
          {selectedTags.filter(t => !PRESET_TAGS.includes(t)).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedTags.filter(t => !PRESET_TAGS.includes(t)).map(tag => (
                <span key={tag}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                      style={{ backgroundColor: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}>
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="text-[10px] leading-none" style={{ color: '#93C5FD' }}>✕</button>
                </span>
              ))}
            </div>
          )}

          {/* 직접 입력 */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center h-10 px-3 rounded-xl gap-1"
                 style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span className="text-[13px] font-bold flex-shrink-0" style={{ color: '#94A3B8' }}>#</span>
              <input
                value={customTagInput.startsWith('#') ? customTagInput.slice(1) : customTagInput}
                onChange={e => setCustomTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomTag()}
                placeholder="직접 입력"
                className="flex-1 text-[13px] outline-none bg-transparent"
                style={{ color: '#0F172A' }}
                maxLength={12}
              />
            </div>
            <button onClick={addCustomTag}
                    className="px-3 h-10 rounded-xl text-[12px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: selectedTags.length >= 10 ? '#CBD5E1' : '#2563EB' }}
                    disabled={selectedTags.length >= 10}>
              추가
            </button>
          </div>
        </div>

        {/* ── 대표 메뉴 */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>대표 메뉴</span>

          {menus.map(m => (
            <div key={m.id} className="flex items-center gap-2">
              <input
                value={m.name}
                onChange={e => updateMenu(m.id, 'name', e.target.value)}
                placeholder="메뉴명 (예: 일반석)"
                className="flex-1 h-11 px-3 rounded-xl text-[13px] outline-none"
                style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
              <div className="flex items-center h-11 px-3 rounded-xl gap-1 flex-shrink-0"
                   style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', width: 110 }}>
                <span className="text-[12px] font-bold flex-shrink-0" style={{ color: '#94A3B8' }}>₩</span>
                <input
                  value={m.price}
                  onChange={e => updateMenu(m.id, 'price', e.target.value.replace(/[^0-9,]/g, ''))}
                  placeholder="가격"
                  className="flex-1 text-[13px] outline-none bg-transparent min-w-0"
                  style={{ color: '#0F172A' }}
                />
                <span className="text-[10px] flex-shrink-0" style={{ color: '#94A3B8' }}>/hr</span>
              </div>
              <button onClick={() => removeMenu(m.id)}
                      className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl text-[14px]"
                      style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>✕</button>
            </div>
          ))}

          {menus.length < 8 && (
            <button onClick={addMenu}
                    className="flex items-center justify-center gap-1.5 h-11 rounded-xl text-[13px] font-semibold border-2 border-dashed"
                    style={{ borderColor: '#CBD5E1', color: '#94A3B8', backgroundColor: '#F8FAFC' }}>
              + 메뉴 추가
            </button>
          )}
        </div>

        {/* ── 사진 등록 */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold" style={{ color: '#374151' }}>사진 등록</span>
            <span className="text-[11px]" style={{ color: photos.length >= 10 ? '#EF4444' : '#94A3B8' }}>
              {photos.length} / 10
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {photos.length < 10 && (
              <>
                <button onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed gap-1"
                        style={{ width: 80, height: 80, borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' }}>
                  <span style={{ fontSize: 22 }}>📷</span>
                  <span className="text-[9px]" style={{ color: '#94A3B8' }}>사진 추가</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple
                       className="hidden" onChange={handleFileSelect} />
              </>
            )}
            {photos.map(p => (
              <div key={p.id} className="relative rounded-xl overflow-hidden flex-shrink-0"
                   style={{ width: 80, height: 80 }}>
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removePhoto(p.id)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}>✕</button>
              </div>
            ))}
          </div>
          <p className="text-[11px]" style={{ color: '#94A3B8' }}>JPG, PNG 가능 · 최대 10장</p>
        </div>

        {/* ── 사업장 정보 */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold" style={{ color: '#374151' }}>
            사업장 정보 <span style={{ color: '#EF4444' }}>*</span>
          </span>

          {/* 영업시간 */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="flex-shrink-0 text-[16px]">🕐</span>
            <span className="text-[11px] font-semibold w-14 flex-shrink-0" style={{ color: '#94A3B8' }}>영업시간</span>
            <input
              value={bizInfo.hours}
              onChange={e => updateBiz('hours', e.target.value)}
              placeholder="예: 24시간, 09:00~22:00"
              className="flex-1 text-[13px] font-semibold outline-none bg-transparent"
              style={{ color: '#0F172A' }}
            />
          </div>

          {/* 전화번호 */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="flex-shrink-0 text-[16px]">📞</span>
            <span className="text-[11px] font-semibold w-14 flex-shrink-0" style={{ color: '#94A3B8' }}>전화번호</span>
            <input
              value={bizInfo.phone}
              onChange={e => updateBiz('phone', e.target.value)}
              placeholder="예: 02-1234-5678"
              className="flex-1 text-[13px] font-semibold outline-none bg-transparent"
              style={{ color: '#0F172A' }}
              type="tel"
              inputMode="tel"
            />
          </div>

          {/* 웹사이트 */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
               style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="flex-shrink-0 text-[16px]">🌐</span>
            <span className="text-[11px] font-semibold w-14 flex-shrink-0" style={{ color: '#94A3B8' }}>웹사이트</span>
            <input
              value={bizInfo.website}
              onChange={e => updateBiz('website', e.target.value)}
              placeholder="예: www.mysite.co.kr (선택)"
              className="flex-1 text-[13px] font-semibold outline-none bg-transparent"
              style={{ color: '#0F172A' }}
              type="url"
              inputMode="url"
            />
          </div>
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

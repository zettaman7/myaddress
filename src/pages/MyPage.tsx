import { useState } from 'react'
import { Page } from '../App'
import TabBar from '../components/TabBar'
import { sharePlace } from '../utils/share'

interface Props {
  navigate: (to: Page) => void
  setAliasEditReturn: (v: 'detail' | 'mypage') => void
  setEventReturnPage?: (p: Page) => void
  setEventAliasName?: (name: string) => void
}

interface AliasEvent {
  id: number
  type: '할인행사' | '무료증정' | '포인트적립' | '기타'
  name: string
  startDate: string
  endDate: string
  dday: number
  status?: 'active' | 'ended'
}

const EVENT_TYPE_STYLE: Record<string, { bg: string; text: string }> = {
  '할인행사':   { bg: '#FEF3C7', text: '#D97706' },
  '무료증정':   { bg: '#D1FAE5', text: '#059669' },
  '포인트적립': { bg: '#EFF6FF', text: '#2563EB' },
  '기타':       { bg: '#F1F5F9', text: '#64748B' },
}

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
    events: [
      { id: 1, type: '무료증정' as const, name: '무료 음료 1잔 증정',        startDate: '03.20', endDate: '03.31', dday: 6,  status: 'active' as const },
      { id: 2, type: '할인행사' as const, name: '월드컵 응원 특별 할인 행사', startDate: '03.25', endDate: '04.05', dday: 11, status: 'active' as const },
      { id: 3, type: '할인행사' as const, name: '설날 특별 이벤트',          startDate: '01.29', endDate: '02.05', dday: 0,  status: 'ended'  as const },
      { id: 4, type: '무료증정' as const, name: '신년 음료 무료 증정',        startDate: '01.01', endDate: '01.15', dday: 0,  status: 'ended'  as const },
    ] as AliasEvent[],
  },
  {
    name: '@xmas_party2025  ·  파티룸홍대',
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
    events: [] as AliasEvent[],
  },
]

// 진행중 행사 플랫 리스트 (별칭 정보 포함)
const allEvents = aliases.flatMap(a =>
  a.events
    .filter(ev => ev.status !== 'ended')
    .map(ev => ({ ...ev, aliasName: a.alias, placeName: a.placeName, aliasFullName: a.name }))
).sort((a, b) => a.dday - b.dday)

// 종료된 행사 플랫 리스트
const endedEvents = aliases.flatMap(a =>
  a.events
    .filter(ev => ev.status === 'ended')
    .map(ev => ({ ...ev, aliasName: a.alias, placeName: a.placeName, aliasFullName: a.name }))
)

const totalActiveEvents = allEvents.length

const stats = [
  { value: '3',                       label: '별창',      sub: '무료 3개 사용중',                       valueColor: '#2563EB', subColor: '#94A3B8' },
  { value: String(totalActiveEvents), label: '행사',      sub: `${totalActiveEvents}건 이벤트중`,       valueColor: '#D97706', subColor: '#D97706' },
  { value: '247',                     label: '공유 횟수', sub: '지난 1달 누적',                         valueColor: '#0F172A', subColor: '#94A3B8' },
]

export default function MyPage({ navigate, setAliasEditReturn, setEventReturnPage, setEventAliasName }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [endedDeletingId, setEndedDeletingId] = useState<number | null>(null)
  const [showEndedEvents, setShowEndedEvents] = useState(false)

  const goToEvent = (aliasFullName: string) => {
    setEventReturnPage?.('mypage')
    setEventAliasName?.(aliasFullName)
    navigate('event')
  }

  const goToEventEdit = (aliasFullName: string) => {
    setEventReturnPage?.('mypage')
    setEventAliasName?.(aliasFullName)
    navigate('event')  // 실제 구현 시 pre-filled edit 페이지로 연결
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Status bar spacer */}
      <div className="h-[44px] sm:h-[54px] flex-shrink-0 bg-white" />

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
          <span className="inline-flex self-start px-2.5 py-1 rounded-[10px] text-[11px] font-semibold"
                style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
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

        {/* ── 등록된 별칭주소 ── */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold text-slate-900">등록된 별칭주소</span>
            <button className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                    style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
              전체 보기
            </button>
          </div>

          {aliases.map((a, i) => {
            const activeEvents = a.events.filter(ev => ev.status !== 'ended')
            const eventCount = activeEvents.length
            // 가장 임박한 행사 (dday 오름차순 첫 번째)
            const primaryEvent = eventCount > 0
              ? [...activeEvents].sort((x, y) => x.dday - y.dday)[0]
              : null
            const extraCount = eventCount - 1

            // 버튼 레이블 & 스타일 — 항상 "추가" 역할, 수정/삭제는 행사 현황 섹션에서
            const eventBtn =
              eventCount === 0
                ? { label: '🎉 행사 등록', bg: '#FEF3C7', text: '#D97706' }
                : { label: '➕ 행사 추가', bg: '#F0FDF4', text: '#059669' }

            return (
              <div key={i}
                   className="flex flex-col gap-2 p-3.5 rounded-[16px] border"
                   style={{ backgroundColor: a.cardBg, borderColor: a.cardBorder }}>

                {/* 상단: 별칭명 + 액션 버튼 */}
                <div className="flex items-start gap-2">
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <button onClick={() => navigate('detail')}
                            className="text-[13px] font-bold text-slate-900 text-left truncate">
                      {a.name}
                    </button>
                    <span className="text-[11px] text-slate-400 truncate">{a.address}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    {a.actions.map((act, j) => (
                      <button key={j}
                              onClick={() => {
                                if (act.isEdit) { setAliasEditReturn('mypage'); navigate('alias-edit') }
                                else sharePlace({ alias: a.alias, name: a.placeName, address: a.address })
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                              style={{ backgroundColor: act.bg, color: act.text }}>
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 행사 요약 패널 (행사 있을 때만) */}
                {primaryEvent && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                       style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold"
                          style={{ backgroundColor: EVENT_TYPE_STYLE[primaryEvent.type].bg, color: EVENT_TYPE_STYLE[primaryEvent.type].text }}>
                      {primaryEvent.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold truncate" style={{ color: '#92400E' }}>{primaryEvent.name}</p>
                      <p className="text-[10px]" style={{ color: '#B45309' }}>
                        📅 {primaryEvent.startDate} ~ {primaryEvent.endDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {extraCount > 0 && (
                        <span className="text-[10px] font-semibold" style={{ color: '#D97706' }}>+{extraCount}개 더</span>
                      )}
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}>
                        D-{primaryEvent.dday}
                      </span>
                    </div>
                  </div>
                )}

                {/* 하단: 뱃지 + 행사 버튼 */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {a.badges.map((b, j) => (
                      <span key={j}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                            style={{ backgroundColor: b.bg, color: b.text }}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => goToEvent(a.name)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex-shrink-0"
                          style={{ backgroundColor: eventBtn.bg, color: eventBtn.text }}>
                    {eventBtn.label}
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        {/* ── 행사 현황 ── */}
        {(allEvents.length > 0 || endedEvents.length > 0) && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-slate-900">행사 현황</span>
                {allEvents.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: '#D97706' }}>
                    {allEvents.length}개 진행중
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {allEvents.map((ev, i) => {
                const typeStyle = EVENT_TYPE_STYLE[ev.type]
                return (
                  <div key={i}
                       className="flex flex-col gap-2.5 p-3.5 rounded-[16px] bg-white"
                       style={{ border: '1px solid #FDE68A' }}>

                    {/* 행사 유형 + 이름 */}
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}>
                        {ev.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold leading-tight" style={{ color: '#0F172A' }}>{ev.name}</p>
                        <p className="text-[11px] mt-0.5 truncate" style={{ color: '#94A3B8' }}>
                          @{ev.aliasName}  ·  {ev.placeName}
                        </p>
                      </div>
                      <span className="flex-shrink-0 px-2 py-1 rounded-lg text-[11px] font-bold text-white"
                            style={{ backgroundColor: ev.dday <= 3 ? '#EF4444' : '#D97706' }}>
                        D-{ev.dday}
                      </span>
                    </div>

                    {/* 기간 + 버튼 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#64748B' }}>
                        <span>📅</span>
                        <span>{ev.startDate} ~ {ev.endDate}</span>
                      </div>
                      {deletingId === ev.id ? (
                        // 삭제 확인 인라인
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold" style={{ color: '#EF4444' }}>삭제할까요?</span>
                          <button onClick={() => setDeletingId(null)}
                                  className="px-2 py-1.5 rounded-lg text-[11px] font-semibold"
                                  style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                            취소
                          </button>
                          <button onClick={() => setDeletingId(null)}
                                  className="px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white"
                                  style={{ backgroundColor: '#EF4444' }}>
                            확인
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => goToEventEdit(ev.aliasFullName)}
                                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                                  style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
                            수정
                          </button>
                          <button onClick={() => setDeletingId(ev.id)}
                                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                                  style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>
                            삭제
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>

            {/* 종료된 행사 — 접힘/펼침 */}
            {endedEvents.length > 0 && (
              <div className="flex flex-col gap-2">
                {/* 토글 헤더 */}
                <button
                  onClick={() => setShowEndedEvents(v => !v)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-[14px]"
                  style={{ backgroundColor: '#F1F5F9' }}
                >
                  <span className="text-[12px] font-semibold" style={{ color: '#64748B' }}>
                    🗂 종료된 행사 {endedEvents.length}건
                  </span>
                  <span className="text-[10px]" style={{ color: '#94A3B8' }}>· 1년 보관</span>
                  <span className="ml-auto text-[12px]" style={{ color: '#94A3B8' }}>
                    {showEndedEvents ? '▴' : '▾'}
                  </span>
                </button>

                {showEndedEvents && (
                  <div className="flex flex-col gap-2">
                    {endedEvents.map((ev, i) => {
                      const typeStyle = EVENT_TYPE_STYLE[ev.type]
                      return (
                        <div key={i}
                             className="flex flex-col gap-2.5 p-3.5 rounded-[16px]"
                             style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', opacity: 0.85 }}>

                          {/* 행사 유형 + 이름 */}
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold"
                                  style={{ backgroundColor: typeStyle.bg, color: typeStyle.text, opacity: 0.6 }}>
                              {ev.type}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold leading-tight" style={{ color: '#64748B' }}>{ev.name}</p>
                              <p className="text-[11px] mt-0.5 truncate" style={{ color: '#94A3B8' }}>
                                @{ev.aliasName}  ·  {ev.placeName}
                              </p>
                            </div>
                            <span className="flex-shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold"
                                  style={{ backgroundColor: '#E2E8F0', color: '#94A3B8' }}>
                              종료
                            </span>
                          </div>

                          {/* 기간 + 버튼 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#94A3B8' }}>
                              <span>📅</span>
                              <span>{ev.startDate} ~ {ev.endDate}</span>
                            </div>
                            {endedDeletingId === ev.id ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-semibold" style={{ color: '#EF4444' }}>삭제할까요?</span>
                                <button onClick={() => setEndedDeletingId(null)}
                                        className="px-2 py-1.5 rounded-lg text-[11px] font-semibold"
                                        style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                                  취소
                                </button>
                                <button onClick={() => setEndedDeletingId(null)}
                                        className="px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white"
                                        style={{ backgroundColor: '#EF4444' }}>
                                  확인
                                </button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button onClick={() => goToEvent(ev.aliasFullName)}
                                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                                  다시 등록
                                </button>
                                <button onClick={() => setEndedDeletingId(ev.id)}
                                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                                        style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>

                          {/* 1년 보관 안내 */}
                          <span className="text-[10px]" style={{ color: '#CBD5E1' }}>
                            자동 삭제 예정: 종료 후 1년
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Upgrade banner */}
        <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px]" style={{ backgroundColor: '#1E3A5F' }}>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-sm font-bold text-white">별칭 슬롯을 더 추가하고 싶으신가요?</span>
            <span className="text-xs" style={{ color: '#93C5FD' }}>구독 플랜으로 무제한 별칭 이용</span>
          </div>
          <button className="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold"
                  style={{ color: '#1E3A5F' }}>
            업그레이드
          </button>
        </div>

      </div>

      {/* Tab bar */}
      <TabBar activePage="mypage" navigate={navigate} />
    </div>
  )
}

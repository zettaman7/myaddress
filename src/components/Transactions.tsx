import { useState } from 'react'

interface Transaction {
  icon: string; name: string; category: string
  date: string; type: '수입' | '지출'; amount: number
}

const allTx: Transaction[] = [
  { icon: '🛒', name: '마트 장보기',   category: '식비', date: '3월 4일',  type: '지출', amount: -87000 },
  { icon: '🚌', name: '교통카드 충전', category: '교통', date: '3월 3일',  type: '지출', amount: -50000 },
  { icon: '💰', name: '3월 급여',      category: '수입', date: '3월 1일',  type: '수입', amount: 3200000 },
  { icon: '🍜', name: '외식비',        category: '식비', date: '3월 2일',  type: '지출', amount: -42000 },
  { icon: '📱', name: '통신비',        category: '통신', date: '3월 1일',  type: '지출', amount: -55000 },
  { icon: '🏠', name: '월세',          category: '주거', date: '2월 28일', type: '지출', amount: -600000 },
  { icon: '☕', name: '카페',          category: '식비', date: '2월 27일', type: '지출', amount: -6500 },
  { icon: '💻', name: '인터넷 요금',   category: '통신', date: '2월 25일', type: '지출', amount: -33000 },
]

function fmt(n: number) {
  const abs = Math.abs(n).toLocaleString('ko-KR')
  return n >= 0 ? `+₩${abs}` : `-₩${abs}`
}

interface TransactionsProps {
  onAddTransaction: () => void
}

export default function Transactions({ onAddTransaction }: TransactionsProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'전체' | '지출' | '수입'>('전체')

  const filtered = allTx.filter(t => {
    const matchSearch = t.name.includes(search) || t.category.includes(search)
    const matchFilter = filter === '전체' || t.type === filter
    return matchSearch && matchFilter
  })

  return (
    <main className="flex-1 overflow-y-auto bg-surface">
      <div className="flex flex-col gap-4 px-5 pt-2 pb-5">

        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="font-grotesk font-bold text-dark text-[22px] flex-1">거래내역</span>
          <button
            onClick={onAddTransaction}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-xl hover:bg-red-700 transition-colors"
          >
            +
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-[14px] px-4 py-3.5">
          <span className="text-sm">🔍</span>
          <input
            type="text"
            placeholder="거래 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 font-inter text-sm text-dark placeholder-faint outline-none bg-transparent"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {(['전체', '지출', '수입'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-full font-inter text-xs font-semibold transition-colors ${
                filter === f ? 'bg-primary text-white' : 'bg-white text-muted'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Month label */}
        <span className="font-grotesk font-semibold text-dark text-[13px]">3월 2026</span>

        {/* List */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-[14px] p-8 text-center font-inter text-muted text-sm">
              거래 내역이 없습니다.
            </div>
          ) : (
            filtered.map((tx, i) => (
              <div key={i} className="bg-white rounded-[14px] p-4 flex items-center gap-3">
                <div className="w-[42px] h-[42px] bg-surface rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {tx.icon}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-inter font-semibold text-dark text-sm truncate">{tx.name}</span>
                  <span className="font-inter text-faint text-xs">{tx.category} · {tx.date}</span>
                </div>
                <span className={`font-grotesk font-bold text-sm flex-shrink-0 ${tx.amount >= 0 ? 'text-success' : 'text-primary'}`}>
                  {fmt(tx.amount)}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  )
}

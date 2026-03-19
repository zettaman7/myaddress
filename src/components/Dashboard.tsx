interface DashboardProps {
  onAddTransaction: () => void
}

const recentTransactions = [
  { icon: '🛒', name: '마트 장보기',   category: '식비', date: '3월 4일',  amount: -87000 },
  { icon: '💰', name: '3월 급여',      category: '수입', date: '3월 1일',  amount: 3200000 },
  { icon: '🍜', name: '외식비',        category: '식비', date: '3월 2일',  amount: -42000 },
  { icon: '🚌', name: '교통카드 충전', category: '교통', date: '3월 3일',  amount: -50000 },
]

function formatKRW(amount: number) {
  const abs = Math.abs(amount).toLocaleString('ko-KR')
  return amount >= 0 ? `+₩${abs}` : `-₩${abs}`
}

export default function Dashboard({ onAddTransaction }: DashboardProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-surface">
      <div className="flex flex-col gap-5 px-5 pt-2 pb-5">

        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="font-inter text-muted text-[13px]">안녕하세요 👋</span>
            <span className="font-grotesk font-bold text-dark text-xl">김민준님</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-base shadow-sm">
            🔔
          </button>
        </div>

        {/* Balance Card */}
        <div className="w-full bg-primary rounded-[20px] p-6 flex flex-col gap-4">
          <span className="font-inter text-white/75 text-[13px]">총 잔액</span>
          <span className="font-grotesk font-bold text-white text-[32px] tracking-tighter">
            ₩ 4,280,000
          </span>
          <div className="flex items-center gap-0">
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-inter text-white/70 text-[11px]">수입</span>
              <span className="font-grotesk font-semibold text-white text-sm">+₩ 3,500,000</span>
            </div>
            <div className="w-px h-9 bg-white/30" />
            <div className="flex flex-col gap-1 flex-1 pl-4">
              <span className="font-inter text-white/70 text-[11px]">지출</span>
              <span className="font-grotesk font-semibold text-white text-sm">-₩ 1,850,000</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl p-[18px] flex flex-col gap-1.5">
            <span className="text-xl">💰</span>
            <span className="font-inter text-muted text-[11px]">저축률</span>
            <span className="font-grotesk font-bold text-dark text-xl">47.1%</span>
            <span className="font-inter text-muted text-[11px]">목표 50%</span>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-[18px] flex flex-col gap-1.5">
            <span className="text-xl">📊</span>
            <span className="font-inter text-muted text-[11px]">예산 사용</span>
            <span className="font-grotesk font-bold text-primary text-xl">74%</span>
            <div className="w-full h-1 bg-border rounded-full mt-1">
              <div className="h-full bg-primary rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="font-grotesk font-bold text-dark text-base flex-1">최근 거래</span>
            <span className="font-inter text-primary text-xs">전체보기 →</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="bg-white rounded-[14px] p-4 flex items-center gap-3">
                <div className="w-[42px] h-[42px] bg-surface rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {tx.icon}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-inter font-semibold text-dark text-sm truncate">{tx.name}</span>
                  <span className="font-inter text-faint text-xs">{tx.category} · {tx.date}</span>
                </div>
                <span className={`font-grotesk font-bold text-sm flex-shrink-0 ${tx.amount >= 0 ? 'text-success' : 'text-primary'}`}>
                  {formatKRW(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          onClick={onAddTransaction}
          className="fixed bottom-[110px] right-5 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-red-700 transition-colors z-10"
        >
          +
        </button>

      </div>
    </main>
  )
}

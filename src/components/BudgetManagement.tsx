const categories = [
  { icon: '🍽️', name: '식비',  used: 129000,  total: 500000 },
  { icon: '🚌', name: '교통',  used: 50000,   total: 150000 },
  { icon: '🏠', name: '주거',  used: 600000,  total: 700000 },
  { icon: '📱', name: '통신',  used: 88000,   total: 120000 },
  { icon: '🎬', name: '여가',  used: 45000,   total: 200000 },
  { icon: '🏥', name: '의료',  used: 0,       total: 100000 },
]

const TOTAL = 2500000
const USED = categories.reduce((s, c) => s + c.used, 0)
const REMAINING = TOTAL - USED

function pct(used: number, total: number) {
  return Math.min(100, Math.round((used / total) * 100))
}
function fmt(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`
}

export default function BudgetManagement() {
  const usedPct = pct(USED, TOTAL)

  return (
    <main className="flex-1 overflow-y-auto bg-surface">
      <div className="flex flex-col gap-4 px-5 pt-2 pb-5">

        <span className="font-grotesk font-bold text-dark text-[22px]">예산 관리</span>

        {/* Overview card */}
        <div className="w-full bg-dark rounded-[20px] p-[22px] flex flex-col gap-3.5">
          <span className="font-inter text-white/60 text-xs">3월 예산 현황</span>
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-inter text-white/60 text-[11px]">사용</span>
              <span className="font-grotesk font-bold text-white text-[22px]">{fmt(USED)}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="font-inter text-white/60 text-[11px]">총 예산</span>
              <span className="font-grotesk font-semibold text-white/80 text-base">{fmt(TOTAL)}</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-inter text-success text-xs">잔여 {fmt(REMAINING)}</span>
            <span className="font-inter text-white/70 text-xs">{usedPct}% 사용</span>
          </div>
        </div>

        {/* Category list */}
        <span className="font-grotesk font-bold text-dark text-[15px]">카테고리별 현황</span>

        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => {
            const p = pct(cat.used, cat.total)
            const isOver = p >= 75
            return (
              <div key={cat.name} className="bg-white rounded-[14px] p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-inter font-semibold text-dark text-sm flex-1">{cat.name}</span>
                  <span className="font-inter text-muted text-xs">{fmt(cat.used)} / {fmt(cat.total)}</span>
                  <span className={`font-grotesk font-bold text-[13px] w-10 text-right ${isOver ? 'text-primary' : 'text-success'}`}>
                    {p}%
                  </span>
                </div>
                <div className="w-full h-[5px] bg-border rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${isOver ? 'bg-primary' : 'bg-success'}`}
                    style={{ width: `${p}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}

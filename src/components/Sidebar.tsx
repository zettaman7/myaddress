type Page = 'dashboard' | 'transactions' | 'budget' | 'report' | 'settings'

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string }[] = [
  { id: 'dashboard', label: '대시보드' },
  { id: 'transactions', label: '거래내역' },
  { id: 'budget', label: '예산 관리' },
  { id: 'report', label: '리포트' },
  { id: 'settings', label: '설정' },
]

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 h-full flex flex-col border-r border-border bg-white flex-shrink-0">
      {/* Logo */}
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="font-grotesk font-semibold text-white text-base">₩</span>
          </div>
          <span className="font-grotesk font-semibold text-dark text-lg">가계부</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-8 flex flex-col gap-1">
        {navItems.map(({ id, label }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-2.5 h-10 px-3 text-sm text-left transition-colors ${
                isActive
                  ? 'bg-primary text-white font-grotesk font-medium'
                  : 'text-muted font-inter hover:bg-surface'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  isActive ? 'bg-white' : 'bg-faint'
                }`}
              />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User */}
      <div className="border-t border-border p-6 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-dark flex items-center justify-center flex-shrink-0">
          <span className="font-grotesk font-semibold text-white text-sm">김</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-grotesk font-medium text-dark text-[13px]">김민준</span>
          <span className="font-inter text-muted text-xs">minjun@example.com</span>
        </div>
      </div>
    </aside>
  )
}

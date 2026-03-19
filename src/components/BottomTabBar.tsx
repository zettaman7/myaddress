type Page = 'home' | 'transactions' | 'budget' | 'profile'

interface BottomTabBarProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

const tabs: { id: Page; icon: string }[] = [
  { id: 'home',         icon: '🏠' },
  { id: 'transactions', icon: '📋' },
  { id: 'budget',       icon: '💳' },
  { id: 'profile',      icon: '👤' },
]

export default function BottomTabBar({ activePage, onNavigate }: BottomTabBarProps) {
  return (
    <div className="w-full bg-surface px-[21px] pt-3 pb-[21px] flex-shrink-0">
      <div className="w-full h-[62px] bg-white rounded-[36px] border border-border flex items-center px-1 py-1 gap-0">
        {tabs.map(({ id, icon }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex-1 h-full rounded-[26px] flex items-center justify-center text-lg transition-colors ${
                isActive ? 'bg-primary' : 'bg-transparent'
              }`}
            >
              {icon}
            </button>
          )
        })}
      </div>
    </div>
  )
}

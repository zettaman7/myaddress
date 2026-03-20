import { Page } from '../App'

interface Props {
  activePage: 'home' | 'search' | 'mypage'
  navigate: (to: Page) => void
}

const tabs: { id: string; icon: string; label: string; target: Page }[] = [
  { id: 'home',         icon: '🗺',  label: '홈',  target: 'home'         },
  { id: 'search',       icon: '🔍', label: '검색', target: 'search'       },
  { id: 'register-tab', icon: '📍', label: '등록', target: 'alias-select' },
  { id: 'mypage',       icon: '👤', label: '마이', target: 'mypage'       },
]

export default function TabBar({ activePage, navigate }: Props) {
  return (
    <div className="flex-shrink-0 flex items-start justify-center bg-white border-t border-slate-100"
         style={{ height: 'calc(96px + env(safe-area-inset-bottom, 0px))', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
      <div className="w-full flex"
           style={{ height: 62, borderRadius: 32, backgroundColor: '#F1F5F9', padding: 4 }}>
        {tabs.map(tab => {
          const active = (activePage as string) === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.target)}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
              style={{ borderRadius: 28, backgroundColor: active ? '#2563EB' : 'transparent' }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{tab.icon}</span>
              <span className="font-semibold"
                    style={{ fontSize: 11, color: active ? '#FFFFFF' : '#94A3B8' }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

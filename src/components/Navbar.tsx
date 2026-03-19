import { Page } from '../App'

interface NavbarProps {
  navigate: (to: Page) => void
  variant?: 'default' | 'detail' | 'register' | 'mypage'
}

export default function Navbar({ navigate, variant = 'default' }: NavbarProps) {
  if (variant === 'detail') {
    return (
      <nav className="flex items-center gap-4 h-16 px-6 bg-white border-b border-slate-100 flex-shrink-0">
        <button
          onClick={() => navigate('search')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors"
        >
          ← 검색결과
        </button>
        <Logo navigate={navigate} />
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
          공유
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
          저장
        </button>
      </nav>
    )
  }

  if (variant === 'register') {
    return (
      <nav className="flex items-center gap-4 h-16 px-6 bg-white border-b border-slate-100 flex-shrink-0">
        <Logo navigate={navigate} />
        <div className="flex-1" />
        <span className="text-sm font-semibold text-primary">2 / 4단계</span>
        <button className="px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors">
          취소
        </button>
      </nav>
    )
  }

  if (variant === 'mypage') {
    return (
      <nav className="flex items-center gap-4 h-16 px-6 bg-white border-b border-slate-100 flex-shrink-0">
        <Logo navigate={navigate} />
        <div className="flex-1" />
        <button className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
        </button>
        <button
          onClick={() => navigate('mypage')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold"
        >
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">홍</span>
          홍길동
        </button>
      </nav>
    )
  }

  // default
  return (
    <nav className="flex items-center gap-4 h-16 px-6 bg-white border-b border-slate-100 flex-shrink-0">
      <Logo navigate={navigate} />
      <div className="flex-1">
        <div className="flex items-center gap-2 h-10 px-4 rounded-full bg-slate-100">
          <span className="text-slate-400 text-sm">🔍</span>
          <span className="text-slate-400 text-sm">장소명, 별칭, 해시태그로 검색... (#세일 #월드컵중계)</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg bg-slate-100 text-primary text-sm font-semibold hover:bg-slate-200 transition-colors">
          로그인
        </button>
        <button
          onClick={() => navigate('register')}
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          회원가입
        </button>
      </div>
    </nav>
  )
}

function Logo({ navigate }: { navigate: (to: Page) => void }) {
  return (
    <button
      onClick={() => navigate('home')}
      className="flex items-center gap-2 w-44 flex-shrink-0"
    >
      <div className="w-7 h-7 rounded-md bg-primary" />
      <span className="text-lg font-bold text-slate-900">MyAddress</span>
    </button>
  )
}

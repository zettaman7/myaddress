import { useState, useEffect } from 'react'

interface Props {
  /** 'light' = 흰색 텍스트 (어두운 배경용), 'dark' = 어두운 텍스트 (밝은 배경용) */
  variant?: 'light' | 'dark'
  className?: string
}

export default function StatusBar({ variant = 'dark', className = '' }: Props) {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  })
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null)

  useEffect(() => {
    // ── 시간 업데이트 (1분마다)
    const updateTime = () => {
      const now = new Date()
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
    }
    const timer = setInterval(updateTime, 10000) // 10초마다 체크

    // ── 네트워크 상태
    const onOnline  = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)

    // ── 배터리 (Chrome/Android 지원)
    if ('getBattery' in navigator) {
      ;(navigator as any).getBattery().then((bat: any) => {
        const sync = () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging })
        sync()
        bat.addEventListener('levelchange',   sync)
        bat.addEventListener('chargingchange', sync)
      }).catch(() => {/* 지원 안 함 — 무시 */})
    }

    return () => {
      clearInterval(timer)
      window.removeEventListener('online',  onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const color = variant === 'light' ? '#FFFFFF' : '#0F172A'

  // 배터리 아이콘 & 색상
  const batteryDisplay = () => {
    if (!battery) return { icon: '🔋', text: '' }
    const { level, charging } = battery
    if (charging)    return { icon: '⚡', text: `${level}%` }
    if (level > 60)  return { icon: '🔋', text: `${level}%` }
    if (level > 20)  return { icon: '🪫', text: `${level}%` }
    return              { icon: '🪫', text: `${level}%` }
  }

  const { icon: batIcon, text: batText } = batteryDisplay()

  return (
    <div className={`flex items-center px-5 h-[54px] flex-shrink-0 ${className}`}>
      <span className="text-[15px] font-semibold" style={{ color }}>{time}</span>
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 text-[12px]" style={{ color }}>
        {isOnline
          ? <span>▲ WiFi</span>
          : <span style={{ color: '#EF4444' }}>✕ 오프라인</span>
        }
        <span>{batIcon}{batText ? ` ${batText}` : ''}</span>
      </div>
    </div>
  )
}

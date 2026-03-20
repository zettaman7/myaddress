interface Props {
  address: string
  onClose: () => void
}

const apps = [
  {
    id: 'naver',
    name: '네이버지도',
    icon: '/images/ZMzbX.jpeg',
    deepLink: (addr: string) => `nmap://search?query=${encodeURIComponent(addr)}&appname=com.myaddress.app`,
    webUrl:   (addr: string) => `https://map.naver.com/v5/search/${encodeURIComponent(addr)}`,
  },
  {
    id: 'kakao',
    name: '카카오지도',
    icon: '/images/WYVaE.jpeg',
    deepLink: (addr: string) => `kakaomap://search?q=${encodeURIComponent(addr)}`,
    webUrl:   (addr: string) => `https://map.kakao.com/link/search/${encodeURIComponent(addr)}`,
  },
  {
    id: 'tmap',
    name: 'T맵',
    icon: '/images/V7a4v.jpeg',
    deepLink: (addr: string) => `tmap://search?name=${encodeURIComponent(addr)}`,
    webUrl:   (addr: string) => `https://tmap.life/${encodeURIComponent(addr)}`,
  },
  {
    id: 'google',
    name: 'Google 지도',
    icon: '/images/ZpMDo.jpeg',
    deepLink: (addr: string) => `comgooglemaps://?q=${encodeURIComponent(addr)}`,
    webUrl:   (addr: string) => `https://maps.google.com/?q=${encodeURIComponent(addr)}`,
  },
]

export default function NavAppSheet({ address, onClose }: Props) {
  const handleSelect = (deepLink: (addr: string) => string, webUrl: (addr: string) => string) => {
    onClose()
    window.location.href = deepLink(address)
    setTimeout(() => {
      if (document.hasFocus()) window.open(webUrl(address), '_blank')
    }, 1500)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40"
           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
           onClick={onClose} />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 bg-white"
           style={{ borderRadius: '24px 24px 0 0' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Title */}
        <div className="px-5 py-3 border-b border-slate-100">
          <span className="text-[17px] font-bold" style={{ color: '#0F172A' }}>
            길안내 앱 선택
          </span>
        </div>

        {/* App list */}
        {apps.map((app, i) => (
          <div key={app.id}>
            <button
              onClick={() => handleSelect(app.deepLink, app.webUrl)}
              className="w-full flex items-center gap-4 px-5 py-3"
              style={{ height: 64 }}>
              <img src={app.icon} alt={app.name}
                   className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <span className="flex-1 text-left text-[15px] font-semibold"
                    style={{ color: '#0F172A' }}>{app.name}</span>
              <span className="text-xl" style={{ color: '#CBD5E1' }}>›</span>
            </button>
            {i < apps.length - 1 && (
              <div className="mx-5 h-px" style={{ backgroundColor: '#F1F5F9' }} />
            )}
          </div>
        ))}

        {/* Cancel */}
        <div className="h-2" style={{ backgroundColor: '#F8FAFC' }} />
        <button onClick={onClose}
                className="w-full h-14 flex items-center justify-center text-[16px] font-semibold"
                style={{ color: '#64748B' }}>
          취소
        </button>
      </div>
    </>
  )
}

import { useState } from 'react'

interface Props {
  aliasName: string
  placeName: string
  address: string
  onClose: () => void
}

export default function QRCodeSheet({ aliasName, placeName, address, onClose }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [copied, setCopied] = useState(false)

  const aliasUrl = `https://myaddress.kr/@${encodeURIComponent(aliasName)}`
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(aliasUrl)}&color=1E3A5F&bgcolor=FFFFFF&margin=12`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(aliasUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: aliasName, text: `${aliasName} — ${placeName}`, url: aliasUrl })
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose} />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 bg-white flex flex-col"
           style={{ borderRadius: '24px 24px 0 0' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Title */}
        <div className="px-5 pt-2 pb-3 border-b border-slate-100">
          <p className="text-[17px] font-bold" style={{ color: '#0F172A' }}>QR코드</p>
          <p className="text-[12px] mt-0.5 truncate" style={{ color: '#94A3B8' }}>
            {aliasName}  ·  {placeName}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-4 px-5 py-6">

          {/* QR 이미지 */}
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
               style={{ width: 220, height: 220, backgroundColor: '#F8FAFC',
                        border: '2px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 text-sm">QR 생성 중...</div>
              </div>
            )}
            <img src={qrApiUrl}
                 alt="QR코드"
                 onLoad={() => setImgLoaded(true)}
                 style={{ width: 220, height: 220, display: imgLoaded ? 'block' : 'none' }} />
          </div>

          {/* 안내 텍스트 */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-[13px] font-semibold" style={{ color: '#0F172A' }}>
              📲 QR코드를 스캔하면 별칭 주소로 이동합니다
            </p>
            <p className="text-[11px]" style={{ color: '#94A3B8' }}>
              가게에 출력·부착하거나 온라인에 공유하세요
            </p>
          </div>

          {/* 링크 복사 */}
          <button onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span className="text-lg">{copied ? '✅' : '🔗'}</span>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[12px] font-semibold" style={{ color: copied ? '#059669' : '#0F172A' }}>
                {copied ? '링크 복사됐습니다!' : '링크 복사'}
              </p>
              <p className="text-[10px] truncate" style={{ color: '#94A3B8' }}>{aliasUrl}</p>
            </div>
          </button>

          {/* 액션 버튼 */}
          <div className="w-full flex gap-2">
            <a href={qrApiUrl}
               download={`QR_${aliasName}.png`}
               className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold"
               style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              ⬇ 다운로드
            </a>
            <button onClick={handleShare}
                    className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold text-white"
                    style={{ backgroundColor: '#1E3A5F' }}>
              ↑ 공유하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

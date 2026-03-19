interface Props {
  placeName: string
  phoneNumber: string
  onClose: () => void
}

export default function PhoneCallSheet({ placeName, phoneNumber, onClose }: Props) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`
    onClose()
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
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Place name + phone number */}
        <div className="px-5 pt-2 pb-4">
          <p className="text-[13px] font-semibold mb-1" style={{ color: '#94A3B8' }}>{placeName}</p>
          <p className="text-[26px] font-extrabold" style={{ color: '#0F172A' }}>{phoneNumber}</p>
        </div>

        <div className="mx-5 h-px" style={{ backgroundColor: '#F1F5F9' }} />

        {/* 전화 걸기 버튼 */}
        <div className="px-5 py-4">
          <button onClick={handleCall}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold text-white"
                  style={{ backgroundColor: '#059669' }}>
            <span className="text-xl">📞</span>
            전화 걸기
          </button>
        </div>

        {/* 취소 */}
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

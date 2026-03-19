interface Props {
  pinX: number
  pinY: number
  address: string
  onConfirm: () => void
  onClose: () => void
}

export default function LongPressAliasSheet({ pinX, pinY, address, onConfirm, onClose }: Props) {
  return (
    <>
      {/* Dropped pin at touch position */}
      <div className="absolute z-40 pointer-events-none flex flex-col items-center"
           style={{ left: pinX, top: pinY, transform: 'translate(-50%, -100%)' }}>
        <div className="animate-bounce">
          <div className="rounded-full" style={{ width: 22, height: 22, backgroundColor: '#2563EB', border: '3px solid white', boxShadow: '0 4px 12px rgba(37,99,235,0.5)' }} />
          <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '10px solid #2563EB', margin: '-1px auto 0' }} />
        </div>
      </div>

      {/* Ripple effect at pin */}
      <div className="absolute z-30 pointer-events-none rounded-full"
           style={{ left: pinX - 20, top: pinY - 20, width: 40, height: 40, backgroundColor: 'rgba(37,99,235,0.2)', border: '2px solid rgba(37,99,235,0.4)' }} />

      {/* Backdrop (tap to dismiss) */}
      <div className="absolute inset-0 z-40" onClick={onClose} />

      {/* Mini bottom sheet */}
      <div className="absolute inset-x-4 z-50 rounded-2xl overflow-hidden"
           style={{ bottom: 100, boxShadow: '0 -4px 32px rgba(0,0,0,0.22)', backgroundColor: '#FFFFFF' }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
               style={{ backgroundColor: '#EFF6FF' }}>📍</div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#94A3B8' }}>길게 터치한 위치</p>
            <p className="text-[13px] font-bold truncate" style={{ color: '#0F172A' }}>{address}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 text-lg leading-none">✕</button>
        </div>

        <div className="mx-4 h-px" style={{ backgroundColor: '#F1F5F9' }} />

        {/* Action buttons */}
        <div className="flex gap-2 px-4 py-3">
          <button onClick={onClose}
                  className="flex-1 h-11 rounded-xl text-[14px] font-semibold"
                  style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
            취소
          </button>
          <button onClick={onConfirm}
                  className="flex-[2] h-11 rounded-xl text-[14px] font-bold text-white flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: '#2563EB' }}>
            ✏️ 별칭 등록하기
          </button>
        </div>
      </div>
    </>
  )
}

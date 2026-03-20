import { useState } from 'react'

interface Props {
  aliasName: string
  placeName: string
  currentExpiry: string
  onClose: () => void
}

const plans = [
  { id: '1m',   label: '1개월', duration: '30일 연장',  price: '990원',    badge: null     },
  { id: '6m',   label: '6개월', duration: '180일 연장', price: '4,900원',  badge: null     },
  { id: '1y',   label: '1년',   duration: '365일 연장', price: '8,900원',  badge: '인기'   },
  { id: 'perm', label: '영구',  duration: '만료 없음',  price: '29,900원', badge: '최고가성비' },
]

export default function AliasRenewSheet({ aliasName, placeName, currentExpiry, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const selectedPlan = plans.find(p => p.id === selected)

  const handleConfirm = () => {
    setDone(true)
    setTimeout(onClose, 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose} />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 bg-white flex flex-col"
           style={{ borderRadius: '24px 24px 0 0', maxHeight: '90%' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Title */}
        <div className="px-5 pt-2 pb-4 border-b border-slate-100 flex-shrink-0">
          <p className="text-[17px] font-bold" style={{ color: '#0F172A' }}>별칭 기간 연장</p>
          <p className="text-[12px] mt-1 truncate" style={{ color: '#94A3B8' }}>
            {aliasName}  ·  {placeName}
          </p>
        </div>

        {done ? (
          /* 완료 상태 */
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10">
            <span className="text-5xl">✅</span>
            <p className="text-[17px] font-bold" style={{ color: '#059669' }}>연장 완료!</p>
            <p className="text-[13px]" style={{ color: '#64748B' }}>
              {selectedPlan?.label} 플랜으로 연장됐습니다
            </p>
          </div>
        ) : (
          <>
            {/* 현재 만료일 */}
            <div className="mx-5 my-4 px-4 py-3 rounded-2xl flex items-center gap-3 flex-shrink-0"
                 style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
              <span className="text-xl">⏰</span>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: '#92400E' }}>현재 만료일</p>
                <p className="text-[15px] font-bold" style={{ color: '#D97706' }}>{currentExpiry}</p>
              </div>
              <span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}>D-2</span>
            </div>

            {/* 플랜 선택 */}
            <div className="flex flex-col gap-2 px-5 flex-shrink-0">
              {plans.map(plan => (
                <button key={plan.id}
                        onClick={() => setSelected(plan.id)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-colors"
                        style={{
                          borderColor: selected === plan.id ? '#2563EB' : '#E2E8F0',
                          backgroundColor: selected === plan.id ? '#EFF6FF' : '#FFFFFF',
                        }}>
                  {/* 라디오 */}
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                       style={{ borderColor: selected === plan.id ? '#2563EB' : '#CBD5E1' }}>
                    {selected === plan.id && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2563EB' }} />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold" style={{ color: '#0F172A' }}>{plan.label}</span>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: plan.id === 'perm' ? '#D1FAE5' : '#2563EB',
                                       color: plan.id === 'perm' ? '#059669' : '#FFFFFF' }}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: '#94A3B8' }}>{plan.duration}</p>
                  </div>
                  <span className="text-[14px] font-bold flex-shrink-0" style={{ color: '#0F172A' }}>{plan.price}</span>
                </button>
              ))}
            </div>

            {/* 결제 버튼 */}
            <div className="px-5 py-4 flex-shrink-0">
              <button onClick={handleConfirm}
                      disabled={!selected}
                      className="w-full h-14 rounded-2xl text-[15px] font-bold text-white transition-opacity"
                      style={{ backgroundColor: selected ? '#2563EB' : '#CBD5E1',
                               opacity: selected ? 1 : 0.6 }}>
                {selected ? `${selectedPlan?.price} 결제하고 연장` : '플랜을 선택하세요'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

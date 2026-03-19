import { useState } from 'react'

interface AddTransactionModalProps {
  onClose: () => void
  onSave: (tx: {
    type: '지출' | '수입'
    amount: number
    name: string
    category: string
    date: string
    memo: string
  }) => void
}

const CATEGORIES = ['식비', '교통', '주거', '통신', '여가', '의료', '수입', '기타']

export default function AddTransactionModal({ onClose, onSave }: AddTransactionModalProps) {
  const [type, setType] = useState<'지출' | '수입'>('지출')
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('2026-03-05')

  function handleSave() {
    if (!amount || !name) return
    onSave({ type, amount: Number(amount.replace(/,/g, '')), name, category, date, memo: '' })
    onClose()
  }

  function handleAmountChange(val: string) {
    const numeric = val.replace(/[^0-9]/g, '')
    setAmount(numeric ? Number(numeric).toLocaleString('ko-KR') : '')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/40" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="relative z-10 bg-white rounded-t-[24px] flex flex-col max-h-[75vh]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center px-6 pt-2 pb-4 flex-shrink-0">
          <span className="font-grotesk font-bold text-dark text-lg flex-1">새 거래 추가</span>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-surface rounded-full flex items-center justify-center text-muted text-sm hover:bg-border transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-4">
          {/* Type toggle */}
          <div className="flex bg-surface rounded-[14px] p-1 gap-0">
            {(['지출', '수입'] as const).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 h-11 rounded-[10px] font-semibold text-sm transition-colors ${
                  type === t
                    ? t === '지출'
                      ? 'bg-primary text-white font-grotesk'
                      : 'bg-success text-white font-grotesk'
                    : 'text-muted font-inter'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <label className="font-inter font-medium text-muted text-xs">금액</label>
            <div className={`flex items-center gap-2 px-4 py-4 bg-surface rounded-xl border-[1.5px] ${
              type === '지출' ? 'border-primary' : 'border-success'
            }`}>
              <span className={`font-grotesk font-bold text-lg ${type === '지출' ? 'text-primary' : 'text-success'}`}>₩</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                className="flex-1 font-grotesk font-bold text-dark text-2xl outline-none bg-transparent placeholder-border"
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="font-inter font-medium text-muted text-xs">내용</label>
            <input
              type="text"
              placeholder="거래 내용을 입력하세요"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-3.5 bg-surface rounded-xl font-inter text-sm text-dark placeholder-faint outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Category + Date */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-inter font-medium text-muted text-xs">카테고리</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-4 py-3.5 bg-surface rounded-xl font-inter text-sm text-dark outline-none cursor-pointer"
              >
                <option value="">선택</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-inter font-medium text-muted text-xs">날짜</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="px-4 py-3.5 bg-surface rounded-xl font-inter text-sm text-dark outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 h-[52px] bg-surface rounded-[14px] font-inter font-medium text-muted text-sm hover:bg-border transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={!amount || !name}
              className="flex-1 h-[52px] bg-primary rounded-[14px] font-grotesk font-semibold text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

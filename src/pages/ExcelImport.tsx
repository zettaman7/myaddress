import { useState } from 'react'
import { Page } from '../App'

interface Props { navigate: (to: Page) => void }

export default function ExcelImport({ navigate }: Props) {
  const [dragging, setDragging] = useState(false)
  const uploaded = true // mock: file already uploaded

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* Status bar spacer */}
      <div className="h-[44px] sm:h-[54px] flex-shrink-0 bg-white" />

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 pb-3 flex-shrink-0">
        <button onClick={() => navigate('home')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>←</button>
        <span className="text-[15px] font-bold" style={{ color: '#0F172A' }}>대량 등록 (Excel Import)</span>
      </div>

      {/* Progress bar */}
      <div className="mx-5 mb-4 flex-shrink-0">
        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
          <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: '#2563EB' }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>다운로드</span>
          <span className="text-[10px] font-semibold" style={{ color: '#2563EB' }}>업로드 ←</span>
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>검증 (1진행중)</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[20px] font-extrabold" style={{ color: '#0F172A' }}>파일 업로드</h2>
          <p className="text-[13px]" style={{ color: '#64748B' }}>준비된 Excel 파일을 업로드해주세요. (최대 5,000건)</p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false) }}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed"
          style={{
            height: 160,
            borderColor: dragging ? '#2563EB' : '#CBD5E1',
            backgroundColor: dragging ? '#EFF6FF' : '#F8FAFC',
          }}
        >
          <div className="flex flex-col items-center gap-1 opacity-40">
            <span style={{ fontSize: 40 }}>📁</span>
          </div>
          <span className="text-[13px]" style={{ color: '#94A3B8' }}>파일을 여기에 드래그하거나</span>
          <button className="px-4 py-2 rounded-xl text-[13px] font-bold text-white"
                  style={{ backgroundColor: '#2563EB' }}>
            파일 선택
          </button>
        </div>

        {/* Uploaded file */}
        {uploaded && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
               style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <span className="text-2xl flex-shrink-0">📄</span>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-[13px] font-bold truncate" style={{ color: '#0F172A' }}>pc_branch_list_2026.xlsx</span>
              <span className="text-[11px]" style={{ color: '#64748B' }}>1,248개 항목 · 2.4 MB · 업로드 완료 ✓</span>
            </div>
          </div>
        )}

        {/* Template link */}
        <div className="flex items-center gap-2">
          <span className="text-[12px]" style={{ color: '#94A3B8' }}>템플릿 파일이 없으신가요?</span>
          <button className="text-[12px] font-semibold" style={{ color: '#2563EB' }}>템플릿 다운로드</button>
        </div>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3">
        <button onClick={() => navigate('home')}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-[15px] font-bold text-white"
                style={{ backgroundColor: '#2563EB' }}>
          유효성 검사 시작 →
        </button>
      </div>
    </div>
  )
}

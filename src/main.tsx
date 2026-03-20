import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// 실제 뷰포트 높이를 CSS 변수로 주입 (dvh/100vh 브라우저 불일치 방지)
const setAppHeight = () => {
  document.documentElement.style.setProperty('--app-h', `${window.innerHeight}px`)
}
setAppHeight()
window.addEventListener('resize', setAppHeight)
window.visualViewport?.addEventListener('resize', setAppHeight)

// Service Worker 등록 (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

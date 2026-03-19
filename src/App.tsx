import { useState } from 'react'
import MainHome from './pages/MainHome'
import SearchResults from './pages/SearchResults'
import PlaceDetail from './pages/PlaceDetail'
import PhotoViewer from './pages/PhotoViewer'
import AliasConfirm from './pages/AliasConfirm'
import AliasRegister from './pages/AliasRegister'
import AliasDetail from './pages/AliasDetail'
import AliasFinal from './pages/AliasFinal'
import EventRegister from './pages/EventRegister'
import EventPeriod from './pages/EventPeriod'
import EventCondition from './pages/EventCondition'
import EventFinal from './pages/EventFinal'
import ExcelImport from './pages/ExcelImport'
import MyPage from './pages/MyPage'
import AliasEdit from './pages/AliasEdit'

export type Page =
  | 'home' | 'search' | 'detail' | 'photo-view'
  | 'alias-select' | 'alias-confirm' | 'register' | 'alias-detail' | 'alias-final'
  | 'event' | 'event-period' | 'event-condition' | 'event-final'
  | 'excel' | 'mypage' | 'alias-edit'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedHasAlias, setSelectedHasAlias] = useState(false)
  const [aliasEditReturn, setAliasEditReturn] = useState<'detail' | 'mypage'>('mypage')
  const [photoIndex, setPhotoIndex] = useState(0)
  const [aliasInitOffset, setAliasInitOffset] = useState({ x: 0, y: 0 })
  const navigate = (to: Page) => setPage(to)

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center">
      <div className="relative w-full max-w-[390px] h-screen max-h-[844px] overflow-hidden bg-white shadow-2xl">
        {page === 'home'            && <MainHome navigate={navigate} setAliasInitOffset={setAliasInitOffset} />}
        {page === 'search'          && <SearchResults navigate={navigate} setSelectedHasAlias={setSelectedHasAlias} setAliasInitOffset={setAliasInitOffset} />}
        {page === 'detail'          && <PlaceDetail navigate={navigate} hasAlias={selectedHasAlias} setAliasEditReturn={setAliasEditReturn} setPhotoIndex={setPhotoIndex} />}
        {page === 'photo-view'      && <PhotoViewer navigate={navigate} initialIndex={photoIndex} />}
        {page === 'alias-select'    && <AliasConfirm navigate={navigate} startInSelect />}
        {page === 'alias-confirm'   && <AliasConfirm navigate={navigate} initialOffset={aliasInitOffset} />}
        {page === 'register'        && <AliasRegister navigate={navigate} />}
        {page === 'alias-detail'    && <AliasDetail navigate={navigate} />}
        {page === 'alias-final'     && <AliasFinal navigate={navigate} />}
        {page === 'event'           && <EventRegister navigate={navigate} />}
        {page === 'event-period'    && <EventPeriod navigate={navigate} />}
        {page === 'event-condition' && <EventCondition navigate={navigate} />}
        {page === 'event-final'     && <EventFinal navigate={navigate} />}
        {page === 'excel'           && <ExcelImport navigate={navigate} />}
        {page === 'mypage'          && <MyPage navigate={navigate} setAliasEditReturn={setAliasEditReturn} />}
        {page === 'alias-edit'      && <AliasEdit navigate={navigate} returnTo={aliasEditReturn} />}
      </div>
    </div>
  )
}

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
  const [aliasInitCenter, setAliasInitCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [aliasReturnPage, setAliasReturnPage] = useState<Page>('home')
  const [detailReturnPage, setDetailReturnPage] = useState<Page>('search')
  const [eventReturnPage, setEventReturnPage] = useState<Page>('mypage')
  const [eventAliasName, setEventAliasName] = useState('@강남구 넓고 빠른 게임아지트  ·  강남 PC프라자')
  const navigate = (to: Page) => setPage(to)

  return (
    <div className="min-h-dvh bg-white sm:bg-slate-500 sm:flex sm:items-center sm:justify-center">
      <div className="relative w-full h-[100lvh] sm:max-w-[414px] sm:max-h-[896px] overflow-hidden bg-white sm:shadow-2xl sm:rounded-[55px]">
        {page === 'home'            && <MainHome navigate={navigate} setAliasInitCenter={setAliasInitCenter} setAliasReturnPage={setAliasReturnPage} setDetailReturnPage={setDetailReturnPage} />}
        {page === 'search'          && <SearchResults navigate={navigate} setSelectedHasAlias={setSelectedHasAlias} setAliasInitCenter={setAliasInitCenter} setAliasReturnPage={setAliasReturnPage} setDetailReturnPage={setDetailReturnPage} />}
        {page === 'detail'          && <PlaceDetail navigate={navigate} hasAlias={selectedHasAlias} setAliasEditReturn={setAliasEditReturn} setPhotoIndex={setPhotoIndex} returnTo={detailReturnPage} setAliasReturnPage={setAliasReturnPage} setEventReturnPage={setEventReturnPage} setEventAliasName={setEventAliasName} />}
        {page === 'photo-view'      && <PhotoViewer navigate={navigate} initialIndex={photoIndex} />}
        {page === 'alias-select'    && <AliasConfirm navigate={navigate} returnTo="home" />}
        {page === 'alias-confirm'   && <AliasConfirm navigate={navigate} initialCenter={aliasInitCenter} returnTo={aliasReturnPage} />}
        {page === 'register'        && <AliasRegister navigate={navigate} aliasReturnPage={aliasReturnPage} />}
        {page === 'alias-detail'    && <AliasDetail navigate={navigate} aliasReturnPage={aliasReturnPage} />}
        {page === 'alias-final'     && <AliasFinal navigate={navigate} aliasReturnPage={aliasReturnPage} setEventReturnPage={setEventReturnPage} setEventAliasName={setEventAliasName} />}
        {page === 'event'           && <EventRegister navigate={navigate} eventReturnPage={eventReturnPage} eventAliasName={eventAliasName} />}
        {page === 'event-period'    && <EventPeriod navigate={navigate} eventAliasName={eventAliasName} />}
        {page === 'event-condition' && <EventCondition navigate={navigate} eventAliasName={eventAliasName} />}
        {page === 'event-final'     && <EventFinal navigate={navigate} eventAliasName={eventAliasName} />}
        {page === 'excel'           && <ExcelImport navigate={navigate} />}
        {page === 'mypage'          && <MyPage navigate={navigate} setAliasEditReturn={setAliasEditReturn} setEventReturnPage={setEventReturnPage} setEventAliasName={setEventAliasName} />}
        {page === 'alias-edit'      && <AliasEdit navigate={navigate} returnTo={aliasEditReturn} setEventReturnPage={setEventReturnPage} setEventAliasName={setEventAliasName} />}
      </div>
    </div>
  )
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CmsProvider } from './content/cms'
import { LocaleProvider } from './context/Locale'
import { About } from './pages/About'
import { Brands } from './pages/Brands'
import { Business } from './pages/Business'
import { BusinessDetail } from './pages/BusinessDetail'
import { Contact } from './pages/Contact'
import { Extra } from './pages/Extra'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Legal } from './pages/Legal'
import { Quality } from './pages/Quality'

export function App() {
  return (
    <CmsProvider>
      <LocaleProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/business" element={<Business />} />
              <Route path="/business/:slug" element={<BusinessDetail />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/p/:slug" element={<Extra />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/legal/privacy" element={<Legal />} />
              <Route path="/legal/settings" element={<Legal />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </CmsProvider>
  )
}

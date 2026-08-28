import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LocaleProvider } from './context/Locale'
import { About } from './pages/About'
import { Brands } from './pages/Brands'
import { Business } from './pages/Business'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Quality } from './pages/Quality'

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<Business />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  )
}

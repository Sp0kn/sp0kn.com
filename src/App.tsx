import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AnnouncementBanner from './components/layout/AnnouncementBanner'
import Home from './pages/Home'
import Concepts from './pages/Concepts'
import Auberge from './pages/Auberge'
import Fondation from './pages/Fondation'
import APropos from './pages/APropos'
import VODs from './pages/VODs'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-space-900 text-text-primary">
        <AnnouncementBanner />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/auberge" element={<Auberge />} />
            <Route path="/fondation" element={<Fondation />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/vods" element={<VODs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

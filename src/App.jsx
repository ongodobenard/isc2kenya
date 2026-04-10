import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import Events from './pages/Events'
import Mentorship from './pages/Mentorship'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/events"     element={<Events />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/membership', label: 'Membership' },
  { path: '/events', label: 'Events' },
  { path: '/mentorship', label: 'Mentorship' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .nav-link {
          padding: 7px 11px;
          font-size: 0.84rem;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s;
          text-decoration: none;
          color: #1f2937;
          white-space: nowrap;
          display: inline-block;
        }
        .nav-link:hover  { color: #3d7a1f; background: rgba(90,170,50,0.08); }
        .nav-link.active { color: #3d7a1f; background: rgba(90,170,50,0.09); font-weight: 600; }

        .nav-cta {
          background: #5aaa32;
          color: white !important;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.84rem;
          margin-left: 4px;
          text-decoration: none;
          transition: all 0.22s;
          display: inline-block;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #3d7a1f;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(90,170,50,0.35);
        }

        .hbg {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          background: none;
          border: none;
          outline: none;
          width: 40px;
          height: 40px;
        }
        .hbg span {
          display: block;
          width: 22px;
          height: 2px;
          background: #1f2937;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hbg.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hbg.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hbg.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mob-menu {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: #ffffff;
          border-top: 2px solid #5aaa32;
          z-index: 998;
          overflow: hidden;
          max-height: 0;
          padding: 0 16px;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .mob-menu.open { max-height: 560px; padding: 14px 16px 22px; }

        .mob-link {
          display: flex;
          align-items: center;
          padding: 11px 16px;
          border-radius: 8px;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 3px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .mob-link:hover  { background: #f8faf6; color: #3d7a1f; padding-left: 22px; }
        .mob-link.active { background: rgba(90,170,50,0.1); color: #3d7a1f; font-weight: 600; }

        .mob-cta {
          display: block;
          margin-top: 10px;
          padding: 13px;
          background: #5aaa32;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mob-cta:hover { background: #3d7a1f; }

        .logo-img { transition: transform 0.3s; }
        .logo-img:hover { transform: rotate(5deg) scale(1.06); }

        .desktop-links { display: flex; gap: 2px; align-items: center; }

        @media (max-width: 960px) {
          .desktop-links { display: none !important; }
          .hbg { display: flex !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 999,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid #5aaa32',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.1)' : '0 2px 16px rgba(90,170,50,0.08)',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src={logo}
              alt="ISC2 Kenya"
              className="logo-img"
              style={{ height: '42px', width: '42px', objectFit: 'contain' }}
            />
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '0.93rem', fontWeight: 700, color: '#1a3a6e', lineHeight: 1.2 }}>
              ISC2 Kenya<br />Chapter
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/membership" className="nav-cta">Join Now</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hbg${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        id="mobile-nav"
        className={`mob-menu${menuOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`mob-link${location.pathname === link.path ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/membership"
          className="mob-cta"
          onClick={() => setMenuOpen(false)}
        >
          Join Now
        </Link>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            top: '68px',
            background: 'rgba(0,0,0,0.32)',
            zIndex: 997,
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}
    </>
  )
}

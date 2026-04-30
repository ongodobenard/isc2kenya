import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/membership', label: 'Membership' },
  { path: '/events', label: 'Events' },
  { path: '/mentorship', label: 'Mentorship' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

/* SVG icons for mobile menu */
const MobIcon = ({ path }) => {
  const icons = {
    '/': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z"/>
      </svg>
    ),
    '/about': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    ),
    '/membership': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
      </svg>
    ),
    '/events': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    ),
    '/mentorship': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
      </svg>
    ),
    '/gallery': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
      </svg>
    ),
    '/blog': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
      </svg>
    ),
    '/contact': (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
      </svg>
    ),
  }
  return icons[path] || null
}

/* Gallery icon for desktop nav */
const GalleryIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

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
        @keyframes fadeIn    { from { opacity: 0 }                      to { opacity: 1 } }

        /* ── Desktop nav links ── */
        .nav-link {
          padding: 7px 11px;
          font-size: 0.84rem;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s;
          text-decoration: none;
          color: #1f2937;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .nav-link:hover  { color: #3d7a1f; background: rgba(90,170,50,0.08); }
        .nav-link.active { color: #3d7a1f; background: rgba(90,170,50,0.09); font-weight: 600; }

        /* Gallery desktop — soft green tint to stand out slightly */
        .nav-link.gallery-desk {
          color: #3d7a1f;
          background: rgba(90,170,50,0.07);
          border: 1px solid rgba(90,170,50,0.18);
        }
        .nav-link.gallery-desk:hover {
          background: rgba(90,170,50,0.15);
          border-color: rgba(90,170,50,0.35);
        }
        .nav-link.gallery-desk.active {
          background: rgba(90,170,50,0.18);
          border-color: rgba(90,170,50,0.4);
          font-weight: 600;
        }

        /* ── Join Now CTA ── */
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

        /* ── Hamburger ── */
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

        /* ── Mobile / Tablet menu — full width on phone ── */
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
        .mob-menu.open { max-height: 680px; padding: 12px 16px 24px; }

        /* Tablet: slide in from right as a panel */
        @media (min-width: 480px) and (max-width: 960px) {
          .mob-menu {
            left: auto;
            right: 12px;
            width: 290px;
            border-radius: 0 0 12px 12px;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
          }
        }

        /* ── Mobile link ── */
        .mob-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 2px;
          text-decoration: none;
          font-size: 0.92rem;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .mob-link:hover  { background: #f8faf6; color: #3d7a1f; padding-left: 20px; }
        .mob-link.active { background: rgba(90,170,50,0.09); color: #3d7a1f; font-weight: 600; }

        /* Gallery mobile — distinct but not garish */
        .mob-link.gallery-mob {
          border-color: rgba(90,170,50,0.22);
          background: rgba(90,170,50,0.04);
          color: #3d7a1f;
          font-weight: 500;
        }
        .mob-link.gallery-mob:hover {
          background: rgba(90,170,50,0.11);
          border-color: rgba(90,170,50,0.38);
          padding-left: 20px;
        }
        .mob-link.gallery-mob.active {
          background: rgba(90,170,50,0.14);
          border-color: rgba(90,170,50,0.4);
          font-weight: 600;
        }

        /* Icon box */
        .mob-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #6b7280;
          transition: background 0.2s, color 0.2s;
        }
        .mob-link:hover .mob-icon-box,
        .mob-link.active .mob-icon-box { background: rgba(90,170,50,0.13); color: #3d7a1f; }
        .mob-link.gallery-mob .mob-icon-box { background: rgba(90,170,50,0.12); color: #3d7a1f; }

        /* "Gallery" badge on mobile */
        .gallery-badge {
          margin-left: auto;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #3d7a1f;
          background: rgba(90,170,50,0.14);
          padding: 2px 7px;
          border-radius: 20px;
          border: 1px solid rgba(90,170,50,0.28);
        }

        /* Divider */
        .mob-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 10px 0 12px;
          border: none;
        }

        /* Join Now — mobile */
        .mob-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: #5aaa32;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.93rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.18s;
        }
        .mob-cta:hover { background: #3d7a1f; transform: translateY(-1px); }

        /* Logo */
        .logo-img { transition: transform 0.3s; }
        .logo-img:hover { transform: rotate(5deg) scale(1.06); }

        /* Desktop link row */
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
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.1)'
          : '0 2px 16px rgba(90,170,50,0.08)',
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
          <Link
            to="/"
            style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}
          >
            <img
              src={logo}
              alt="ISC2 Kenya"
              className="logo-img"
              style={{ height:'42px', width:'42px', objectFit:'contain' }}
            />
            <span style={{
              fontFamily: 'Playfair Display,serif',
              fontSize: '0.93rem',
              fontWeight: 700,
              color: '#1a3a6e',
              lineHeight: 1.2,
            }}>
              ISC2 Kenya<br />Chapter
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-links">
            {navLinks.map(link => {
              const isGallery = link.path === '/gallery'
              const isActive  = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    'nav-link',
                    isGallery ? 'gallery-desk' : '',
                    isActive   ? 'active'       : '',
                  ].filter(Boolean).join(' ')}
                >
                  {isGallery && <GalleryIcon />}
                  {link.label}
                </Link>
              )
            })}
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
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── MOBILE / TABLET MENU ── */}
      <div
        id="mobile-nav"
        className={`mob-menu${menuOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map(link => {
          const isGallery = link.path === '/gallery'
          const isActive  = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              className={[
                'mob-link',
                isGallery ? 'gallery-mob' : '',
                isActive   ? 'active'      : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mob-icon-box" aria-hidden="true">
                <MobIcon path={link.path} />
              </span>
              {link.label}
              {isGallery && (
                <span className="gallery-badge" aria-label="Gallery section">
                  Photos
                </span>
              )}
            </Link>
          )
        })}

        <hr className="mob-divider" />

        <Link
          to="/membership"
          className="mob-cta"
          onClick={() => setMenuOpen(false)}
        >
          <svg viewBox="0 0 20 20" fill="white" width="15" height="15">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
          </svg>
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

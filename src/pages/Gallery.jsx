import { useState, useEffect, useRef, useCallback } from 'react'

import kiambu1 from '../assets/kiambu1.jpeg'
import kiambu2 from '../assets/kiambu2.jpeg'
import kiambu3 from '../assets/kiambu3.jpeg'
import kiambu4 from '../assets/kiambu4.jpeg'
import bgTech from '../assets/bg-tech.jpg'

const events = [
  {
    id: 'isc2gether-2026',
    title: 'ISC2gether 2026: Kiambu Golf Club',
    date: 'April 2026',
    location: 'Kiambu Golf Club, Kiambu',
    description:
      'ISC2 Kenya Chapter members gathered at the Kiambu Golf Club as part of the global ISC2gether volunteer initiative. The evening brought together certified professionals united in their commitment to giving back and shaping the future of cybersecurity in Kenya.',
    photos: [
      {
        src: kiambu1,
        alt: 'ISC2 Kenya members outside Kiambu Golf Club sign',
        caption: 'Chapter members assembled at the iconic Kiambu Golf Club entrance, proudly wearing ISC2gether volunteer shirts.',
      },
      {
        src: kiambu3,
        alt: 'Group photo outside Kiambu Golf Club at dusk',
        caption: 'A full team photo under the glow of the Kiambu Golf Club signage as the evening light faded.',
      },
      {
        src: kiambu2,
        alt: 'Members gathered inside the clubhouse',
        caption: 'Inside the historic Kiambu Golf Club, members convened to discuss chapter activities and the ISC2gether volunteer agenda.',
      },
      {
        src: kiambu4,
        alt: 'Core team members in ISC2gether shirts indoors',
        caption: 'Core chapter volunteers in their ISC2gether shirts, a close-knit team driving cybersecurity awareness across Kenya.',
      },
    ],
  },
]

// ── Lightbox ──
function Lightbox({ photo, onClose, onPrev, onNext, total, current, goTo }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(4,8,20,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'lbFadeIn 0.3s ease',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbImgIn  { from { opacity:0; transform:scale(0.94) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }
      `}</style>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: 'white', width: '42px', height: '42px', borderRadius: '50%',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', transition: 'all 0.2s',
          fontFamily: 'sans-serif', lineHeight: 1, zIndex: 1,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'rotate(90deg)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'rotate(0deg)' }}
      >
        &#x2715;
      </button>

      {/* Counter */}
      <div style={{
        position: 'absolute', top: '26px', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', letterSpacing: '0.12em',
        fontFamily: 'Lato, sans-serif', fontWeight: 300,
      }}>
        {current + 1} &nbsp;/&nbsp; {total}
      </div>

      {/* Image container */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          maxWidth: '960px', width: '100%',
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            style={{
              width: '100%', maxHeight: '66vh',
              objectFit: 'contain', borderRadius: '12px',
              display: 'block', animation: 'lbImgIn 0.35s ease',
              boxShadow: '0 32px 100px rgba(0,0,0,0.7)',
            }}
          />

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous photo"
            style={{
              position: 'absolute', left: '-22px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(90,170,50,0.9)', border: 'none', color: 'white',
              width: '46px', height: '46px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3d7a1f'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(90,170,50,0.9)'; e.currentTarget.style.transform = 'translateY(-50%)' }}
          >&#8592;</button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next photo"
            style={{
              position: 'absolute', right: '-22px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(90,170,50,0.9)', border: 'none', color: 'white',
              width: '46px', height: '46px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3d7a1f'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(90,170,50,0.9)'; e.currentTarget.style.transform = 'translateY(-50%)' }}
          >&#8594;</button>
        </div>

        {/* Caption */}
        <div style={{ marginTop: '22px', textAlign: 'center', maxWidth: '640px', padding: '0 8px' }}>
          <p style={{
            color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem',
            lineHeight: 1.8, fontFamily: 'Lato, sans-serif', fontWeight: 300,
            margin: 0,
          }}>
            {photo.caption}
          </p>
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', alignItems: 'center' }}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i) }}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px', borderRadius: '4px',
                background: i === current ? '#5aaa32' : 'rgba(255,255,255,0.25)',
                border: 'none', cursor: 'pointer',
                transition: 'width 0.35s ease, background 0.35s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Photo card ──
function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open photo: ${photo.alt}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        background: '#e8f0e0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.2), 0 0 0 2px rgba(90,170,50,0.4)'
          : '0 4px 24px rgba(0,0,0,0.1)',
      }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(4,12,40,0.85) 0%, rgba(4,12,40,0.2) 45%, transparent 70%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex', alignItems: 'flex-end',
        padding: '20px 18px',
        pointerEvents: 'none',
      }}>
        <span style={{
          color: 'white', fontSize: '0.8rem',
          fontFamily: 'Lato, sans-serif', fontWeight: 400,
          lineHeight: 1.55,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'transform 0.4s ease',
        }}>
          {photo.caption}
        </span>
      </div>

      {/* View badge */}
      <div style={{
        position: 'absolute', top: '14px', right: '14px',
        background: 'rgba(90,170,50,0.92)',
        width: '34px', height: '34px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-20deg)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: 'none',
        boxShadow: '0 4px 14px rgba(90,170,50,0.5)',
      }}>
        <svg viewBox="0 0 20 20" fill="white" width="14" height="14">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
      </div>

      {/* Index number */}
      <div style={{
        position: 'absolute', top: '14px', left: '14px',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(6px)',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.7rem', fontWeight: 700,
        fontFamily: 'Lato, sans-serif',
        padding: '3px 9px', borderRadius: '20px',
        letterSpacing: '0.06em',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

// ── Main Gallery page ──
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [pageVisible, setPageVisible] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const openLightbox = useCallback((eventIdx, photoIdx) => {
    setLightbox({ eventIdx, photoIdx })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const lbNext = useCallback(() => {
    if (!lightbox) return
    const total = events[lightbox.eventIdx].photos.length
    setLightbox(prev => ({ ...prev, photoIdx: (prev.photoIdx + 1) % total }))
  }, [lightbox])

  const lbPrev = useCallback(() => {
    if (!lightbox) return
    const total = events[lightbox.eventIdx].photos.length
    setLightbox(prev => ({ ...prev, photoIdx: (prev.photoIdx - 1 + total) % total }))
  }, [lightbox])

  const lbGoTo = useCallback((idx) => {
    setLightbox(prev => ({ ...prev, photoIdx: idx }))
  }, [])

  const currentPhoto = lightbox
    ? events[lightbox.eventIdx].photos[lightbox.photoIdx]
    : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Lato:wght@300;400;600;700&display=swap');

        @keyframes fadeUp      { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn      { from { opacity:0 } to { opacity:1 } }
        @keyframes slideInLeft { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }
        @keyframes lineExpand  { from { width:0; opacity:0 } to { width:40px; opacity:1 } }
        @keyframes shimmer     { 0%,100% { opacity:0.5 } 50% { opacity:1 } }
        @keyframes floatUp     { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
        @keyframes pulse       { 0%,100% { box-shadow: 0 0 0 0 rgba(90,170,50,0.4) } 50% { box-shadow: 0 0 0 10px rgba(90,170,50,0) } }

        .gallery-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 48px);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }

        .section-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 48px);
        }

        .event-header {
          display: flex;
          align-items: flex-start;
          gap: clamp(16px, 3vw, 32px);
          margin-bottom: clamp(24px, 4vw, 36px);
          flex-wrap: wrap;
        }

        .event-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(90,170,50,0.1);
          border: 1px solid rgba(90,170,50,0.25);
          color: #3d7a1f;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'Lato', sans-serif;
          transition: all 0.25s ease;
        }
        .event-meta-pill:hover {
          background: rgba(90,170,50,0.18);
          border-color: rgba(90,170,50,0.45);
        }

        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
        }

        .hero-eyebrow-line {
          animation: lineExpand 0.8s ease 0.3s both;
        }
        .hero-eyebrow-text {
          animation: fadeIn 0.8s ease 0.5s both;
        }
        .hero-title {
          animation: fadeUp 0.8s ease 0.4s both;
        }
        .hero-subtitle {
          animation: fadeUp 0.8s ease 0.6s both;
        }
        .hero-divider {
          animation: fadeUp 0.8s ease 0.7s both;
        }

        .hint-text {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>

      <main style={{ paddingTop: '68px', fontFamily: 'Lato, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{
          position: 'relative',
          padding: 'clamp(72px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)',
          overflow: 'hidden',
          minHeight: '420px',
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* bg-tech.jpg background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${bgTech})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.65) saturate(1.2)',
            transition: 'opacity 0.8s ease',
          }} />

          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(4,8,30,0.75) 0%, rgba(10,30,60,0.6) 50%, rgba(5,20,10,0.7) 100%)',
          }} />

          {/* Green tint vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(90,170,50,0.08) 0%, transparent 65%)',
          }} />

          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            backgroundImage: 'linear-gradient(rgba(90,170,50,1) 1px, transparent 1px), linear-gradient(90deg, rgba(90,170,50,1) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            pointerEvents: 'none',
          }} />

          {/* Glowing orb */}
          <div style={{
            position: 'absolute', bottom: '-60px', right: '8%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(90,170,50,0.15) 0%, transparent 70%)',
            animation: 'floatUp 6s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          <div className="gallery-hero-inner" style={{ position: 'relative', zIndex: 1, width: '100%' }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span
                className="hero-eyebrow-line"
                style={{ display: 'block', width: '40px', height: '2px', background: '#5aaa32', borderRadius: '2px' }}
              />
              <span
                className="hero-eyebrow-text"
                style={{
                  fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#7bc94a', fontFamily: 'Lato, sans-serif',
                }}
              >
                Chapter Events
              </span>
            </div>

            {/* Title */}
            <h1
              className="hero-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 800, color: 'white',
                lineHeight: 1.05, margin: '0 0 20px',
                maxWidth: '680px',
                letterSpacing: '-0.01em',
                textShadow: '0 2px 40px rgba(0,0,0,0.4)',
              }}
            >
              Our Gallery
            </h1>

            {/* Decorative divider */}
            <div
              className="hero-divider"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}
            >
              <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #5aaa32, #7bc94a)', borderRadius: '2px' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5aaa32', animation: 'pulse 2s ease-in-out infinite' }} />
              <div style={{ width: '24px', height: '3px', background: 'rgba(90,170,50,0.4)', borderRadius: '2px' }} />
            </div>

            {/* Subtitle */}
            <p
              className="hero-subtitle"
              style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.85, maxWidth: '560px',
                fontWeight: 300, margin: 0,
                textShadow: '0 1px 12px rgba(0,0,0,0.3)',
              }}
            >
              A visual record of the ISC2 Kenya Chapter's events, volunteer activities,
              and community gatherings, moments that define our mission to secure
              Kenya's digital future.
            </p>

          </div>
        </section>

        {/* ── EVENTS ── */}
        {events.map((event, eIdx) => (
          <section
            key={event.id}
            style={{
              padding: 'clamp(52px, 7vw, 88px) 0',
              background: eIdx % 2 === 0 ? '#f7faf5' : 'white',
              borderTop: '1px solid #e5ede0',
            }}
          >
            <div className="section-wrap">

              {/* Event header */}
              <div className="event-header">
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    marginBottom: '14px', flexWrap: 'wrap',
                  }}>
                    <span className="event-meta-pill">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="11" height="11">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      {event.date}
                    </span>
                    <span className="event-meta-pill" style={{ background: 'rgba(26,58,110,0.07)', borderColor: 'rgba(26,58,110,0.18)', color: '#1a3a6e' }}>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="11" height="11">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {event.location}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 700, color: '#1a3a6e',
                    margin: '0 0 14px', lineHeight: 1.2,
                  }}>
                    {event.title}
                  </h2>

                  <p style={{
                    fontSize: 'clamp(0.86rem, 1.7vw, 0.94rem)',
                    color: '#4b5563', lineHeight: 1.85,
                    fontWeight: 300, maxWidth: '620px', margin: 0,
                  }}>
                    {event.description}
                  </p>
                </div>

                {/* Photo count badge */}
                <div
                  className="stat-card"
                  style={{
                    flexShrink: 0, alignSelf: 'flex-start',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '14px',
                    padding: '18px 26px',
                    textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  }}
                >
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.2rem', fontWeight: 700, color: '#5aaa32',
                    lineHeight: 1,
                  }}>
                    {event.photos.length}
                  </div>
                  <div style={{
                    fontSize: '0.7rem', color: '#9ca3af',
                    fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginTop: '5px',
                    fontFamily: 'Lato, sans-serif',
                  }}>
                    {event.photos.length === 1 ? 'Photo' : 'Photos'}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, #5aaa32 0%, #e8f0e0 100%)',
                marginBottom: 'clamp(28px, 4vw, 40px)',
                borderRadius: '1px',
              }} />

              {/* Photo grid */}
              <div className="gallery-grid">
                {event.photos.map((photo, pIdx) => (
                  <PhotoCard
                    key={pIdx}
                    photo={photo}
                    index={pIdx}
                    onClick={() => openLightbox(eIdx, pIdx)}
                  />
                ))}
              </div>

              {/* Hint */}
              <p
                className="hint-text"
                style={{
                  textAlign: 'center', marginTop: '24px',
                  fontSize: '0.78rem', color: '#b0bec5',
                  fontFamily: 'Lato, sans-serif', fontWeight: 300,
                  letterSpacing: '0.06em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" style={{ opacity: 0.5 }}>
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                Click any photo to view full size
              </p>

            </div>
          </section>
        ))}

        {/* ── BOTTOM CTA ── */}
        <section style={{
          position: 'relative',
          padding: 'clamp(52px, 8vw, 88px) 0',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* bg-tech.jpg background reused */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${bgTech})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            filter: 'brightness(0.55) saturate(1.1)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(4,8,30,0.8) 0%, rgba(10,30,60,0.7) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05,
            backgroundImage: 'linear-gradient(rgba(90,170,50,1) 1px, transparent 1px), linear-gradient(90deg, rgba(90,170,50,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 48px)' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(90,170,50,0.15)',
              border: '1px solid rgba(90,170,50,0.35)',
              borderRadius: '100px',
              padding: '5px 18px',
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#7bc94a', fontFamily: 'Lato, sans-serif',
              marginBottom: '20px',
            }}>
              Join the Community
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
              fontWeight: 700, color: 'white',
              margin: '0 0 16px', lineHeight: 1.15,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}>
              Be Part of the Next Chapter
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(0.86rem, 1.7vw, 0.96rem)',
              lineHeight: 1.8, maxWidth: '460px',
              margin: '0 auto 30px',
              fontWeight: 300, fontFamily: 'Lato, sans-serif',
            }}>
              Join the ISC2 Kenya Chapter and be present at our next event.
              Together we are building a stronger cybersecurity community.
            </p>
            <a
              href="/membership"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#5aaa32', color: 'white',
                padding: '14px 32px', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.92rem',
                textDecoration: 'none', fontFamily: 'Lato, sans-serif',
                transition: 'all 0.25s ease',
                boxShadow: '0 6px 24px rgba(90,170,50,0.45)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#3d7a1f'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(90,170,50,0.55)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#5aaa32'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(90,170,50,0.45)'
              }}
            >
              <svg viewBox="0 0 20 20" fill="white" width="15" height="15">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
              Become a Member
            </a>
          </div>
        </section>

      </main>

      {lightbox && currentPhoto && (
        <Lightbox
          photo={currentPhoto}
          onClose={closeLightbox}
          onNext={lbNext}
          onPrev={lbPrev}
          goTo={lbGoTo}
          total={events[lightbox.eventIdx].photos.length}
          current={lightbox.photoIdx}
        />
      )}
    </>
  )
}

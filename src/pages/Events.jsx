import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import bgTech from '../assets/bg-tech.jpg'
import summitFlyer from '../assets/summit-flyer.jpg'

// ── REAL past events from ISC2 Kenya Annual Report 2025 ──
const PAST = [
  {
    title: 'Annual Chapter Networking Dinner',
    date: '2025',
    type: 'In-Person',
    desc: 'A formal chapter dinner that fostered professional networking and strengthened community ties among ISC2 Kenya members and cybersecurity professionals.',
    icon: 'fas fa-utensils',
    color: '#dc2626',
  },
  {
    title: 'Security Awareness & SAFE Training (Golf Clubs)',
    date: '2025',
    type: 'Outreach',
    desc: 'Security Awareness & SAFE training sessions delivered at leading golf clubs in Nairobi, expanding cybersecurity awareness beyond traditional technical circles.',
    icon: 'fas fa-shield-alt',
    color: '#b45309',
  },
  {
    title: 'Security Awareness & SAFE Training (Church)',
    date: '2025',
    type: 'Outreach',
    desc: "Community-focused cybersecurity awareness session delivered at a local church, reaching non-technical audiences and broadening the chapter's public outreach.",
    icon: 'fas fa-hands-helping',
    color: '#7c3aed',
  },
  {
    title: 'Monthly Webinar Series',
    date: '2025 (Ongoing)',
    type: 'Webinar',
    desc: 'A series of monthly webinars on topical cybersecurity events, announced via WhatsApp and LinkedIn. Topics covered current threats, certifications, and career development.',
    icon: 'fas fa-video',
    color: '#2a5298',
  },
  {
    title: 'Membership Drive (USIU)',
    date: '2025',
    type: 'Outreach',
    desc: 'Membership drive and career guidance session at United States International University (USIU), reaching students and introducing them to the ISC2 CC certification pathway.',
    icon: 'fas fa-university',
    color: '#5aaa32',
  },
  {
    title: 'Membership Drive (JOOUST)',
    date: '2025',
    type: 'Outreach',
    desc: 'Outreach session at Jaramogi Oginga Odinga University of Science and Technology (JOOUST), collectively reaching 70+ students across USIU and JOOUST combined.',
    icon: 'fas fa-university',
    color: '#0891b2',
  },
]

const TYPE_COLORS = {
  'In-Person': { bg: 'rgba(220,38,38,0.1)',  color: '#dc2626' },
  Outreach:    { bg: 'rgba(180,83,9,0.1)',   color: '#b45309' },
  Webinar:     { bg: 'rgba(42,82,152,0.1)',  color: '#2a5298' },
  Workshop:    { bg: 'rgba(124,58,237,0.1)', color: '#7c3aed' },
}

function useInView() {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, v]
}

export default function Events() {
  const [pastRef, pastIn]   = useInView()
  const [upcomRef, upcomIn] = useInView()

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.5} }

        .past-card {
          background: white;
          border-radius: 16px;
          padding: 24px 22px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .past-card:hover {
          transform: translateY(-4px);
          border-color: #5aaa32;
          box-shadow: 0 12px 36px rgba(90,170,50,0.12);
        }

        .btn-g {
          background: #5aaa32; color: white; padding: 13px 28px;
          border-radius: 8px; font-weight: 600; font-size: 0.9rem;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s; text-decoration: none; border: none; cursor: pointer;
        }
        .btn-g:hover { background: #3d7a1f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(90,170,50,0.38); }

        .btn-o {
          background: transparent; color: #1a3a6e; padding: 13px 28px;
          border-radius: 8px; font-weight: 600; font-size: 0.9rem;
          border: 2px solid #1a3a6e; display: inline-flex; align-items: center;
          gap: 8px; transition: all 0.25s; text-decoration: none; cursor: pointer;
        }
        .btn-o:hover { background: #1a3a6e; color: white; transform: translateY(-2px); }

        .stag {
          font-size: 0.74rem; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: #3d7a1f; margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .stag::before { content: ''; display: block; width: 24px; height: 2px; background: #5aaa32; }

        /* Summit card — image on top, full width, never cropped */
        .summit-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 40px rgba(26,58,110,0.10);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .summit-card:hover {
          box-shadow: 0 16px 56px rgba(26,58,110,0.16);
          transform: translateY(-3px);
        }

        /* KEY FIX: width:100%, height:auto, object-fit:contain = never cropped */
        .summit-card-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          background: #0a1440;
        }

        .summit-card-body {
          padding: clamp(20px, 4vw, 40px);
        }

        .summit-badges {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .summit-detail-row {
          display: flex;
          gap: clamp(12px, 3vw, 24px);
          flex-wrap: wrap;
          margin-bottom: 0;
        }

        .summit-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .cohosts-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8faf6;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .past-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .stay-strip {
          margin-top: 24px;
          background: white;
          border-radius: 14px;
          padding: 18px 24px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .social-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .past-grid            { grid-template-columns: 1fr !important; }
          .summit-cta-row       { flex-direction: column !important; }
          .summit-cta-row a     { justify-content: center !important; width: 100%; box-sizing: border-box; }
          .stay-strip           { flex-direction: column !important; align-items: flex-start !important; }
          .summit-detail-row    { flex-direction: column !important; gap: 10px !important; }
          .social-links         { width: 100%; }
        }
      `}</style>

      <main style={{ paddingTop: '68px' }}>

        {/* ── HERO ── */}
        <section style={{
          background: `linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`,
          padding: '80px 0 72px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(90,170,50,0.2)', border: '1px solid rgba(90,170,50,0.4)',
              color: '#90e060', padding: '5px 14px', borderRadius: '100px',
              fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>
              <i className="fas fa-calendar-alt" /> Events
            </div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: '18px' }}>
              Chapter<br /><span style={{ color: '#7bc94a' }}>Events & Activities</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, fontWeight: 300 }}>
              From in-person summits to university outreach and monthly webinars, there is always something happening in the ISC2 Kenya community.
            </p>
          </div>
        </section>

        {/* ── UPCOMING EVENT ── */}
        <section ref={upcomRef} style={{ padding: 'clamp(48px,7vw,80px) 0', background: '#f8faf6' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>

            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>Upcoming</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827' }}>Upcoming Events</h2>
            </div>

            {/* Summit card */}
            <div
              className="summit-card"
              style={{ opacity: upcomIn ? 1 : 0, animation: upcomIn ? 'cardIn 0.7s ease both' : 'none' }}
            >
              {/* Full image — never cropped, full width */}
              <img
                src={summitFlyer}
                alt="AI, Cybersecurity & Data Summit — ISC2 Kenya Chapter & Data Breed Africa"
                className="summit-card-img"
              />

              {/* Details below image */}
              <div className="summit-card-body">

                {/* Badges */}
                <div className="summit-badges">
                  <span style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: '100px' }}>
                    <i className="fas fa-building" style={{ marginRight: '5px' }} />In-Person
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(234,179,8,0.12)', color: '#b45309', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: '100px' }}>
                    <i className="fas fa-clock" style={{ fontSize: '0.65rem' }} /> Date TBC
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>
                    Co-hosted with Data Breed Africa
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 'clamp(1.15rem,2.5vw,1.55rem)', fontWeight: 800, color: '#1a3a6e', lineHeight: 1.25, marginBottom: '6px' }}>
                  AI, Cybersecurity &amp; Data Summit
                </h3>
                <p style={{ fontSize: '1rem', fontWeight: 500, color: '#374151', marginBottom: '20px' }}>
                  Presented by ISC2 Kenya Chapter &amp; Data Breed Africa
                </p>

                {/* Postponed notice */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.35)',
                  borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
                }}>
                  <i className="fas fa-exclamation-circle" style={{ color: '#b45309', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
                      Event Postponed
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.65 }}>
                      This summit has been postponed. Originally scheduled for <strong>7th May 2026</strong> at Parklands SportsClub (2:00 pm – 8:00 pm). A new date will be announced soon , follow our channels to stay updated.
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.8, marginBottom: '20px' }}>
                  A premier in-person summit bringing together cybersecurity professionals, AI practitioners, and data experts across Kenya and the region. Expect thought leadership sessions, expert panels, and networking with industry leaders, all focused on the intersection of AI, data, and cybersecurity in Africa.
                </p>

                {/* Co-hosts */}
                <div className="cohosts-row">
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Co-hosted by:</div>
                  <span style={{ background: 'rgba(10,20,60,0.08)', color: '#1a3a6e', fontSize: '0.78rem', fontWeight: 700, padding: '4px 12px', borderRadius: '8px' }}>
                    ISC2 Kenya Chapter
                  </span>
                  <span style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', fontSize: '0.78rem', fontWeight: 700, padding: '4px 12px', borderRadius: '8px' }}>
                    Data Breed Africa
                  </span>
                </div>

                {/* Date / time / venue */}
                <div className="summit-detail-row">
                  {[
                    { icon: 'fas fa-calendar',       label: 'New date TBC (was 7 May 2026)' },
                    { icon: 'fas fa-clock',          label: '2:00 pm – 8:00 pm EAT' },
                    { icon: 'fas fa-map-marker-alt', label: 'Parklands SportsClub, Nairobi' },
                  ].map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.84rem', color: '#374151' }}>
                      <i className={d.icon} style={{ color: '#5aaa32', width: '14px', flexShrink: 0 }} />
                      {d.label}
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="summit-cta-row">
                  <a href="mailto:info@isc2kenya.com?subject=AI Cybersecurity Data Summit - Notify Me of New Date" className="btn-g">
                    <i className="fas fa-bell" /> Get Notified of New Date
                  </a>
                  <a href="mailto:info@isc2kenya.com?subject=AI Cybersecurity Summit - Sponsorship Enquiry" className="btn-o">
                    <i className="fas fa-handshake" /> Partner With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Stay updated strip */}
            <div className="stay-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-bell" style={{ color: '#5aaa32', fontSize: '1rem' }} />
                <span style={{ fontSize: '0.88rem', color: '#374151', fontWeight: 500 }}>
                  Stay updated, follow us for the new summit date and future announcements
                </span>
              </div>
              <div className="social-links">
                {[
                  { icon: 'fab fa-whatsapp',    color: '#25D366', label: 'WhatsApp',      href: 'https://wa.me/254716973110' },
                  { icon: 'fab fa-linkedin-in', color: '#0A66C2', label: 'LinkedIn',      href: 'https://linkedin.com/company/isc2kenyachapter' },
                  { icon: 'fas fa-globe',       color: '#5aaa32', label: 'Community Hub', href: 'https://community.isc2.org/t5/Kenya-Chapter' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontSize: '0.8rem', color: '#374151', fontWeight: 500,
                      textDecoration: 'none', padding: '6px 14px',
                      background: '#f9fafb', borderRadius: '8px',
                      border: '1px solid #e5e7eb', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151' }}
                  >
                    <i className={s.icon} style={{ color: s.color }} /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PAST EVENTS ── */}
        <section ref={pastRef} style={{ padding: 'clamp(48px,7vw,80px) 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>Archive</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827', marginBottom: '10px' }}>Past Events</h2>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', maxWidth: '480px', margin: '0 auto' }}>
                A selection of confirmed events from the ISC2 Kenya Chapter 2025 Annual Report.
              </p>
            </div>

            <div className="past-grid">
              {PAST.map((p, i) => {
                const tc = TYPE_COLORS[p.type] || TYPE_COLORS['Webinar']
                return (
                  <div
                    key={i}
                    className="past-card"
                    style={{ opacity: pastIn ? 1 : 0, animation: pastIn ? `cardIn 0.5s ease ${i * 0.08}s both` : 'none' }}
                  >
                    <div style={{
                      width: '48px', height: '48px', background: `${p.color}15`,
                      borderRadius: '12px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.1rem', color: p.color, flexShrink: 0,
                    }}>
                      <i className={p.icon} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ background: tc.bg, color: tc.color, fontSize: '0.68rem', fontWeight: 700, padding: '2px 9px', borderRadius: '100px' }}>
                          {p.type}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{p.date}</span>
                      </div>
                      <h3 style={{ fontSize: '0.93rem', fontWeight: 700, color: '#111827', marginBottom: '6px', lineHeight: 1.35 }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              marginTop: '32px', background: 'rgba(90,170,50,0.05)',
              border: '1px solid rgba(90,170,50,0.2)', borderRadius: '12px',
              padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center',
            }}>
              <i className="fas fa-clock" style={{ color: '#5aaa32', flexShrink: 0 }} />
              <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                <strong>Full event archive coming soon.</strong> We are compiling a complete record of all chapter events. If you attended a past event and would like it featured, email us at{' '}
                <a href="mailto:info@isc2kenya.com" style={{ color: '#5aaa32', fontWeight: 600 }}>info@isc2kenya.com</a>.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '72px 0', background: 'linear-gradient(135deg,#1a3a6e,#0a1440)', textAlign: 'center' }}>
          <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'white', marginBottom: '14px' }}>
              Want to Suggest or Sponsor an Event?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '30px', fontWeight: 300 }}>
              We welcome event ideas, guest speakers, and corporate partners who want to engage with Kenya's cybersecurity community.
            </p>
            <Link
              to="/contact"
              style={{
                background: '#5aaa32', color: 'white', padding: '13px 32px',
                borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.25s', textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3d7a1f'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#5aaa32'; e.currentTarget.style.transform = 'none' }}
            >
              <i className="fas fa-envelope" /> Get in Touch
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}

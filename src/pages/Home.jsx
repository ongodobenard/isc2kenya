import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import bgTech from '../assets/bg-tech.jpg'
import stanley from '../assets/stanley.jpeg'
import isc2gether from '../assets/isc2gether-banner.png'   // ← save the image with this name

const heroStats = [
  { num: 60, suffix: "+", label: "Registered Members" },
  { num: 1000, suffix: "+", label: "Students Certified" },
  { num: 500, suffix: "+", label: "LinkedIn Followers" },
  { num: 2020, suffix: "", label: "Est. August" },
]

const benefits = [
  { icon: "fas fa-network-wired", title: "Local Networking & Career Growth", desc: "Connect with influential cybersecurity leaders and peers who understand the Kenyan market. Access curated local job opportunities and build career-defining relationships." },
  { icon: "fas fa-graduation-cap", title: "Earn CPEs Locally", desc: "Maintain your ISC2 certification by earning CPE credits at our frequent local events, workshops, and seminars, no international travel needed." },
  { icon: "fas fa-users", title: "Community & Leadership", desc: "Step up and make a difference. Volunteer for committees, help organize events, or become a mentor. We provide a supportive environment to grow your leadership skills." },
  { icon: "fas fa-book-open", title: "Targeted Study Groups", desc: "Whether pursuing CISSP, CCSP, or CC, our member-led study groups provide support and shared knowledge to help you succeed." },
  { icon: "fas fa-briefcase", title: "Career Opportunities", desc: "Access a members-only job board with curated cybersecurity roles across Kenya. Leverage our professional network to advance your career." },
  { icon: "fas fa-tag", title: "Discounted Events", desc: "Receive special member-only pricing for paid workshops, conferences, and training sessions organised by the chapter throughout the year." },
]

const achievements = [
  { num: 1000, suffix: "+", label: "University students began CC certification journey" },
  { num: 208, suffix: "", label: "Active community participants (up from 50)" },
  { num: 197, suffix: "%", label: "LinkedIn impression growth in 2025" },
  { num: 3, suffix: "", label: "University partnerships established" },
]

// ── Typewriter ──
function useTypewriter(text, speed, startDelay) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    indexRef.current = 0
    timeoutRef.current = setTimeout(() => {
      setDisplayed('')
      setDone(false)
      intervalRef.current = setInterval(() => {
        indexRef.current += 1
        const next = text.slice(0, indexRef.current)
        setDisplayed(next)
        if (indexRef.current >= text.length) {
          clearInterval(intervalRef.current)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ── Counter helper ──
function runCounter(target, duration, setCount) {
  const startTime = performance.now()
  let raf
  const animate = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setCount(Math.floor(eased * target))
    if (progress < 1) {
      raf = requestAnimationFrame(animate)
    } else {
      setCount(target)
    }
  }
  raf = requestAnimationFrame(animate)
  return () => cancelAnimationFrame(raf)
}

// ── Achievement card ──
function AchCard({ num, suffix, label }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          obs.disconnect()
          runCounter(num, 2000, setCount)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [num])

  return (
    <div ref={ref} className="ach-card">
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 700, color: '#3d7a1f' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 'clamp(0.72rem,1.6vw,0.82rem)', color: '#6b7280', marginTop: '6px', lineHeight: 1.5 }}>
        {label}
      </div>
    </div>
  )
}

// ── Hero stat ──
function HeroCount({ num, suffix, label, active }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    return runCounter(num, 2200, setCount)
  }, [active, num])

  return (
    <div style={{ minWidth: '70px' }}>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(1.1rem,2.2vw,1.8rem)', fontWeight: 700, color: '#7bc94a' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 'clamp(0.6rem,1.2vw,0.72rem)', color: 'rgba(255,255,255,0.6)', marginTop: '2px', lineHeight: 1.4 }}>
        {label}
      </div>
    </div>
  )
}

// ── Loader ──
function Loader() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#0a1440', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#5aaa32', borderRightColor: '#5aaa32', animation: 'lspin 1s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#2a5298', borderLeftColor: '#2a5298', animation: 'lspin 0.7s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#5aaa32,#2a5298)', animation: 'lpulse 1s ease-in-out infinite' }} />
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ISC2 Kenya Chapter
      </p>
      <style>{`
        @keyframes lspin { to { transform: rotate(360deg) } }
        @keyframes lpulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.2);opacity:0.7} }
      `}</style>
    </div>
  )
}

// ── Typewriter display ──
function TypewriterText({ displayed }) {
  const greenStart = "Securing Kenya's ".length
  const greenEnd = greenStart + "Digital Future, ".length
  const before = displayed.slice(0, Math.min(displayed.length, greenStart))
  const green = displayed.length > greenStart ? displayed.slice(greenStart, Math.min(displayed.length, greenEnd)) : ''
  const after = displayed.length > greenEnd ? displayed.slice(greenEnd) : ''
  return (
    <>
      {before && <span style={{ color: 'white' }}>{before}</span>}
      {green && <span style={{ color: '#7bc94a' }}>{green}</span>}
      {after && <span style={{ color: 'white' }}>{after}</span>}
    </>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [heroCountStart, setHeroCountStart] = useState(false)
  const [isc2Ref, setIsc2Ref] = useState(null)
  const [isc2In, setIsc2In] = useState(false)

  const fullText = "Securing Kenya's Digital Future, Together."
  const { displayed, done } = useTypewriter(fullText, 100, 800)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setVisible(true), 80)
    }, 2000)
    const t2 = setTimeout(() => setHeroCountStart(true), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // IntersectionObserver for ISC2gether section
  useEffect(() => {
    if (!isc2Ref) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsc2In(true); io.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )
    io.observe(isc2Ref)
    return () => io.disconnect()
  }, [isc2Ref])

  if (loading) return <Loader />

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .hero-section {
          min-height: calc(100vh - 68px);
          display: flex;
          align-items: center;
          background: linear-gradient(135deg,rgba(10,20,60,0.90) 0%,rgba(26,58,110,0.84) 100%);
          padding: 32px 0 24px;
          box-sizing: border-box;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(90,170,50,0.2); border: 1px solid rgba(90,170,50,0.4);
          color: #90e060; padding: 5px 14px; border-radius: 100px;
          font-size: clamp(0.62rem,1.3vw,0.74rem); font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase; margin-bottom: 14px;
        }

        .hero-title { font-size:clamp(1.6rem,4.5vw,3.2rem); line-height:1.18; margin-bottom:14px; font-weight:700; min-height:3.2em; }
        .hero-sub { font-size:clamp(0.82rem,1.6vw,0.96rem); color:rgba(255,255,255,0.82); line-height:1.7; margin-bottom:22px; max-width:500px; font-weight:300; padding-left:2px; }
        .hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .hero-stats { display:flex; gap:clamp(12px,3vw,28px); flex-wrap:wrap; margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.12); }

        .btn-primary { background:#5aaa32; color:white; padding:11px 22px; border-radius:8px; font-weight:600; font-size:clamp(0.8rem,1.8vw,0.9rem); display:inline-flex; align-items:center; gap:8px; transition:all .25s; text-decoration:none; }
        .btn-primary:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,.4); }
        .btn-outline { background:transparent; color:white; padding:11px 22px; border-radius:8px; font-weight:600; font-size:clamp(0.8rem,1.8vw,0.9rem); border:2px solid rgba(255,255,255,.4); display:inline-flex; align-items:center; gap:8px; transition:all .25s; text-decoration:none; }
        .btn-outline:hover { border-color:white; background:rgba(255,255,255,.1); transform:translateY(-2px); }
        .btn-green { background:#5aaa32; color:white; padding:11px 22px; border-radius:8px; font-weight:600; font-size:0.88rem; display:inline-flex; align-items:center; gap:8px; transition:all .25s; text-decoration:none; }
        .btn-green:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,.35); }

        .benefit-card { background:white; border-radius:16px; padding:clamp(16px,2.5vw,26px) clamp(14px,2vw,20px); border:1px solid #e5e7eb; transition:transform .3s,box-shadow .3s,border-color .3s; cursor:default; }
        .benefit-card:hover { transform:translateY(-8px); box-shadow:0 20px 48px rgba(90,170,50,.15); border-color:#5aaa32; }
        .benefit-icon { width:44px; height:44px; background:rgba(90,170,50,.1); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; color:#3d7a1f; margin-bottom:12px; transition:background .3s,transform .3s; }
        .benefit-card:hover .benefit-icon { background:#5aaa32; color:white; transform:scale(1.1); }

        .ach-card { text-align:center; padding:clamp(16px,3.5vw,26px) clamp(10px,2vw,16px); border-radius:16px; background:white; border:1px solid #e5e7eb; transition:transform .3s,box-shadow .3s; cursor:default; }
        .ach-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(90,170,50,.15); }

        /* ISC2gether card */
        .isc2g-card { border-radius:20px; overflow:hidden; border:1px solid #d1e8b0; box-shadow:0 8px 40px rgba(90,170,50,0.12); transition:box-shadow 0.3s,transform 0.3s; }
        .isc2g-card:hover { box-shadow:0 16px 56px rgba(90,170,50,0.2); transform:translateY(-4px); }
        .isc2g-banner { width:100%; display:block; }
        .isc2g-body { background:white; padding:32px 36px; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .btn-isc2g { background:#5aaa32; color:white; padding:13px 28px; border-radius:8px; font-weight:700; font-size:0.9rem; display:inline-flex; align-items:center; gap:8px; transition:all .25s; text-decoration:none; white-space:nowrap; }
        .btn-isc2g:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 28px rgba(90,170,50,0.45); }

        .president-grid    { display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,64px); align-items:center; }
        .benefits-grid     { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(12px,2vw,20px); }
        .achievements-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(12px,2vw,20px); }

        @media(max-width:1024px) {
          .benefits-grid     { grid-template-columns:repeat(2,1fr) !important; }
          .achievements-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:768px) {
          .president-grid    { grid-template-columns:1fr !important; }
          .benefits-grid     { grid-template-columns:repeat(2,1fr) !important; }
          .achievements-grid { grid-template-columns:repeat(2,1fr) !important; }
          .hero-title        { font-size: clamp(1.5rem,6vw,2.4rem) !important; min-height: unset !important; }
          .isc2g-body        { padding: 24px 20px !important; justify-content:center; text-align:center; }
          .isc2g-ctas        { align-items:center !important; }
        }
        @media(max-width:480px) {
          .benefits-grid { grid-template-columns:1fr !important; }
          .hero-btns     { flex-direction:column !important; align-items:stretch !important; }
          .hero-btns a   { justify-content:center !important; }
          .hero-stats    { gap: 14px !important; }
        }
      `}</style>

      <main style={{ paddingTop: '68px' }}>

        {/* ══ HERO ══ */}
        <section
          className="hero-section"
          style={{ backgroundImage: `linear-gradient(135deg,rgba(10,20,60,0.90) 0%,rgba(26,58,110,0.84) 100%),url(${bgTech})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)', width: '100%' }}>
            <div style={{ maxWidth: '660px' }}>
              <div className="hero-badge" style={{ opacity: visible ? 1 : 0, animation: visible ? 'fadeUp 0.6s ease forwards' : 'none' }}>
                <i className="fas fa-shield-halved" /> Official ISC2 Chapter · Kenya
              </div>
              <h1 className="hero-title">
                <TypewriterText displayed={displayed} />
                <span style={{ display: 'inline-block', width: '3px', height: '0.85em', background: '#7bc94a', marginLeft: '3px', verticalAlign: 'middle', animation: done ? 'blink 1s step-end infinite' : 'none' }} />
              </h1>
              <p className="hero-sub" style={{ opacity: visible ? 1 : 0, animation: visible ? 'fadeUp 0.7s ease 0.3s both' : 'none' }}>
                The official hub for ISC2-certified professionals and cybersecurity leaders across Kenya. Connect, grow, and lead with the best in the industry.
              </p>
              <div className="hero-btns" style={{ opacity: visible ? 1 : 0, animation: visible ? 'fadeUp 0.7s ease 0.5s both' : 'none' }}>
                <Link to="/membership" className="btn-primary"><i className="fas fa-user-plus" /> Become a Member</Link>
                <Link to="/about" className="btn-outline"><i className="fas fa-arrow-right" /> Learn About Us</Link>
              </div>
              <div className="hero-stats" style={{ opacity: visible ? 1 : 0, animation: visible ? 'fadeUp 0.7s ease 0.7s both' : 'none' }}>
                {heroStats.map((s, i) => (
                  <HeroCount key={i} num={s.num} suffix={s.suffix} label={s.label} active={heroCountStart} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ ISC2GETHER BANNER ══ */}
        <section ref={el => setIsc2Ref(el)} style={{ padding: 'clamp(44px,6vw,72px) 0', background: '#f0f7eb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

            <div style={{ textAlign: 'center', marginBottom: '28px', opacity: isc2In ? 1 : 0, animation: isc2In ? 'fadeUp 0.6s ease both' : 'none' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d7a1f', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ display: 'block', width: '24px', height: '2px', background: '#5aaa32' }} />
                Global Initiative
                <span style={{ display: 'block', width: '24px', height: '2px', background: '#5aaa32' }} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#111827' }}>We're Part of Something Bigger</h2>
            </div>

            <div className="isc2g-card" style={{ opacity: isc2In ? 1 : 0, animation: isc2In ? 'fadeUp 0.7s ease 0.15s both' : 'none' }}>
              {/* Banner image */}
              <img
                src={isc2gether}
                alt="ISC2gether April 2026 : Volunteer today, shape tomorrow"
                className="isc2g-banner"
              />

              {/* Body */}
              <div className="isc2g-body">
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(90,170,50,0.12)', color: '#3d7a1f', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>
                      April 2026
                    </span>
                    <span style={{ background: 'rgba(42,82,152,0.1)', color: '#2a5298', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>
                      Global Event
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1rem,2.2vw,1.3rem)', fontWeight: 800, color: '#1a3a6e', marginBottom: '8px' }}>
                    ISC2gether : Volunteer Today, Shape Tomorrow
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.75, maxWidth: '560px', margin: 0 }}>
                    ISC2gether is a global volunteer initiative bringing ISC2 members and chapters together in April 2026. As the <strong>ISC2 Kenya Chapter</strong>, we are proud to take part, join us in giving back to our community and shaping the future of cybersecurity in Kenya and beyond.
                  </p>
                </div>

                <div className="isc2g-ctas" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                  <a href="https://www.isc2.org/landing/isc2gether" target="_blank" rel="noreferrer" className="btn-isc2g">
                    <i className="fas fa-hands-helping" /> Get Involved
                  </a>
                  <Link to="/membership" style={{ fontSize: '0.82rem', color: '#5aaa32', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#3d7a1f'}
                    onMouseLeave={e => e.currentTarget.style.color = '#5aaa32'}>
                    <i className="fas fa-user-plus" style={{ fontSize: '0.78rem' }} /> Volunteer with Kenya Chapter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PRESIDENT ══ */}
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: '#f8faf6' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
            <div className="president-grid">
              <div style={{ position: 'relative', maxWidth: '460px', margin: '0 auto', width: '100%', animation: 'slideLeft 0.8s ease both' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '-12px', right: '12px', bottom: '12px', border: '3px solid #5aaa32', borderRadius: '16px', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.18)' }}>
                  <img src={stanley} alt="Dr. Stanley Chege" style={{ width: '100%', height: 'clamp(240px,36vw,400px)', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '-14px', right: '-14px', zIndex: 2, background: '#5aaa32', color: 'white', padding: '12px 16px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600, textAlign: 'center', boxShadow: '0 8px 24px rgba(90,170,50,0.4)' }}>
                  <strong style={{ display: 'block', fontSize: '0.88rem', marginBottom: '2px' }}>Dr. Stanley Chege</strong>
                  CISSP · President
                </div>
              </div>
              <div style={{ animation: 'slideRight 0.8s ease both' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d7a1f', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'block', width: '24px', height: '2px', background: '#5aaa32' }} />
                  A Word From Our President
                </div>
                <h2 style={{ fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#111827', margin: '0 0 14px' }}>
                  Leading Kenya's Cybersecurity Community
                </h2>
                <blockquote style={{ fontSize: 'clamp(0.84rem,1.8vw,0.96rem)', lineHeight: 1.85, color: '#1f2937', fontStyle: 'italic', borderLeft: '4px solid #5aaa32', paddingLeft: '18px', margin: '0 0 14px', fontWeight: 300 }}>
                  "Welcome to the ISC2 Kenya Chapter. It is my distinct honour to lead this vibrant community of dedicated cybersecurity professionals. In an age where Kenya's digital economy is rapidly expanding, our role in safeguarding data, infrastructure, and privacy has never been more critical."
                </blockquote>
                <p style={{ color: '#6b7280', fontSize: 'clamp(0.84rem,1.8vw,0.92rem)', lineHeight: 1.75, marginBottom: '22px' }}>
                  Whether you are a seasoned CISO, a practicing ethical hacker, a security analyst, or an associate beginning your journey, you have a home here.
                </p>
                <Link to="/about" className="btn-green">Meet the Full Team <i className="fas fa-arrow-right" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHY JOIN ══ */}
        <section style={{ padding: 'clamp(44px,7vw,72px) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
            <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto clamp(28px,4vw,44px)' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d7a1f', marginBottom: '10px' }}>Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#111827', marginBottom: '10px' }}>Benefits of Joining the Kenya Chapter</h2>
              <p style={{ fontSize: '0.91rem', color: '#6b7280', lineHeight: 1.7, fontWeight: 300 }}>Beyond your global ISC2 membership, our chapter offers tangible local advantages for the Kenyan market.</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((b, i) => (
                <div key={i} className="benefit-card" style={{ animation: `cardIn 0.5s ease ${i * 0.08}s both` }}>
                  <div className="benefit-icon"><i className={b.icon} /></div>
                  <h3 style={{ fontSize: 'clamp(0.86rem,1.8vw,0.93rem)', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{b.title}</h3>
                  <p style={{ fontSize: 'clamp(0.8rem,1.6vw,0.86rem)', color: '#6b7280', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ACHIEVEMENTS ══ */}
        <section style={{ padding: 'clamp(44px,7vw,64px) 0', background: '#f8faf6' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,3.5vw,36px)' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d7a1f', marginBottom: '10px' }}>Our Impact in 2025</div>
              <h2 style={{ fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#111827' }}>Chapter Highlights</h2>
            </div>
            <div className="achievements-grid">
              {achievements.map((a, i) => (
                <AchCard key={i} num={a.num} suffix={a.suffix} label={a.label} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

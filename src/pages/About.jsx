import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import bgTech from '../assets/tech.jpg'
import stanley from '../assets/stanley.jpeg'
import francis from '../assets/francis.jpeg'
import sammy   from '../assets/sammy.jpeg'
import agnes   from '../assets/agnes.jpeg'
import harvey  from '../assets/harvey.jpeg'
import robert  from '../assets/robert.jpeg'
import alex    from '../assets/alex.jpeg'

const HERO_TEXT = "Founded in 2020, we are the official local chapter of ISC2 in Kenya, a community built to connect, educate, and elevate cybersecurity professionals across the nation."

const BOARD = [
  { name: 'Dr. Stanley Chege',     role: 'President',           cert: 'CISSP',    img: stanley, linkedin: 'https://www.linkedin.com/in/dr-stanley-mwangi-chege-phd-569b3717/', bio: 'Cybersecurity leader with over 15 years of experience. Also serves globally on the ISC2 Chapter Regional Management Committee, representing East Africa and helping shape international chapter strategy.' },
  { name: 'Francis Mwangi Wokabi', role: 'Vice President',      cert: 'CISSP',    img: francis, linkedin: 'https://www.linkedin.com/in/francis-mwangi-55063530/',              bio: 'Experienced cybersecurity professional supporting chapter leadership and strategic direction for the 2025–2026 term.' },
  { name: 'Sammy Ndirangu Muraya', role: 'Treasurer',           cert: 'CC',       img: sammy,   linkedin: null,                                                                 bio: 'Oversees chapter financial governance including banking, M-Pesa payments, and ensuring full financial transparency and compliance.' },
  { name: 'Agnes Onyango-Abuje',   role: 'Secretary',           cert: 'CISSP',    img: agnes,   linkedin: 'https://www.linkedin.com/in/agnes-onyango-abuje-708ba01/',           bio: 'Manages chapter records, coordinates leadership meetings, and ensures smooth communication across the board and membership.' },
  { name: 'Harvey Sijenyi',        role: 'Assistant Secretary', cert: '—',        img: harvey,  linkedin: 'https://www.linkedin.com/in/harvey-sijenyi/',                        bio: 'Supports the secretariat in records management, event coordination, and chapter administration.' },
  { name: 'Robert Wechesi',        role: 'Membership Chair',    cert: 'SSCP, CC', img: robert,  linkedin: 'https://www.linkedin.com/in/robert-w-4188a853/',                     bio: 'Leads membership growth initiatives, manages the member database, and drives engagement across Kenya\'s cybersecurity community.' },
  { name: 'Alex Changara',         role: 'Social Media Chair',  cert: 'CC',       img: alex,    linkedin: 'https://www.linkedin.com/in/changara/',                              bio: 'Drives the chapter\'s digital presence and content strategy — achieving 197.8% LinkedIn impression growth in 2025.' },
]

const TIMELINE = [
  { year: '2020', title: 'Chapter Founded',     desc: 'ISC2 Kenya Chapter was officially established in August 2020, becoming one of the few ISC2 chapters in sub-Saharan Africa.' },
  { year: '2021', title: 'First Events',        desc: 'Launched our inaugural webinar series and established relationships with key cybersecurity stakeholders across Kenya.' },
  { year: '2022', title: 'University Outreach', desc: 'Partnered with Kenyan universities to promote cybersecurity education and the CC certification for students.' },
  { year: '2023', title: '1MCC Campaign',       desc: 'Joined the ISC2 One Million Certified in Cybersecurity (1MCC) programme, offering free CC courses to students.' },
  { year: '2024', title: 'Community Growth',    desc: 'Grew our active community from 50 to over 208 participants and surpassed 500 LinkedIn followers.' },
  { year: '2025', title: 'Chapter Highlights',  desc: 'Certified 300+ students, partnered with CUEA & JOOUST, achieved 197.8% LinkedIn growth, and completed full legal registration with KRA compliance.' },
]

const VALUES = [
  { icon: 'fas fa-shield-alt',     title: 'Integrity',     desc: 'We uphold the highest ethical standards in cybersecurity practice and professional conduct.' },
  { icon: 'fas fa-lightbulb',      title: 'Innovation',    desc: 'We embrace new technologies and approaches to stay ahead of the evolving threat landscape.' },
  { icon: 'fas fa-handshake',      title: 'Collaboration', desc: 'We believe collective knowledge and teamwork create stronger security professionals and safer systems.' },
  { icon: 'fas fa-graduation-cap', title: 'Education',     desc: 'We are committed to continuous learning and sharing knowledge across all experience levels.' },
]

const ACHIEVEMENTS = [
  { icon: 'fas fa-users',          color: '#5aaa32', title: '60 Registered Members',     desc: 'Active chapter membership database with clear pathways for students, professionals, and corporates.' },
  { icon: 'fas fa-graduation-cap', color: '#2a5298', title: '300+ Students in 1MCC',     desc: 'Over 300 university students began their CC certification journey through the 1MCC initiative.' },
  { icon: 'fas fa-university',     color: '#b45309', title: '3 University Partnerships', desc: 'Formal partnerships with CUEA, USIU, and JOOUST to deliver cybersecurity education across Kenya.' },
  { icon: 'fab fa-linkedin-in',    color: '#0A66C2', title: '197.8% LinkedIn Growth',   desc: '23,589 impressions, 1,027 reactions, and 517 total followers by end of 2025.' },
  { icon: 'fas fa-landmark',       color: '#7c3aed', title: 'Legally Registered',        desc: 'Fully registered entity with a KRA PIN, dedicated bank account, and M-Pesa till number.' },
  { icon: 'fas fa-handshake',      color: '#dc2626', title: 'Corporate Partnerships',    desc: 'Partnered with Digital Transformation Experts Ltd to support 1MCC and workforce development.' },
]

// ── Typewriter ──
function TWHero() {
  const displayRef = useRef('')
  const posRef     = useRef(0)
  const ivRef      = useRef(null)
  const toRef      = useRef(null)
  const spanRef    = useRef(null)
  const cursorRef  = useRef(null)

  useEffect(() => {
    posRef.current     = 0
    displayRef.current = ''
    if (spanRef.current)   spanRef.current.textContent   = ''
    if (cursorRef.current) cursorRef.current.style.animation = 'none'

    toRef.current = setTimeout(() => {
      ivRef.current = setInterval(() => {
        posRef.current += 1
        displayRef.current = HERO_TEXT.slice(0, posRef.current)
        if (spanRef.current) spanRef.current.textContent = displayRef.current
        if (posRef.current >= HERO_TEXT.length) {
          clearInterval(ivRef.current)
          if (cursorRef.current) cursorRef.current.style.animation = 'blink 1s step-end infinite'
        }
      }, 28)
    }, 500)
    return () => { clearTimeout(toRef.current); clearInterval(ivRef.current) }
  }, [])

  return (
    <>
      <span ref={spanRef} />
      <span ref={cursorRef} style={{ display:'inline-block', width:'2px', height:'1em', background:'rgba(255,255,255,0.75)', marginLeft:'2px', verticalAlign:'middle' }} />
    </>
  )
}

// ── IntersectionObserver hook ──
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, inView]
}

export default function About() {
  const [missionRef, missionIn] = useInView()
  const [boardRef,   boardIn]   = useInView()
  const [timeRef,    timeIn]    = useInView()
  const [achRef,     achIn]     = useInView()

  return (
    <>
      <style>{`
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideL { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }

        .val-card { background:white; border-radius:16px; padding:32px 24px; border:1px solid #e5e7eb; transition:all 0.3s; cursor:default; text-align:center; }
        .val-card:hover { transform:translateY(-8px); box-shadow:0 20px 48px rgba(90,170,50,0.15); border-color:#5aaa32; }
        .val-ico { width:56px; height:56px; background:rgba(90,170,50,0.1); border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:#3d7a1f; margin:0 auto 16px; transition:all 0.3s; }
        .val-card:hover .val-ico { background:#5aaa32; color:white; transform:rotate(8deg) scale(1.1); }

        .board-card { background:white; border-radius:20px; overflow:hidden; border:1px solid #e5e7eb; transition:all 0.32s; cursor:default; position:relative; }
        .board-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(0,0,0,0.12); border-color:#5aaa32; }
        .board-img { width:100%; height:220px; object-fit:cover; object-position:top; display:block; }

        .li-btn { position:absolute; top:10px; right:10px; width:34px; height:34px; background:#0A66C2; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:0.85rem; text-decoration:none; opacity:0; transition:all 0.25s; transform:translateY(-4px); z-index:2; }
        .board-card:hover .li-btn { opacity:1; transform:translateY(0); }
        .li-btn:hover { background:#004182; transform:scale(1.1) !important; }

        .tl-dot { width:16px; height:16px; border-radius:50%; background:#5aaa32; border:3px solid white; box-shadow:0 0 0 3px #5aaa32; flex-shrink:0; margin-top:4px; transition:transform 0.3s; }
        .tl-item:hover .tl-dot { transform:scale(1.4); }

        .ach-card { background:white; border-radius:14px; padding:24px 20px; border:1px solid #e5e7eb; display:flex; gap:14px; transition:all 0.3s; }
        .ach-card:hover { transform:translateY(-4px); border-color:#5aaa32; box-shadow:0 12px 32px rgba(90,170,50,0.1); }

        .btn-g { background:#5aaa32; color:white; padding:13px 28px; border-radius:8px; font-weight:600; font-size:0.9rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-g:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }
        .btn-o { background:transparent; color:white; padding:13px 28px; border-radius:8px; font-weight:600; font-size:0.9rem; border:2px solid rgba(255,255,255,0.4); display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-o:hover { border-color:white; background:rgba(255,255,255,0.1); transform:translateY(-2px); }

        .stag { font-size:0.74rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#3d7a1f; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        .stag::before { content:''; display:block; width:24px; height:2px; background:#5aaa32; }

        .vals-grid  { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .board-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .mv-grid    { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .ach-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        @media(max-width:1100px) { .board-grid{grid-template-columns:repeat(3,1fr)!important;} .ach-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:1024px) { .vals-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:760px)  { .board-grid{grid-template-columns:repeat(2,1fr)!important;} .mv-grid{grid-template-columns:1fr!important;} .fut-grid{grid-template-columns:1fr!important;} }
        @media(max-width:560px)  { .ach-grid{grid-template-columns:1fr!important;} }
        @media(max-width:480px)  { .board-grid{grid-template-columns:1fr!important;} .vals-grid{grid-template-columns:1fr!important;} }
      `}</style>

      <main style={{ paddingTop: '68px' }}>

        {/* ── HERO ── */}
        <section style={{ background: `linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`, padding: '80px 0 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(90,170,50,0.2)', border: '1px solid rgba(90,170,50,0.4)', color: '#90e060', padding: '5px 14px', borderRadius: '100px', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              <i className="fas fa-users" /> Our Story
            </div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: '22px' }}>
              About ISC2<br /><span style={{ color: '#7bc94a' }}>Kenya Chapter</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.78, fontWeight: 300, minHeight: '80px' }}>
              <TWHero />
            </p>
          </div>
        </section>

        {/* ── MISSION / VISION ── */}
        <section ref={missionRef} style={{ padding: '80px 0', background: '#f8faf6' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div className="mv-grid">
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px 36px', border: '1px solid #e5e7eb', opacity: missionIn ? 1 : 0, animation: missionIn ? 'slideL 0.7s ease both' : 'none' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(90,170,50,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#5aaa32', marginBottom: '20px' }}>
                  <i className="fas fa-bullseye" />
                </div>
                <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#111827', marginBottom: '14px' }}>Our Mission</h2>
                <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  To build a resilient cybersecurity ecosystem in Kenya by serving as a leader in cybersecurity advocacy, education, and community engagement connecting local professionals to share knowledge, grow professionally, and educate their communities.
                </p>
              </div>
              <div style={{ background: '#1a3a6e', borderRadius: '20px', padding: '40px 36px', opacity: missionIn ? 1 : 0, animation: missionIn ? 'slideR 0.7s ease 0.15s both' : 'none' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(90,170,50,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#7bc94a', marginBottom: '20px' }}>
                  <i className="fas fa-eye" />
                </div>
                <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: 'white', marginBottom: '14px' }}>Our Vision</h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  To be the leading hub for cybersecurity professionals in East Africa, aligning with ISC2's global vision of inspiring a safe and secure cyber world, while addressing the unique needs and opportunities of the Kenyan and regional market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR FUTURE ── */}
        <section style={{ padding:'80px 0', background:'white' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'clamp(32px,5vw,64px)', alignItems:'start' }} className="fut-grid">
              <div>
                <div className="stag">Looking Ahead</div>
                <h2 style={{ fontSize:'clamp(1.6rem,3.5vw,2.6rem)', color:'#111827', lineHeight:1.2, marginBottom:'20px' }}>
                  Our Future<br /><span style={{ color:'#5aaa32' }}>Strategic Focus</span>
                </h2>
                <p style={{ fontSize:'0.95rem', color:'#6b7280', lineHeight:1.8 }}>
                  The digital transformation of Kenya is accelerating, and with it, the complexity of the threat landscape. Our future focus is on empowering our members to meet these challenges head-on.
                </p>
                <div style={{ marginTop:'28px', padding:'20px 24px', background:'rgba(90,170,50,0.06)', borderLeft:'4px solid #5aaa32', borderRadius:'0 12px 12px 0' }}>
                  <p style={{ fontSize:'0.9rem', color:'#374151', lineHeight:1.75, margin:0, fontStyle:'italic' }}>
                    "Inspiring a safe and secure cyber world, one Kenyan professional at a time."
                  </p>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {[
                  { icon:'fas fa-chalkboard-teacher', color:'#5aaa32', title:'Expanding Professional Development', desc:'Delivering world-class workshops, training sessions, and study groups focused on emerging areas like AI security, cloud security (CCSP), and risk management, tailored to the Kenyan context.' },
                  { icon:'fas fa-network-wired',      color:'#2a5298', title:'Driving Community Engagement',       desc:'Increasing the frequency and reach of our meetups and events in Nairobi, Thika, and other regions to foster stronger networks and peer-to-peer collaboration.' },
                  { icon:'fas fa-landmark',           color:'#b45309', title:'Public & Private Sector Partnerships', desc:'Building strong alliances with government bodies, academic institutions, and leading private enterprises to influence policy, share threat intelligence, and promote cybersecurity awareness nationwide.' },
                  { icon:'fas fa-user-graduate',      color:'#7c3aed', title:'Mentoring the Next Generation',      desc:'Establishing a formal mentorship programme to guide students and associates, ensuring a sustainable pipeline of cybersecurity talent for Kenya\'s future.' },
                ].map((g, i) => (
                  <div key={i} style={{ display:'flex', gap:'16px', alignItems:'flex-start', background:'#f9fafb', borderRadius:'14px', padding:'20px', border:'1px solid #e5e7eb', transition:'all 0.3s', cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#5aaa32'; e.currentTarget.style.background='white'; e.currentTarget.style.boxShadow='0 8px 28px rgba(90,170,50,0.1)'; e.currentTarget.style.transform='translateX(6px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#e5e7eb'; e.currentTarget.style.background='#f9fafb'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                    <div style={{ width:'42px', height:'42px', background:`${g.color}15`, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', color:g.color, flexShrink:0 }}>
                      <i className={g.icon} />
                    </div>
                    <div>
                      <h3 style={{ fontSize:'0.92rem', fontWeight:700, color:'#111827', marginBottom:'5px' }}>{g.title}</h3>
                      <p style={{ fontSize:'0.84rem', color:'#6b7280', lineHeight:1.7, margin:0 }}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section style={{ padding: '80px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>Core Values</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827' }}>What We Stand For</h2>
            </div>
            <div className="vals-grid">
              {VALUES.map((v, i) => (
                <div key={i} className="val-card" style={{ animation: `cardIn 0.5s ease ${i * 0.1}s both` }}>
                  <div className="val-ico"><i className={v.icon} /></div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.87rem', color: '#6b7280', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HISTORY TIMELINE ── */}
        <section ref={timeRef} style={{ padding: '80px 0', background: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>Our Journey</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827' }}>Chapter History</h2>
            </div>
            <div style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: '32px', position: 'relative' }}>
              {TIMELINE.map((t, i) => (
                <div key={i} className="tl-item" style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative', opacity: timeIn ? 1 : 0, animation: timeIn ? `fadeUp 0.5s ease ${i * 0.12}s both` : 'none' }}>
                  <div style={{ position: 'absolute', left: '-41px', top: '4px' }}>
                    <div className="tl-dot" />
                  </div>
                  <div>
                    <span style={{ background: '#5aaa32', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.06em' }}>{t.year}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: '8px 0 6px' }}>{t.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.7 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOARD ── */}
        <section ref={boardRef} style={{ padding: '80px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>Leadership</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827', marginBottom: '12px' }}>2025–2026 Board of Directors</h2>
              <p style={{ fontSize: '0.93rem', color: '#6b7280', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                Our elected board took office in August 2025, committed to values-driven leadership and growing Kenya's cybersecurity ecosystem.
              </p>
            </div>
            <div className="board-grid">
              {BOARD.map((m, i) => (
                <div key={i} className="board-card" style={{ opacity: boardIn ? 1 : 0, animation: boardIn ? `cardIn 0.5s ease ${i * 0.1}s both` : 'none' }}>
                  {/* LinkedIn icon — appears on hover */}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="li-btn" title={`${m.name} on LinkedIn`}>
                      <i className="fab fa-linkedin-in" />
                    </a>
                  )}
                  <img src={m.img} alt={m.name} className="board-img" />
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '0.93rem', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{m.name}</h3>
                      {m.cert !== '—' && (
                        <span style={{ background: 'rgba(90,170,50,0.1)', color: '#3d7a1f', fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>{m.cert}</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#5aaa32', fontWeight: 600, marginBottom: '8px' }}>{m.role}</p>
                    <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{m.bio}</p>
                    {/* LinkedIn link at bottom */}
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer"
                        style={{ display:'inline-flex', alignItems:'center', gap:'6px', marginTop:'10px', fontSize:'0.78rem', fontWeight:600, color:'#0A66C2', textDecoration:'none', transition:'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity='0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                        <i className="fab fa-linkedin-in" /> View on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '28px', background: 'rgba(90,170,50,0.06)', border: '1px solid rgba(90,170,50,0.2)', borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <i className="fas fa-info-circle" style={{ color: '#5aaa32', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                <strong>Note:</strong> Dr. Stanley Chege also serves globally on the <strong>ISC2 Chapter Regional Management Committee</strong>, representing East Africa and helping shape chapter strategy at the international level.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2025 ACHIEVEMENTS ── */}
        <section ref={achRef} style={{ padding: '72px 0', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="stag" style={{ justifyContent: 'center' }}>2025 Annual Report</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#111827' }}>What We Achieved in 2025</h2>
            </div>
            <div className="ach-grid">
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} className="ach-card" style={{ opacity: achIn ? 1 : 0, animation: achIn ? `cardIn 0.5s ease ${i * 0.08}s both` : 'none' }}>
                  <div style={{ width: '44px', height: '44px', background: `${a.color}18`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: a.color, flexShrink: 0 }}>
                    <i className={a.icon} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '5px' }}>{a.title}</h3>
                    <p style={{ fontSize: '0.83rem', color: '#6b7280', lineHeight: 1.65 }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '72px 0', background: 'linear-gradient(135deg,#1a3a6e,#0a1440)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'white', marginBottom: '14px' }}>Ready to Join the Community?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '32px', fontWeight: 300 }}>
              Whether you are already certified or just starting your cybersecurity journey, there is a place for you in the ISC2 Kenya Chapter.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/membership" className="btn-g"><i className="fas fa-user-plus" /> Become a Member</Link>
              <Link to="/contact"    className="btn-o"><i className="fas fa-envelope" /> Get in Touch</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

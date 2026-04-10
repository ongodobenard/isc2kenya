import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import bgTech from '../assets/bg-tech.jpg'

// ── REAL universities from Annual Report 2025 ──
const UNIS = [
  {
    name: 'CUEA',
    full: 'Catholic University of Eastern Africa',
    status: 'Formal Partner',
    statusColor: '#5aaa32',
    icon: 'fas fa-university',
    desc: 'A formal 1MCC partnership was established with CUEA to align cybersecurity education with industry needs and support Kenya\'s digital workforce.',
  },
  {
    name: 'USIU',
    full: 'United States International University',
    status: 'Active Outreach',
    statusColor: '#2a5298',
    icon: 'fas fa-university',
    desc: 'Membership drives and career guidance sessions have been conducted at USIU, introducing students to the ISC2 CC certification pathway.',
  },
  {
    name: 'JOOUST',
    full: 'Jaramogi Oginga Odinga University of Science & Technology',
    status: 'Partnership in Progress',
    statusColor: '#b45309',
    icon: 'fas fa-university',
    desc: 'The chapter has initiated the process to make JOOUST a formal 1MCC training partner, expanding reach into western Kenya.',
  },
]

const HOW_IT_WORKS = [
  {
    icon: 'fas fa-user-graduate',
    title: 'For Students & Associates',
    items: [
      'Connect with a certified ISC2 mentor in your field',
      'Get guidance on career paths in cybersecurity',
      'Receive study tips and exam preparation advice',
      'Build a professional network from early in your career',
      'Access free CC certification course materials via 1MCC',
    ],
  },
  {
    icon: 'fas fa-user-tie',
    title: 'For Certified Mentors',
    items: [
      'Give back to the community that supported you',
      'Earn CPE credits for mentorship activities',
      'Develop your leadership and coaching skills',
      'Help shape the future of cybersecurity in Kenya',
      'Be recognised as a chapter mentor on our platforms',
    ],
  },
]

const PROGRAMME = [
  { step:'01', title:'Apply',   desc:'Submit a mentorship application via email indicating whether you are applying as a mentor or mentee, along with your background and goals.' },
  { step:'02', title:'Match',   desc:'Our membership team reviews applications and pairs mentors with mentees based on certifications, career interests, and availability.' },
  { step:'03', title:'Connect', desc:'Matched pairs are introduced via email. Mentors and mentees agree on meeting frequency, format (virtual or in-person), and focus areas.' },
  { step:'04', title:'Grow',    desc:'Engage in regular sessions, attend chapter events together, and work toward career and certification goals over a 6–12 month period.' },
]

const STATS = [
  { num:'1000+', label:'Students in the 1MCC Programme' },
  { num:'3',    label:'University Partnerships' },
  { num:'70+',  label:'Students Reached at USIU & JOOUST' },
  { num:'60+',   label:'Registered Chapter Members' },
]

function useInView() {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } },
      { threshold:0, rootMargin:'0px 0px -50px 0px' }
    )
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, v]
}

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target.replace(/\D/g, ''))
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * num))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start])
  const suffix = target.replace(/[0-9]/g, '')
  return count.toLocaleString() + suffix
}

function StatBox({ num, label, animate, delay }) {
  const displayNum = useCountUp(num, 1800, animate)
  return (
    <div className="stat-box" style={{ opacity:animate?1:0, animation:animate?`cardIn 0.5s ease ${delay}s both`:'none' }}>
      <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,4vw,2.4rem)', fontWeight:700, color:'#3d7a1f' }}>{displayNum}</div>
      <div style={{ fontSize:'0.82rem', color:'#6b7280', marginTop:'6px', lineHeight:1.5 }}>{label}</div>
    </div>
  )
}

export default function Mentorship() {
  const [progRef,  progIn]  = useInView()
  const [uniRef,   uniIn]   = useInView()
  const [statsRef, statsIn] = useInView()
  const [howRef,   howIn]   = useInView()

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideL { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR { from{opacity:0;transform:translateX(32px)}  to{opacity:1;transform:translateX(0)} }

        .uni-card { background:white; border-radius:18px; padding:28px 24px; border:1px solid #e5e7eb; transition:all 0.3s; cursor:default; }
        .uni-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(90,170,50,0.13); border-color:#5aaa32; }

        .how-card { background:white; border-radius:20px; padding:36px 32px; border:1px solid #e5e7eb; transition:all 0.3s; }
        .how-card:hover { box-shadow:0 16px 40px rgba(0,0,0,0.08); border-color:#5aaa32; }

        .prog-num { width:44px; height:44px; background:#5aaa32; border-radius:12px; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0; }

        .stat-box { background:white; border-radius:16px; padding:28px 16px; border:1px solid #e5e7eb; text-align:center; transition:all 0.3s; }
        .stat-box:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(90,170,50,0.12); border-color:#5aaa32; }

        .btn-g { background:#5aaa32; color:white; padding:13px 28px; border-radius:8px; font-weight:600; font-size:0.9rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-g:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }
        .btn-o { background:transparent; color:white; padding:13px 28px; border-radius:8px; font-weight:600; font-size:0.9rem; border:2px solid rgba(255,255,255,0.4); display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-o:hover { border-color:white; background:rgba(255,255,255,0.1); transform:translateY(-2px); }

        .stag { font-size:0.74rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#3d7a1f; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        .stag::before { content:''; display:block; width:24px; height:2px; background:#5aaa32; }

        .how-grid  { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .uni-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }

        @media(max-width:900px)  { .how-grid{grid-template-columns:1fr!important;} .stat-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:700px)  { .uni-grid{grid-template-columns:1fr!important;} }
      `}</style>

      <main style={{ paddingTop:'68px' }}>

        {/* HERO */}
        <section style={{ background:`linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`, padding:'80px 0 72px', textAlign:'center' }}>
          <div style={{ maxWidth:'680px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(90,170,50,0.2)', border:'1px solid rgba(90,170,50,0.4)', color:'#90e060', padding:'5px 14px', borderRadius:'100px', fontSize:'0.74rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'20px' }}>
              <i className="fas fa-hands-helping" /> Mentorship
            </div>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', color:'white', fontWeight:700, lineHeight:1.2, marginBottom:'18px' }}>
              Mentorship &<br /><span style={{ color:'#7bc94a' }}>University Outreach</span>
            </h1>
            <p style={{ fontSize:'clamp(0.9rem,2vw,1.05rem)', color:'rgba(255,255,255,0.78)', lineHeight:1.75, fontWeight:300 }}>
              Connecting experienced cybersecurity professionals with the next generation of talent through mentorship, university partnerships, and the ISC2 1MCC programme.
            </p>
          </div>
        </section>

        {/* STATS — all real from Annual Report */}
        <section ref={statsRef} style={{ padding:'64px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div className="stat-grid">
              {STATS.map((s, i) => (
                <StatBox key={i} num={s.num} label={s.label} animate={statsIn} delay={i * 0.1} />
              ))}
            </div>
            <p style={{ textAlign:'center', fontSize:'0.78rem', color:'#9ca3af', marginTop:'16px' }}>
              * Figures sourced from the ISC2 Kenya Chapter Annual Report 2025
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={howRef} style={{ padding:'80px 0' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>Mentorship Programme</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827' }}>Who Can Participate?</h2>
            </div>
            <div className="how-grid">
              {HOW_IT_WORKS.map((h, i) => (
                <div key={i} className="how-card" style={{ opacity:howIn?1:0, animation:howIn?`${i===0?'slideL':'slideR'} 0.6s ease ${i*0.1}s both`:'none' }}>
                  <div style={{ width:'52px', height:'52px', background:i===0?'rgba(90,170,50,0.1)':'#1a3a6e', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', color:i===0?'#3d7a1f':'#7bc94a', marginBottom:'18px' }}>
                    <i className={h.icon} />
                  </div>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#111827', marginBottom:'16px' }}>{h.title}</h3>
                  <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                    {h.items.map((item, j) => (
                      <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'10px', fontSize:'0.88rem', color:'#4b5563', lineHeight:1.6 }}>
                        <i className="fas fa-check-circle" style={{ color:'#5aaa32', marginTop:'2px', flexShrink:0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMME STEPS */}
        <section ref={progRef} style={{ padding:'80px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth:'800px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>How It Works</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827' }}>The Mentorship Journey</h2>
            </div>
            {PROGRAMME.map((p, i) => (
              <div key={i} style={{ display:'flex', gap:'20px', marginBottom:'28px', alignItems:'flex-start', opacity:progIn?1:0, animation:progIn?`fadeUp 0.5s ease ${i*0.12}s both`:'none' }}>
                <div className="prog-num">{p.step}</div>
                <div style={{ paddingTop:'6px' }}>
                  <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#111827', marginBottom:'6px' }}>{p.title}</h3>
                  <p style={{ fontSize:'0.88rem', color:'#6b7280', lineHeight:1.75, margin:0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UNIVERSITY PARTNERSHIPS — real data only */}
        <section ref={uniRef} style={{ padding:'80px 0' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>University Outreach</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827', marginBottom:'12px' }}>Our University Partners</h2>
              <p style={{ fontSize:'0.93rem', color:'#6b7280', maxWidth:'560px', margin:'0 auto', lineHeight:1.7 }}>
                Through the ISC2 One Million Certified in Cybersecurity (1MCC) programme, we bring free CC certification to students across Kenya. Over <strong>300 students</strong> have begun their CC journey through this initiative.
              </p>
            </div>

            <div className="uni-grid">
              {UNIS.map((u, i) => (
                <div key={i} className="uni-card" style={{ opacity:uniIn?1:0, animation:uniIn?`cardIn 0.5s ease ${i*0.12}s both`:'none' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px', gap:'8px' }}>
                    <div style={{ width:'52px', height:'52px', background:'rgba(90,170,50,0.1)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', color:'#3d7a1f', flexShrink:0 }}>
                      <i className={u.icon} />
                    </div>
                    <span style={{ background:`${u.statusColor}15`, color:u.statusColor, fontSize:'0.7rem', fontWeight:700, padding:'4px 10px', borderRadius:'100px', whiteSpace:'nowrap' }}>
                      {u.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#1a3a6e', marginBottom:'4px' }}>{u.name}</h3>
                  <p style={{ fontSize:'0.8rem', color:'#9ca3af', marginBottom:'12px', fontWeight:500 }}>{u.full}</p>
                  <p style={{ fontSize:'0.85rem', color:'#4b5563', lineHeight:1.7, margin:0 }}>{u.desc}</p>
                </div>
              ))}
            </div>

            {/* Source note */}
            <div style={{ marginTop:'24px', background:'rgba(90,170,50,0.05)', border:'1px solid rgba(90,170,50,0.2)', borderRadius:'12px', padding:'14px 20px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
              <i className="fas fa-info-circle" style={{ color:'#5aaa32', flexShrink:0, marginTop:'2px' }} />
              <p style={{ fontSize:'0.84rem', color:'#4b5563', lineHeight:1.65, margin:0 }}>
                University partnership data sourced from the <strong>ISC2 Kenya Chapter Annual Report 2025</strong>. Is your university not listed? Partner with us to bring the 1MCC programme to your institution.
              </p>
            </div>

            <div style={{ textAlign:'center', marginTop:'28px' }}>
              <a href="mailto:info@isc2kenya.com?subject=University Partnership Inquiry" className="btn-g">
                <i className="fas fa-university" /> Partner With Us
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'72px 0', background:'linear-gradient(135deg,#1a3a6e,#0a1440)', textAlign:'center' }}>
          <div style={{ maxWidth:'580px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'white', marginBottom:'14px' }}>Join the Mentorship Programme</h2>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.95rem', lineHeight:1.75, marginBottom:'30px', fontWeight:300 }}>
              Whether you want to learn from the best or share your expertise, there is a place for you in our mentorship community.
            </p>
            <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
              <a href="mailto:info@isc2kenya.com?subject=Mentorship Programme Application" className="btn-g">
                <i className="fas fa-hands-helping" /> Apply Now
              </a>
              <Link to="/membership" className="btn-o">
                <i className="fas fa-user-plus" /> Become a Member
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

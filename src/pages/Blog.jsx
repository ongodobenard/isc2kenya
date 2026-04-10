import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import bgTech from '../assets/bg-tech.jpg'
import webinarHenry from '../assets/webinar-henry.png'

const POSTS = [
  {
    id: 1, category: 'Certification', readTime: '5 min read', date: 'February 2026',
    title: 'Why Every IT Professional in Kenya Should Pursue the CC Certification',
    excerpt: 'The ISC2 Certified in Cybersecurity (CC) certification is free for anyone to pursue and provides a solid foundation in cybersecurity principles. Here is why it matters for Kenya\'s growing tech workforce.',
    author: 'ISC2 Kenya Team', tags: ['CC', 'Certification', 'Career'],
    color: '#5aaa32',
  },
  {
    id: 2, category: 'Threat Intelligence', readTime: '7 min read', date: 'January 2026',
    title: 'The Evolving Cyber Threat Landscape in East Africa: What You Need to Know',
    excerpt: 'East Africa has seen a sharp rise in ransomware attacks, social engineering campaigns, and financial fraud targeting mobile money platforms. We break down the key threats and how organisations can respond.',
    author: 'Dr. Stanley Chege, CISSP', tags: ['Threats', 'East Africa', 'Ransomware'],
    color: '#2a5298',
  },
  {
    id: 3, category: 'Career', readTime: '6 min read', date: 'December 2025',
    title: 'From IT Support to CISO: A Roadmap for Cybersecurity Careers in Kenya',
    excerpt: 'Building a cybersecurity career in Kenya has never had more opportunity. We outline a practical roadmap from entry-level roles to senior leadership, including which ISC2 certifications to pursue at each stage.',
    author: 'ISC2 Kenya Team', tags: ['Career', 'CISSP', 'Growth'],
    color: '#b45309',
  },
  {
    id: 4, category: 'Events', readTime: '3 min read', date: 'November 2025',
    title: 'Chapter Recap: Cybersecurity Awareness Month 2025',
    excerpt: 'October was a busy month for the ISC2 Kenya Chapter. We hosted three webinars, a university outreach session at USIU, and our annual networking dinner. Here is a full recap of everything that happened.',
    author: 'ISC2 Kenya Team', tags: ['Events', 'Recap', 'Community'],
    color: '#7c3aed',
  },
  {
    id: 5, category: 'Policy', readTime: '8 min read', date: 'October 2025',
    title: 'Kenya\'s Data Protection Act: What Cybersecurity Professionals Need to Know',
    excerpt: 'The Kenya Data Protection Act has significant implications for how organisations handle personal data. We summarise the key provisions and what they mean for security professionals and compliance teams.',
    author: 'ISC2 Kenya Team', tags: ['Policy', 'Compliance', 'DPA'],
    color: '#dc2626',
  },
  {
    id: 6, category: 'Technology', readTime: '6 min read', date: 'September 2025',
    title: 'Cloud Security in Kenya: Adoption Trends and Best Practices for 2026',
    excerpt: 'Kenyan enterprises are rapidly adopting cloud infrastructure. With this shift comes significant security responsibilities. We look at adoption trends and practical guidance for securing cloud environments.',
    author: 'ISC2 Kenya Team', tags: ['Cloud', 'CCSP', 'Best Practices'],
    color: '#0891b2',
  },
]

const CATS = ['All', 'Certification', 'Threat Intelligence', 'Career', 'Events', 'Policy', 'Technology']

function useInView() {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } }, { threshold:0, rootMargin:'0px 0px -40px 0px' })
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, v]
}

export default function Blog() {
  const [active, setActive] = useState('All')
  const [blogsRef, blogsIn] = useInView()
  const [featRef, featIn]   = useInView()

  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.category === active)

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .post-card { background:white; border-radius:20px; overflow:hidden; border:1px solid #e5e7eb; transition:all 0.32s; cursor:pointer; display:flex; flex-direction:column; }
        .post-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(0,0,0,0.1); border-color:#5aaa32; }
        .post-card:hover .post-title { color:#3d7a1f; }
        .post-title { font-size:0.97rem; font-weight:700; color:#111827; line-height:1.45; margin-bottom:10px; transition:color 0.2s; }

        .cat-btn { padding:7px 16px; border-radius:100px; font-size:0.8rem; font-weight:600; border:1.5px solid #e5e7eb; background:white; color:#6b7280; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .cat-btn:hover { border-color:#5aaa32; color:#3d7a1f; }
        .cat-btn.on { background:#5aaa32; color:white; border-color:#5aaa32; }

        .stag { font-size:0.74rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#3d7a1f; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        .stag::before { content:''; display:block; width:24px; height:2px; background:#5aaa32; }

        .blog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }

        .feat-card { background:white; border-radius:24px; overflow:hidden; border:1px solid #e5e7eb; box-shadow:0 8px 40px rgba(26,58,110,0.10); display:grid; grid-template-columns:1fr 420px; }
        .live-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; animation:pulse 1.5s ease infinite; flex-shrink:0; }

        .btn-g { background:#5aaa32; color:white; padding:12px 24px; border-radius:8px; font-weight:600; font-size:0.88rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-g:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }
        .btn-navy { background:transparent; color:#1a3a6e; padding:12px 24px; border-radius:8px; font-weight:600; font-size:0.88rem; border:2px solid #1a3a6e; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-navy:hover { background:#1a3a6e; color:white; transform:translateY(-2px); }

        @media(max-width:900px)  { .blog-grid{grid-template-columns:repeat(2,1fr)!important;} .feat-card{grid-template-columns:1fr!important;} .feat-img{display:none!important;} }
        @media(max-width:560px)  { .blog-grid{grid-template-columns:1fr!important;} }
      `}</style>

      <main style={{ paddingTop:'68px' }}>

        {/* HERO */}
        <section style={{ background:`linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`, padding:'80px 0 72px', textAlign:'center' }}>
          <div style={{ maxWidth:'680px', margin:'0 auto', padding:'0 24px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(90,170,50,0.2)', border:'1px solid rgba(90,170,50,0.4)', color:'#90e060', padding:'5px 14px', borderRadius:'100px', fontSize:'0.74rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'20px' }}>
              <i className="fas fa-pen-nib" /> Blog & Insights
            </div>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', color:'white', fontWeight:700, lineHeight:1.2, marginBottom:'18px' }}>
              Cybersecurity<br /><span style={{ color:'#7bc94a' }}>Insights & Updates</span>
            </h1>
            <p style={{ fontSize:'clamp(0.9rem,2vw,1.05rem)', color:'rgba(255,255,255,0.78)', lineHeight:1.75, fontWeight:300 }}>
              Articles, guides, and industry updates from the ISC2 Kenya Chapter community — written for and by Kenya's cybersecurity professionals.
            </p>
          </div>
        </section>

        {/* ── FEATURED UPCOMING EVENT ── */}
        <section ref={featRef} style={{ padding:'72px 0', background:'#f0f7eb' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>

            <div style={{ textAlign:'center', marginBottom:'32px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>Don't Miss This</div>
              <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', color:'#111827' }}>Featured Upcoming Event</h2>
            </div>

            <div className="feat-card" style={{ opacity:featIn?1:0, animation:featIn?'cardIn 0.7s ease both':'none' }}>

              {/* LEFT — content */}
              <div style={{ padding:'40px', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'24px' }}>
                <div>
                  {/* badges */}
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px', flexWrap:'wrap' }}>
                    <span style={{ background:'rgba(42,82,152,0.1)', color:'#2a5298', fontSize:'0.7rem', fontWeight:700, padding:'4px 12px', borderRadius:'100px' }}>
                      <i className="fas fa-video" style={{ marginRight:'5px' }} />Webinar
                    </span>
                    <span style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(34,197,94,0.1)', color:'#16a34a', fontSize:'0.7rem', fontWeight:700, padding:'4px 12px', borderRadius:'100px' }}>
                      <span className="live-dot" /> Upcoming
                    </span>
                    <span style={{ fontSize:'0.75rem', color:'#9ca3af', fontWeight:500 }}>Free to Attend</span>
                  </div>

                  <h3 style={{ fontSize:'clamp(1.2rem,2.5vw,1.7rem)', fontWeight:800, color:'#1a3a6e', lineHeight:1.2, marginBottom:'6px' }}>
                    The Tier I Paradox
                  </h3>
                  <p style={{ fontSize:'1rem', fontWeight:500, color:'#374151', marginBottom:'16px' }}>
                    Global Role Model, Local Resilience Challenges &amp; Opportunities
                  </p>
                  <p style={{ fontSize:'0.88rem', color:'#6b7280', lineHeight:1.8, marginBottom:'20px' }}>
                    Kenya ranks as a Tier 1 "Role Modelling" nation in the Global Cybersecurity Index 2024 — yet recorded <strong>4.5 billion threat events</strong> in a single quarter and loses <strong>KSh 29.9 billion annually</strong> to cybercrime. Henry Kiiru Cowie unpacks this paradox and explores actionable paths to resilience.
                  </p>

                  {/* speaker chip */}
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'10px 16px', background:'#f8faf6', borderRadius:'12px', border:'1px solid #e5e7eb', marginBottom:'20px' }}>
                    <div style={{ width:'36px', height:'36px', background:'linear-gradient(135deg,#1a3a6e,#2a5298)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'0.82rem', fontWeight:700, flexShrink:0 }}>HK</div>
                    <div>
                      <div style={{ fontSize:'0.83rem', fontWeight:700, color:'#111827' }}>Henry Kiiru Cowie</div>
                      <div style={{ fontSize:'0.74rem', color:'#6b7280' }}>Featured Speaker</div>
                    </div>
                  </div>

                  {/* meta */}
                  <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
                    {[
                      { icon:'fas fa-calendar', label:'Thursday, 5 March 2026' },
                      { icon:'fas fa-clock',    label:'19:00 – 20:00 EAT' },
                      { icon:'fas fa-globe',    label:'Google Meet · Online' },
                    ].map((d, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:'7px', fontSize:'0.82rem', color:'#374151' }}>
                        <i className={d.icon} style={{ color:'#5aaa32', width:'14px' }} />
                        {d.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                  <a href="https://meet.google.com/mpw-vczz-mbw" target="_blank" rel="noreferrer" className="btn-g">
                    <i className="fas fa-video" /> Join the Webinar
                  </a>
                  <a href="mailto:info@isc2kenya.com?subject=Reserve my spot - Tier I Paradox Webinar" className="btn-navy">
                    <i className="fas fa-bell" /> Reserve My Spot
                  </a>
                </div>
              </div>

              {/* RIGHT — flyer */}
              <div className="feat-img" style={{ position:'relative', overflow:'hidden' }}>
                <img
                  src={webinarHenry}
                  alt="The Tier I Paradox Webinar — Henry Kiiru Cowie"
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FILTER + POSTS */}
        <section ref={blogsRef} style={{ padding:'72px 0' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>

            <div style={{ textAlign:'center', marginBottom:'16px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>Articles</div>
              <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', color:'#111827', marginBottom:'28px' }}>Latest Insights</h2>
            </div>

            {/* Category filter */}
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'40px', justifyContent:'center' }}>
              {CATS.map(c => (
                <button key={c} className={`cat-btn${active===c?' on':''}`} onClick={() => setActive(c)}>{c}</button>
              ))}
            </div>

            {/* Grid */}
            <div className="blog-grid">
              {filtered.map((p, i) => (
                <div key={p.id} className="post-card" style={{ animation: blogsIn ? `cardIn 0.5s ease ${i*0.08}s both` : 'none', opacity: blogsIn ? 1 : 0 }}>
                  <div style={{ height:'6px', background: p.color }} />
                  <div style={{ padding:'24px 22px', flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px', flexWrap:'wrap', gap:'8px' }}>
                      <span style={{ background:`${p.color}18`, color: p.color, fontSize:'0.7rem', fontWeight:700, padding:'3px 10px', borderRadius:'100px', letterSpacing:'0.05em' }}>{p.category}</span>
                      <span style={{ fontSize:'0.75rem', color:'#9ca3af' }}>{p.readTime}</span>
                    </div>
                    <h3 className="post-title">{p.title}</h3>
                    <p style={{ fontSize:'0.85rem', color:'#6b7280', lineHeight:1.72, flex:1, marginBottom:'16px' }}>{p.excerpt}</p>
                    <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ background:'#f3f4f6', color:'#6b7280', fontSize:'0.7rem', padding:'2px 8px', borderRadius:'6px' }}>#{t}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'14px', borderTop:'1px solid #f3f4f6' }}>
                      <div>
                        <div style={{ fontSize:'0.78rem', fontWeight:600, color:'#374151' }}>{p.author}</div>
                        <div style={{ fontSize:'0.73rem', color:'#9ca3af' }}>{p.date}</div>
                      </div>
                      <span style={{ color: p.color, fontSize:'0.82rem', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}>
                        Read <i className="fas fa-arrow-right" style={{ fontSize:'0.75rem' }} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'60px 0', color:'#9ca3af' }}>
                <i className="fas fa-search" style={{ fontSize:'2rem', marginBottom:'12px', display:'block' }} />
                No posts in this category yet.
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{ padding:'72px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth:'560px', margin:'0 auto', padding:'0 24px', textAlign:'center' }}>
            <div style={{ width:'56px', height:'56px', background:'rgba(90,170,50,0.1)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', color:'#3d7a1f', margin:'0 auto 20px' }}>
              <i className="fas fa-envelope-open-text" />
            </div>
            <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', color:'#111827', marginBottom:'12px' }}>Stay in the Loop</h2>
            <p style={{ fontSize:'0.93rem', color:'#6b7280', lineHeight:1.75, marginBottom:'28px' }}>
              Get the latest cybersecurity insights, chapter news, and event updates delivered straight to your inbox.
            </p>
            <a href="mailto:info@isc2kenya.com?subject=Newsletter Subscription" style={{ background:'#5aaa32', color:'white', padding:'13px 32px', borderRadius:'8px', fontWeight:600, fontSize:'0.95rem', display:'inline-flex', alignItems:'center', gap:'8px', transition:'all 0.25s', textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.background='#3d7a1f'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#5aaa32'; e.currentTarget.style.transform='none' }}>
              <i className="fas fa-bell" /> Subscribe via Email
            </a>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'72px 0', background:'linear-gradient(135deg,#1a3a6e,#0a1440)', textAlign:'center' }}>
          <div style={{ maxWidth:'560px', margin:'0 auto', padding:'0 24px' }}>
            <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', color:'white', marginBottom:'12px' }}>Want to Write for Us?</h2>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.93rem', lineHeight:1.75, marginBottom:'28px', fontWeight:300 }}>
              We welcome contributions from cybersecurity professionals across Kenya. Share your expertise, research, or career journey with our community.
            </p>
            <Link to="/contact" style={{ background:'#5aaa32', color:'white', padding:'13px 32px', borderRadius:'8px', fontWeight:600, fontSize:'0.95rem', display:'inline-flex', alignItems:'center', gap:'8px', transition:'all 0.25s', textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.background='#3d7a1f'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#5aaa32'; e.currentTarget.style.transform='none' }}>
              <i className="fas fa-pen-nib" /> Submit an Article
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}

import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import bgTech from '../assets/bg-tech.jpg'

const STEPS = [
  { num:'01', icon:'fas fa-globe',    title:'Hold an ISC2 Membership',    desc:'You must be an active ISC2 member or associate. Visit isc2.org to join ISC2 globally first if you have not already done so.' },
  { num:'02', icon:'fas fa-envelope', title:'Contact Us to Apply',         desc:'Send us an email at info@isc2kenya.com with your ISC2 member ID, certification details, and a brief professional background.' },
  { num:'03', icon:'fas fa-credit-card', title:'Pay Chapter Dues',         desc:'Pay the annual chapter dues via M-Pesa or bank transfer. Payment details will be provided upon confirmation. Your membership is valid for one calendar year.' },
]

const BENEFITS = [
  { icon:'fas fa-network-wired',       title:'Professional Networking',     desc:'Connect directly with Kenya\'s most active cybersecurity professionals, leaders, and peers through chapter events and our community group.' },
  { icon:'fas fa-award',               title:'CPE Credits',                 desc:'Earn Continuing Professional Education credits at chapter events, fully recognised by ISC2 toward your certification maintenance.' },
  { icon:'fas fa-users',               title:'Study Groups',                desc:'Join CISSP, CCSP, and CC certification study groups led by experienced certified chapter members.' },
  { icon:'fas fa-chalkboard-teacher',  title:'Exclusive Webinars',          desc:'Access our monthly webinar series on topical cybersecurity events, career development, and emerging threats.' },
  { icon:'fas fa-tag',                 title:'Discounted Events',           desc:'Members receive special pricing on paid chapter events including networking dinners and premium training sessions.' },
  { icon:'fas fa-hands-helping',       title:'Mentorship Programme',        desc:'Be matched with a senior cybersecurity mentor or volunteer to guide the next generation of professionals.' },
  { icon:'fas fa-university',          title:'University Outreach',         desc:'Participate in and support our 1MCC university outreach programme, helping students across Kenya get certified.' },
  { icon:'fas fa-globe-africa',        title:'Regional Recognition',        desc:'Represent Kenya at ISC2 global and regional events as a proud member of the official Kenya Chapter.' },
]

const TIERS = [
  {
    label: 'Student',
    price: '1,000',
    icon: 'fas fa-graduation-cap',
    desc: 'For full-time students pursuing cybersecurity or related fields.',
    features: [
      'Full chapter membership benefits',
      'CPE credits at all chapter events',
      'Study groups — CISSP, CCSP & CC',
      'Monthly webinar access',
      'Discounted event tickets',
      'Networking & mentorship access',
    ],
    highlight: false,
  },
  {
    label: 'Professional Member',
    price: '3,000',
    icon: 'fas fa-briefcase',
    desc: 'For practitioners in IT, cybersecurity, forensics, audit, or governance.',
    features: [
      'Full chapter membership benefits',
      'CPE credits at all chapter events',
      'Study groups — CISSP, CCSP & CC',
      'Monthly webinar access',
      'Discounted event tickets',
      'Networking & mentorship access',
    ],
    highlight: true,
  },
  {
    label: 'Corporate Member',
    price: '5,000',
    icon: 'fas fa-building',
    desc: 'For organisations supporting chapter activities and capacity building.',
    features: [
      'Full chapter membership benefits',
      'CPE credits at all chapter events',
      'Study groups — CISSP, CCSP & CC',
      'Monthly webinar access',
      'Discounted event tickets',
      'Networking & mentorship access',
    ],
    highlight: false,
  },
]

const FAQS = [
  {
    q: 'Do I need a certification to join?',
    a: 'No. You can join as an ISC2 Associate, someone working toward their first ISC2 certification. Students are also welcome through our university outreach programme under the 1MCC initiative.',
  },
  {
    q: 'How much are the chapter dues?',
    a: 'Annual chapter dues range from KES 1,000 for students to KES 3,000 for professionals and KES 5,000 for corporate members. This is separate from your ISC2 global membership fee. We keep dues affordable to encourage broad participation across Kenya.',
  },
  {
    q: 'How do I pay the chapter dues?',
    a: 'Dues can be paid via M-Pesa or bank transfer. Payment details are provided after you contact us to apply. Email info@isc2kenya.com to get started.',
  },
  {
    q: 'What events does the chapter run?',
    a: 'We run monthly webinars, in-person networking dinners, university outreach sessions, and study groups for CISSP, CCSP, and CC certifications. Check our Events page for upcoming sessions.',
  },
  {
    q: 'Can I attend events before becoming a member?',
    a: 'Yes! Many of our events are open to the public. However, members receive priority registration, discounted rates, and access to exclusive member-only sessions.',
  },
  {
    q: 'How do I volunteer or join a committee?',
    a: 'We welcome volunteers! After joining, reach out to us at info@isc2kenya.com expressing your interest. We have committees for events, communications, education, and mentorship.',
  },
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

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom:'1px solid #e5e7eb', overflow:'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:'100%', textAlign:'left', padding:'18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', gap:'16px' }}>
        <span style={{ fontSize:'0.95rem', fontWeight:600, color:'#111827', lineHeight:1.4 }}>{q}</span>
        <span style={{ color:'#5aaa32', fontSize:'1rem', transition:'transform 0.3s', transform:open?'rotate(45deg)':'none', flexShrink:0 }}>
          <i className="fas fa-plus" />
        </span>
      </button>
      <div style={{ maxHeight:open?'200px':'0', overflow:'hidden', transition:'max-height 0.35s ease' }}>
        <p style={{ fontSize:'0.9rem', color:'#6b7280', lineHeight:1.75, paddingBottom:'18px', margin:0 }}>{a}</p>
      </div>
    </div>
  )
}

export default function Membership() {
  const [stepsRef, stepsIn] = useInView()
  const [benRef,   benIn]   = useInView()
  const [faqRef,   faqIn]   = useInView()
  const [pricingRef, pricingIn] = useInView()

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .ben-card { background:white; border-radius:14px; padding:26px 22px; border:1px solid #e5e7eb; transition:all 0.3s; cursor:default; display:flex; gap:16px; align-items:flex-start; }
        .ben-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(90,170,50,0.12); border-color:#5aaa32; }
        .ben-ico { width:44px; height:44px; background:rgba(90,170,50,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:#3d7a1f; flex-shrink:0; transition:all 0.3s; }
        .ben-card:hover .ben-ico { background:#5aaa32; color:white; transform:scale(1.1); }

        .step-card { background:white; border-radius:20px; padding:36px 28px; border:1px solid #e5e7eb; text-align:center; transition:all 0.3s; position:relative; overflow:hidden; }
        .step-card:hover { transform:translateY(-8px); box-shadow:0 20px 48px rgba(90,170,50,0.15); border-color:#5aaa32; }

        .btn-g { background:#5aaa32; color:white; padding:14px 32px; border-radius:8px; font-weight:600; font-size:0.95rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; }
        .btn-g:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }
        .btn-w { background:white; color:#1a3a6e; padding:14px 32px; border-radius:8px; font-weight:600; font-size:0.95rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; text-decoration:none; border:2px solid white; }
        .btn-w:hover { background:transparent; color:white; transform:translateY(-2px); }

        .stag { font-size:0.74rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#3d7a1f; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        .stag::before { content:''; display:block; width:24px; height:2px; background:#5aaa32; }

        .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .bens-grid  { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }

        .pricing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; align-items:start; }

        .tier-card { background:white; border-radius:16px; padding:24px 20px; border:1px solid #e5e7eb; transition:all 0.35s; position:relative; overflow:hidden; display:flex; flex-direction:column; }
        .tier-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(90,170,50,0.14); border-color:#5aaa32; }
        .tier-card.featured { border:2px solid #5aaa32; box-shadow:0 12px 40px rgba(90,170,50,0.18); }
        .tier-card.featured:hover { box-shadow:0 20px 52px rgba(90,170,50,0.28); }

        .tier-badge { position:absolute; top:12px; right:12px; background:#5aaa32; color:white; font-size:0.62rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:3px 9px; border-radius:100px; }

        .tier-icon { width:40px; height:40px; background:rgba(90,170,50,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; color:#3d7a1f; margin-bottom:12px; transition:all 0.3s; }
        .tier-card:hover .tier-icon { background:#5aaa32; color:white; transform:scale(1.08); }

        .tier-price { font-family:'Playfair Display',serif; font-size:clamp(1.7rem,3vw,2.2rem); font-weight:700; color:#3d7a1f; line-height:1; }
        .tier-price-prefix { font-family:'Playfair Display',serif; font-size:0.85rem; font-weight:600; color:#3d7a1f; vertical-align:top; margin-top:4px; display:inline-block; margin-right:2px; }

        .tier-btn { background:#5aaa32; color:white; padding:10px 18px; border-radius:7px; font-weight:600; font-size:0.83rem; display:inline-flex; align-items:center; justify-content:center; gap:7px; transition:all 0.25s; text-decoration:none; width:100%; margin-top:auto; }
        .tier-btn:hover { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }

        @media(max-width:960px) { .pricing-grid{grid-template-columns:1fr!important;max-width:360px;margin-left:auto;margin-right:auto;} .tier-card.featured{transform:none;} }
        @media(max-width:900px) { .steps-grid{grid-template-columns:1fr!important;} }
        @media(max-width:768px) { .bens-grid{grid-template-columns:1fr!important;} }
      `}</style>

      <main style={{ paddingTop:'68px' }}>

        {/* HERO */}
        <section style={{ background:`linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`, padding:'80px 0 72px', textAlign:'center' }}>
          <div style={{ maxWidth:'680px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(90,170,50,0.2)', border:'1px solid rgba(90,170,50,0.4)', color:'#90e060', padding:'5px 14px', borderRadius:'100px', fontSize:'0.74rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'20px' }}>
              <i className="fas fa-id-card" /> Membership
            </div>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', color:'white', fontWeight:700, lineHeight:1.2, marginBottom:'18px' }}>
              Join the<br /><span style={{ color:'#7bc94a' }}>ISC2 Kenya Chapter</span>
            </h1>
            <p style={{ fontSize:'clamp(0.9rem,2vw,1.05rem)', color:'rgba(255,255,255,0.78)', lineHeight:1.75, fontWeight:300, marginBottom:'32px' }}>
              Become part of Kenya's most active cybersecurity professional community. Choose the membership tier that fits you best.
            </p>
            <a href="https://forms.gle/Y53BxmLG3tSThMxQ8" target="_blank" rel="noopener noreferrer" className="btn-g">
              <i className="fas fa-paper-plane" /> Apply Now
            </a>
          </div>
        </section>

        {/* PRICING — 3 TIER CARDS */}
        <section ref={pricingRef} style={{ padding:'80px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>Annual Dues</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827', marginBottom:'10px' }}>Choose Your Membership</h2>
              <p style={{ fontSize:'0.9rem', color:'#6b7280', maxWidth:'480px', margin:'0 auto' }}>All tiers are separate from your ISC2 global membership fee and valid for one calendar year.</p>
            </div>

            <div className="pricing-grid">
              {TIERS.map((tier, i) => (
                <div
                  key={i}
                  className={`tier-card${tier.highlight ? ' featured' : ''}`}
                  style={{
                    opacity: pricingIn ? 1 : 0,
                    animation: pricingIn ? `cardIn 0.5s ease ${i * 0.15}s both` : 'none',
                  }}
                >
                  {tier.highlight && <div className="tier-badge">Most Popular</div>}

                  <div className="tier-icon"><i className={tier.icon} /></div>

                  <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#111827', marginBottom:'4px' }}>{tier.label}</h3>
                  <p style={{ fontSize:'0.78rem', color:'#6b7280', lineHeight:1.55, marginBottom:'14px' }}>{tier.desc}</p>

                  <div style={{ marginBottom:'16px', display:'flex', alignItems:'baseline', gap:'2px' }}>
                    <span className="tier-price-prefix">KES</span>
                    <span className="tier-price">{tier.price}</span>
                    <span style={{ fontSize:'0.75rem', color:'#9ca3af', marginLeft:'4px' }}>/yr</span>
                  </div>

                  <div style={{ marginBottom:'20px' }}>
                    {tier.features.map((item, j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'5px 0', borderBottom:'1px solid #f3f4f6', fontSize:'0.8rem', color:'#374151' }}>
                        <i className="fas fa-check-circle" style={{ color:'#5aaa32', fontSize:'0.8rem', flexShrink:0 }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <a href="https://forms.gle/Y53BxmLG3tSThMxQ8" target="_blank" rel="noopener noreferrer" className="tier-btn">
                    <i className="fas fa-user-plus" /> Apply for Membership
                  </a>

                  <p style={{ fontSize:'0.7rem', color:'#9ca3af', marginTop:'10px', textAlign:'center' }}>
                    Pay via M-Pesa or bank transfer
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO JOIN */}
        <section ref={stepsRef} style={{ padding:'80px 0' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>How It Works</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827' }}>3 Simple Steps to Join</h2>
            </div>
            <div className="steps-grid">
              {STEPS.map((s, i) => (
                <div key={i} className="step-card" style={{ opacity:stepsIn?1:0, animation:stepsIn?`cardIn 0.5s ease ${i*0.15}s both`:'none' }}>
                  <div style={{ position:'absolute', top:'16px', right:'20px', fontFamily:'Playfair Display,serif', fontSize:'2.5rem', fontWeight:700, color:'rgba(90,170,50,0.08)' }}>{s.num}</div>
                  <div style={{ width:'56px', height:'56px', background:'rgba(90,170,50,0.1)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', color:'#3d7a1f', margin:'0 auto 18px' }}>
                    <i className={s.icon} />
                  </div>
                  <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#111827', marginBottom:'10px' }}>{s.title}</h3>
                  <p style={{ fontSize:'0.88rem', color:'#6b7280', lineHeight:1.75, margin:0 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* No online form note */}
            <div style={{ marginTop:'28px', background:'rgba(42,82,152,0.05)', border:'1px solid rgba(42,82,152,0.15)', borderRadius:'12px', padding:'14px 20px', display:'flex', gap:'12px', alignItems:'center' }}>
              <i className="fas fa-info-circle" style={{ color:'#2a5298', flexShrink:0 }} />
              <p style={{ fontSize:'0.85rem', color:'#4b5563', lineHeight:1.6, margin:0 }}>
                Applications are currently handled via email. Simply send your details to <a href="mailto:info@isc2kenya.com" style={{ color:'#2a5298', fontWeight:600 }}>info@isc2kenya.com</a> and the membership team will guide you through the process.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section ref={benRef} style={{ padding:'80px 0', background:'#f8faf6' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>Member Benefits</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827' }}>What You Get as a Member</h2>
            </div>
            <div className="bens-grid">
              {BENEFITS.map((b, i) => (
                <div key={i} className="ben-card" style={{ opacity:benIn?1:0, animation:benIn?`cardIn 0.4s ease ${i*0.07}s both`:'none' }}>
                  <div className="ben-ico"><i className={b.icon} /></div>
                  <div>
                    <h3 style={{ fontSize:'0.93rem', fontWeight:700, color:'#111827', marginBottom:'5px' }}>{b.title}</h3>
                    <p style={{ fontSize:'0.85rem', color:'#6b7280', lineHeight:1.68, margin:0 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} style={{ padding:'80px 0' }}>
          <div style={{ maxWidth:'760px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <div className="stag" style={{ justifyContent:'center' }}>FAQs</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'#111827' }}>Common Questions</h2>
            </div>
            {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'72px 0', background:'linear-gradient(135deg,#1a3a6e,#0a1440)', textAlign:'center' }}>
          <div style={{ maxWidth:'580px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'white', marginBottom:'14px' }}>Still Have Questions?</h2>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.95rem', lineHeight:1.75, marginBottom:'30px', fontWeight:300 }}>
              Reach out and we will be happy to guide you through the membership process.
            </p>
            <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
              <a href="https://forms.gle/Y53BxmLG3tSThMxQ8" target="_blank" rel="noopener noreferrer" className="btn-g">
                <i className="fas fa-paper-plane" /> Apply Now
              </a>
              <Link to="/contact" className="btn-w">
                <i className="fas fa-envelope" /> Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import bgTech from '../assets/bg-tech.jpg'

// ── Typewriter ──
function Typewriter({ text, delay = 0, speed = 38, style = {}, as: Tag = 'span' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const pos = useRef(0), iv = useRef(null), to = useRef(null)

  useEffect(() => {
    pos.current = 0
    setDisplayed('')
    setDone(false)
    to.current = setTimeout(() => {
      iv.current = setInterval(() => {
        pos.current += 1
        setDisplayed(text.slice(0, pos.current))
        if (pos.current >= text.length) {
          clearInterval(iv.current)
          setDone(true)
        }
      }, speed)
    }, delay)
    return () => { clearTimeout(to.current); clearInterval(iv.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag style={style}>
      {displayed}
      <span style={{ display:'inline-block', width:'2px', height:'0.85em', background:'rgba(255,255,255,0.75)', marginLeft:'2px', verticalAlign:'middle', animation: done ? 'blink 1s step-end infinite' : 'none' }} />
    </Tag>
  )
}

// ── EmailJS keys ──
const SERVICE_ID  = 'service_ol6p95i'
const TEMPLATE_ID = 'template_bn6pjvu'
const PUBLIC_KEY  = 'br5ihWL-YeDSz52Kr'

// Opens Gmail compose for direct email links (contact cards)
const TO = 'info@isc2kenya.com'

// Mobile: mailto opens native email app · Desktop: Gmail compose in new tab
function openGmail(subject = '', body = '') {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  if (isMobile) {
    const mailto = `mailto:${TO}` +
      (subject ? `?subject=${encodeURIComponent(subject)}` : '') +
      (body    ? `${subject ? '&' : '?'}body=${encodeURIComponent(body)}` : '')
    window.location.href = mailto
  } else {
    const url = `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(TO)}` +
      (subject ? `&su=${encodeURIComponent(subject)}` : '') +
      (body    ? `&body=${encodeURIComponent(body)}`  : '')
    const a = document.createElement('a')
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }
}

const CONTACTS = [
  { icon:'fas fa-envelope',    label:'Email',     value:'info@isc2kenya.com', isEmail:true,  color:'#EA4335' },
  { icon:'fab fa-whatsapp',    label:'WhatsApp',  value:'+254 716 973 110',   href:'https://wa.me/254716973110',                  color:'#25D366' },
  { icon:'fab fa-linkedin-in', label:'LinkedIn',  value:'ISC2 Kenya Chapter', href:'https://linkedin.com',                       color:'#0A66C2' },
  { icon:'fas fa-globe',       label:'Community', value:'ISC2 Community Hub', href:'https://community.isc2.org/t5/Kenya-Chapter', color:'#5aaa32' },
]

const REASONS = [
  'General Inquiry', 'Membership Application', 'Event Registration',
  'Mentorship Programme', 'University Partnership', 'Sponsorship & Partnership',
  'Speak at an Event', 'Media & Press',
]

const EMPTY = { name:'', email:'', org:'', reason:'General Inquiry', message:'' }

export default function Contact() {
  const [form,    setForm]    = useState(EMPTY)
  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState('idle') // idle | sending | success | error
  const [focus,   setFocus]   = useState('')
  const formRef = useRef(null)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' })) // clear error on type
  }

  // ── Validation ──
  const validate = () => {
    const e = {}
    if (!form.name.trim())                        e.name    = 'Full name is required.'
    if (!form.email.trim())                       e.email   = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.message.trim())                     e.message = 'Please write a message before submitting.'
    else if (form.message.trim().length < 10)     e.message = 'Message is too short — please provide more detail.'
    return e
  }

  // ── Submit ──
  const handle = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:       form.name,
          from_email: form.email,
          org:        form.org || 'N/A',
          reason:     form.reason,
          message:    form.message,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setForm(EMPTY)
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  // ── Input style ──
  const inp = (name) => ({
    width:'100%', padding:'12px 16px',
    border:`2px solid ${errors[name] ? '#ef4444' : focus===name ? '#5aaa32' : '#e5e7eb'}`,
    borderRadius:'8px', fontSize:'0.92rem', outline:'none',
    transition:'border-color 0.2s', fontFamily:'DM Sans,sans-serif',
    color:'#111827', background:'white', boxSizing:'border-box',
  })

  return (
    <>
      <style>{`
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideL  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR  { from{opacity:0;transform:translateX(32px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }

        .c-card { background:white; border-radius:14px; padding:18px 20px; border:1px solid #e5e7eb; display:flex; align-items:center; gap:14px; transition:all 0.28s; text-decoration:none; cursor:pointer; font-family:inherit; }
        .c-card:hover { border-color:#5aaa32; transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,0.08); }
        .c-ico { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; transition:all 0.28s; }
        .c-card:hover .c-ico { color:white !important; }

        .err-msg { color:#ef4444; font-size:0.78rem; margin-top:5px; display:flex; align-items:center; gap:5px; }

        .btn-g { background:#5aaa32; color:white; padding:14px 32px; border-radius:8px; font-weight:600; font-size:0.95rem; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; width:100%; justify-content:center; }
        .btn-g:hover:not(:disabled) { background:#3d7a1f; transform:translateY(-2px); box-shadow:0 8px 24px rgba(90,170,50,0.38); }
        .btn-g:disabled { background:#9ca3af; cursor:not-allowed; transform:none; box-shadow:none; }

        .spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,0.4); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; }

        .stag { font-size:0.74rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#3d7a1f; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        .stag::before { content:''; display:block; width:24px; height:2px; background:#5aaa32; }

        .cg { display:grid; grid-template-columns:1fr 1.6fr; gap:48px; align-items:start; }
        .fr { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        @media(max-width:900px) { .cg{grid-template-columns:1fr!important;} }
        @media(max-width:560px) { .fr{grid-template-columns:1fr!important;} }
      `}</style>

      <main style={{ paddingTop:'68px' }}>

        {/* ── HERO ── */}
        <section style={{ background:`linear-gradient(135deg,rgba(10,20,60,0.9),rgba(26,58,110,0.85)),url(${bgTech}) center/cover no-repeat`, padding:'80px 0 72px', textAlign:'center' }}>
          <div style={{ maxWidth:'680px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(90,170,50,0.2)', border:'1px solid rgba(90,170,50,0.4)', color:'#90e060', padding:'5px 14px', borderRadius:'100px', fontSize:'0.74rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'20px' }}>
              <i className="fas fa-envelope" /> Contact Us
            </div>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', color:'white', fontWeight:700, lineHeight:1.2, marginBottom:'18px' }}>
              <Typewriter
                text="Get in Touch "
                delay={300}
                speed={45}
                style={{ color:'white' }}
              />
              <Typewriter
                text="with the Chapter"
                delay={300 + ('Get in Touch '.length * 45) + 100}
                speed={45}
                style={{ color:'#7bc94a' }}
              />
            </h1>
            <p style={{ fontSize:'clamp(0.9rem,2vw,1.05rem)', color:'rgba(255,255,255,0.78)', lineHeight:1.75, fontWeight:300, minHeight:'60px' }}>
              <Typewriter
                text="We'd love to hear from you. Whether it's a membership question, an event idea, or a partnership proposal, reach out and we'll respond promptly."
                delay={2600}
                speed={22}
              />
            </p>
          </div>
        </section>

        {/* ── MAIN ── */}
        <section style={{ padding:'80px 0' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>
            <div className="cg">

              {/* ── LEFT ── */}
              <div style={{ animation:'slideL 0.7s ease both' }}>
                <div className="stag">Reach Us</div>
                <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', color:'#111827', marginBottom:'14px' }}>We're Here to Help</h2>
                <p style={{ fontSize:'0.92rem', color:'#6b7280', lineHeight:1.78, marginBottom:'28px' }}>
                  The ISC2 Kenya Chapter is run by volunteers passionate about growing Kenya's cybersecurity community. We typically respond within 1–2 business days.
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px' }}>
                  {CONTACTS.map((c, i) =>
                    c.isEmail ? (
                      <button key={i} onClick={() => openGmail()} className="c-card"
                        style={{ background:'white', width:'100%', border:'1px solid #e5e7eb' }}
                        onMouseEnter={e => { e.currentTarget.querySelector('.c-ico').style.background=c.color; e.currentTarget.querySelector('.c-ico').style.color='white' }}
                        onMouseLeave={e => { e.currentTarget.querySelector('.c-ico').style.background=`${c.color}18`; e.currentTarget.querySelector('.c-ico').style.color=c.color }}>
                        <div className="c-ico" style={{ background:`${c.color}18`, color:c.color }}><i className={c.icon} /></div>
                        <div style={{ textAlign:'left' }}>
                          <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em' }}>{c.label}</div>
                          <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#111827' }}>{c.value}</div>
                        </div>
                        <i className="fas fa-external-link-alt" style={{ marginLeft:'auto', color:'#d1d5db', fontSize:'0.72rem' }} />
                      </button>
                    ) : (
                      <a key={i} href={c.href} target="_blank" rel="noreferrer" className="c-card"
                        style={{ background:'white' }}
                        onMouseEnter={e => { e.currentTarget.querySelector('.c-ico').style.background=c.color; e.currentTarget.querySelector('.c-ico').style.color='white' }}
                        onMouseLeave={e => { e.currentTarget.querySelector('.c-ico').style.background=`${c.color}18`; e.currentTarget.querySelector('.c-ico').style.color=c.color }}>
                        <div className="c-ico" style={{ background:`${c.color}18`, color:c.color }}><i className={c.icon} /></div>
                        <div>
                          <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em' }}>{c.label}</div>
                          <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#111827' }}>{c.value}</div>
                        </div>
                        <i className="fas fa-external-link-alt" style={{ marginLeft:'auto', color:'#d1d5db', fontSize:'0.72rem' }} />
                      </a>
                    )
                  )}
                </div>

                {/* Hours */}
                <div style={{ background:'#f8faf6', borderRadius:'14px', padding:'20px', border:'1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize:'0.88rem', fontWeight:700, color:'#111827', margin:'0 0 12px 0', display:'flex', alignItems:'center', gap:'8px' }}>
                    <i className="fas fa-clock" style={{ color:'#5aaa32' }} /> Response Hours
                  </h3>
                  {[
                    { day:'Monday – Friday', hrs:'9:00 AM – 6:00 PM EAT' },
                    { day:'Saturday',        hrs:'10:00 AM – 2:00 PM EAT' },
                    { day:'Sunday',          hrs:'Closed' },
                  ].map((r, i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:i<2?'1px solid #e5e7eb':'none', fontSize:'0.85rem' }}>
                      <span style={{ color:'#4b5563', fontWeight:500 }}>{r.day}</span>
                      <span style={{ color:r.hrs==='Closed'?'#dc2626':'#3d7a1f', fontWeight:600 }}>{r.hrs}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT — form ── */}
              <div style={{ animation:'slideR 0.7s ease both' }}>
                <div style={{ background:'white', borderRadius:'20px', padding:'clamp(24px,4vw,40px)', border:'1px solid #e5e7eb', boxShadow:'0 8px 32px rgba(0,0,0,0.06)' }}>

                  {/* ── SUCCESS ── */}
                  {status === 'success' && (
                    <div style={{ textAlign:'center', padding:'40px 16px', animation:'fadeUp 0.5s ease both' }}>
                      <div style={{ width:'72px', height:'72px', background:'rgba(90,170,50,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', color:'#5aaa32', margin:'0 auto 20px' }}>
                        <i className="fas fa-check-circle" />
                      </div>
                      <h3 style={{ fontSize:'1.3rem', fontWeight:700, color:'#111827', marginBottom:'12px' }}>
                        Thank You for Reaching Out!
                      </h3>
                      <p style={{ fontSize:'0.93rem', color:'#6b7280', lineHeight:1.8, marginBottom:'8px' }}>
                        Your message has been received by the ISC2 Kenya Chapter team.
                      </p>
                      <p style={{ fontSize:'0.93rem', color:'#6b7280', lineHeight:1.8, marginBottom:'28px' }}>
                        Our team will review your message and get back to you within <strong style={{ color:'#3d7a1f' }}>1–2 business days</strong>. If your matter is urgent, please reach us directly via WhatsApp at <strong>+254 716 973 110</strong>.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        style={{ background:'none', border:'2px solid #5aaa32', color:'#5aaa32', padding:'10px 28px', borderRadius:'8px', fontWeight:600, cursor:'pointer', fontSize:'0.9rem', fontFamily:'inherit', transition:'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background='#5aaa32'; e.currentTarget.style.color='white' }}
                        onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#5aaa32' }}
                      >
                        ← Send Another Message
                      </button>
                    </div>
                  )}

                  {/* ── ERROR ── */}
                  {status === 'error' && (
                    <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'10px', padding:'16px 18px', marginBottom:'20px', display:'flex', gap:'12px', alignItems:'flex-start', animation:'fadeUp 0.4s ease both' }}>
                      <i className="fas fa-exclamation-circle" style={{ color:'#ef4444', marginTop:'2px', flexShrink:0 }} />
                      <div>
                        <p style={{ fontSize:'0.9rem', fontWeight:600, color:'#dc2626', margin:'0 0 4px' }}>Message Failed to Send</p>
                        <p style={{ fontSize:'0.85rem', color:'#6b7280', margin:0 }}>
                          Something went wrong. Please try again or email us directly at{' '}
                          <button onClick={() => openGmail()} style={{ color:'#5aaa32', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontSize:'inherit', fontFamily:'inherit' }}>
                            info@isc2kenya.com
                          </button>
                        </p>
                      </div>
                      <button onClick={() => setStatus('idle')} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color:'#9ca3af', fontSize:'1rem' }}>
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  )}

                  {/* ── FORM ── */}
                  {status !== 'success' && (
                    <>
                      <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#111827', marginBottom:'4px' }}>Send Us a Message</h3>
                      <p style={{ fontSize:'0.82rem', color:'#9ca3af', marginBottom:'24px' }}>
                        Fields marked <span style={{ color:'#ef4444' }}>*</span> are required
                      </p>

                      <form ref={formRef} onSubmit={handle} noValidate>

                        <div className="fr" style={{ marginBottom:'16px' }}>
                          <div>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'6px' }}>
                              Full Name <span style={{ color:'#ef4444' }}>*</span>
                            </label>
                            <input
                              value={form.name}
                              onChange={e => set('name', e.target.value)}
                              onFocus={() => setFocus('name')}
                              onBlur={() => setFocus('')}
                              placeholder="David Duke"
                              style={inp('name')}
                            />
                            {errors.name && <p className="err-msg"><i className="fas fa-exclamation-circle" />{errors.name}</p>}
                          </div>
                          <div>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'6px' }}>
                              Your Email <span style={{ color:'#ef4444' }}>*</span>
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={e => set('email', e.target.value)}
                              onFocus={() => setFocus('email')}
                              onBlur={() => setFocus('')}
                              placeholder="duke@example.com"
                              style={inp('email')}
                            />
                            {errors.email && <p className="err-msg"><i className="fas fa-exclamation-circle" />{errors.email}</p>}
                          </div>
                        </div>

                        <div style={{ marginBottom:'16px' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'6px' }}>
                            Organisation <span style={{ fontWeight:400, color:'#9ca3af' }}>(optional)</span>
                          </label>
                          <input
                            value={form.org}
                            onChange={e => set('org', e.target.value)}
                            onFocus={() => setFocus('org')}
                            onBlur={() => setFocus('')}
                            placeholder="Your company or university"
                            style={inp('org')}
                          />
                        </div>

                        <div style={{ marginBottom:'16px' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'6px' }}>
                            Reason for Contact
                          </label>
                          <select
                            value={form.reason}
                            onChange={e => set('reason', e.target.value)}
                            onFocus={() => setFocus('reason')}
                            onBlur={() => setFocus('')}
                            style={{ ...inp('reason'), appearance:'none' }}
                          >
                            {REASONS.map(r => <option key={r}>{r}</option>)}
                          </select>
                        </div>

                        <div style={{ marginBottom:'24px' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'6px' }}>
                            Message <span style={{ color:'#ef4444' }}>*</span>
                          </label>
                          <textarea
                            rows={5}
                            value={form.message}
                            onChange={e => set('message', e.target.value)}
                            onFocus={() => setFocus('message')}
                            onBlur={() => setFocus('')}
                            placeholder="Tell us how we can help you..."
                            style={{ ...inp('message'), resize:'vertical', minHeight:'120px' }}
                          />
                          {errors.message && <p className="err-msg"><i className="fas fa-exclamation-circle" />{errors.message}</p>}
                        </div>

                        <button type="submit" className="btn-g" disabled={status === 'sending'}>
                          {status === 'sending'
                            ? <><div className="spinner" /> Sending...</>
                            : <><i className="fas fa-paper-plane" /> Send Message</>
                          }
                        </button>

                      </form>
                    </>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  )
}

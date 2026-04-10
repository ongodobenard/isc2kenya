import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'

const TO = 'info@isc2kenya.com'

// Mobile: uses mailto: to open native email app with To pre-filled
// Desktop: opens Gmail compose in new tab with To, Subject & Body pre-filled
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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        .fl  { color:rgba(255,255,255,0.6); text-decoration:none; font-size:0.88rem; transition:color 0.2s; display:flex; align-items:center; gap:8px; }
        .fl:hover { color:#7bc94a; }
        .fb  { display:flex; align-items:center; gap:10px; color:rgba(255,255,255,0.65); font-size:0.88rem; transition:all 0.2s; padding:6px 0; cursor:pointer; background:none; border:none; width:100%; text-align:left; font-family:inherit; }
        .fb:hover { color:#7bc94a; }
        .fb:hover .fci { background:#5aaa32 !important; color:white !important; }
        .fci { width:32px; height:32px; border-radius:8px; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-size:0.85rem; color:rgba(255,255,255,0.6); flex-shrink:0; transition:all 0.2s; }
        .soc { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; text-decoration:none; transition:all 0.25s; cursor:pointer; border:none; }
        .soc:hover { transform:translateY(-3px); filter:brightness(1.2); }
        .fg  { display:grid; grid-template-columns:1.6fr 1fr 1fr 1.4fr; gap:clamp(24px,4vw,48px); margin-bottom:48px; }
        .fbot{ border-top:1px solid rgba(255,255,255,0.08); padding:20px 0 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .fdev{ border-top:1px solid rgba(255,255,255,0.05); padding:12px 0 28px; text-align:center; }
        @media(max-width:900px){ .fg{grid-template-columns:1fr 1fr!important;} }
        @media(max-width:560px){ .fg{grid-template-columns:1fr!important;} .fbot{flex-direction:column;text-align:center;} }
      `}</style>

      <footer style={{ background:'#0a1440', color:'white', paddingTop:'64px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(16px,4vw,24px)' }}>

          <div className="fg">

            {/* ── Brand ── */}
            <div>
              <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'18px', textDecoration:'none' }}>
                <img src={logo} alt="ISC2 Kenya Chapter" style={{ height:'44px', width:'auto' }} />
              </Link>
              <p style={{ fontSize:'0.87rem', color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:'20px' }}>
                The official local chapter of ISC2 in Kenya, connecting, developing, and advocating for cybersecurity professionals across the nation since 2020.
              </p>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="soc" style={{ background:'#0A66C2' }}>
                  <i className="fab fa-linkedin-in" style={{ color:'white' }} />
                </a>
                <a href="https://wa.me/254716973110" target="_blank" rel="noreferrer" className="soc" style={{ background:'#25D366' }}>
                  <i className="fab fa-whatsapp" style={{ color:'white' }} />
                </a>
                <a href="https://community.isc2.org/t5/Kenya-Chapter" target="_blank" rel="noreferrer" className="soc" style={{ background:'#5aaa32' }}>
                  <i className="fas fa-globe" style={{ color:'white' }} />
                </a>
                <button onClick={() => openGmail()} className="soc" style={{ background:'#EA4335' }} title="Email us">
                  <i className="fas fa-envelope" style={{ color:'white' }} />
                </button>
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h4 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', margin:'0 0 18px 0' }}>Quick Links</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {[
                  { to:'/',           label:'Home' },
                  { to:'/about',      label:'About Us' },
                  { to:'/membership', label:'Membership' },
                  { to:'/events',     label:'Events' },
                  { to:'/mentorship', label:'Mentorship' },
                  { to:'/blog',       label:'Blog' },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="fl">
                    <i className="fas fa-chevron-right" style={{ fontSize:'0.6rem', color:'#5aaa32' }} />{l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Resources ── */}
            <div>
              <h4 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', margin:'0 0 18px 0' }}>Resources</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {[
                  { href:'https://community.isc2.org/t5/Kenya-Chapter',    label:'Community Hub' },
                  { href:'https://www.isc2.org/chapters/chapter-directory', label:'Chapter Directory' },
                  { href:'https://www.isc2.org',                           label:'ISC2 Global' },
                  { href:'https://www.isc2.org/certifications/cc',         label:'CC Certification' },
                  { href:'https://www.isc2.org/certifications/cissp',      label:'CISSP Certification' },
                ].map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="fl">
                    <i className="fas fa-chevron-right" style={{ fontSize:'0.6rem', color:'#5aaa32' }} />{l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Contact ── */}
            <div>
              <h4 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', margin:'0 0 18px 0' }}>Contact</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>

                <a href="tel:+254716973110" className="fb">
                  <span className="fci"><i className="fas fa-phone" /></span>
                  +254 716 973 110
                </a>

                <button onClick={() => openGmail()} className="fb">
                  <span className="fci"><i className="fas fa-envelope" /></span>
                  info@isc2kenya.com
                </button>

                <button onClick={() => openGmail('Message from isc2kenya.com')} className="fb">
                  <span className="fci"><i className="fas fa-paper-plane" /></span>
                  Send a Message
                </button>

               <button 
  onClick={() => window.open('https://forms.gle/Y53BxmLG3tSThMxQ8', '_blank')} 
  className="fb"
>
  <span className="fci"><i className="fas fa-user-plus" /></span>
  Join the Chapter
</button>

              </div>
            </div>

          </div>

          {/* ── Bottom ── */}
          <div className="fbot">
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.35)', margin:0 }}>
              © {year} ISC2 Kenya Chapter. All rights reserved.
            </p>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.35)', margin:0 }}>
              An official chapter of{' '}
              <a href="https://www.isc2.org" target="_blank" rel="noreferrer" style={{ color:'#5aaa32', fontWeight:600, textDecoration:'none' }}>ISC2</a>
              {' '}· International Information System Security Certification Consortium
            </p>
          </div>

          {/* ── Dev credit ── */}
          <div className="fdev">
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.22)', margin:0 }}>
              Developed &amp; Designed by{' '}
              <a
                href="https://devnovatech.com/"
                target="_blank"
                rel="noreferrer"
                style={{ color:'rgba(123,201,74,0.65)', fontWeight:600, textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#7bc94a' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(123,201,74,0.65)' }}
              >
                Devnovatech Software Developers
              </a>
            </p>
          </div>

        </div>
      </footer>
    </>
  )
}

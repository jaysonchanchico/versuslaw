/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   ICONS (Lucide-style, inline SVG, single stroke weight)
   ============================================================ */
const Icon = ({ name, size = 20, strokeWidth = 1.6, ...rest }) => {
  const paths = {
    home: <><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2v-9z" /></>,
    building: <>
      <rect x="4" y="3" width="11" height="18" rx="0.6" />
      <rect x="15" y="9" width="5" height="12" rx="0.6" />
      <path d="M8 7h3M8 11h3M8 15h3M17 13h1M17 17h1" />
    </>,
    shield: <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9.5-4.6-1-8-5-8-9.5V6l8-3z" />
      <path d="M12 9v4M12 16h.01" />
    </>,
    briefcase: <>
      <rect x="3" y="7" width="18" height="13" rx="1.2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>,
    heart: <>
      <path d="M3 12h3l2-5 3 9 2-7 2 3h6" />
    </>,
    file: <>
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3z" />
      <path d="M14 3v5h4.5M9 13h6M9 17h6M9 9h2" />
    </>,
    phone: <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </>,
    arrow: <>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </>,
    check: <>
      <path d="M5 12l4 4 10-10" />
    </>,
    menu: <>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </>,
    close: <>
      <path d="M5 5l14 14M19 5L5 19" />
    </>,
    facebook: <>
      <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V8.5A3.5 3.5 0 0 1 13.5 5H16v3z" />
    </>,
    linkedin: <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" />
    </>,
    instagram: <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>,
    user: <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>,
    pound: <>
      <path d="M16 7a4 4 0 0 0-7 2v3H6" />
      <path d="M14 14H6" />
      <path d="M9 9v4c0 2-1 4-3 4h11" />
    </>,
    gauge: <>
      <path d="M3 12a9 9 0 1 0 18 0" />
      <path d="M12 12l5-4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  };
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}>
      
      {paths[name]}
    </svg>);

};

const Arrow = () => <span className="arrow" aria-hidden="true">→</span>;

/* ============================================================
   USE-IN-VIEW (Intersection Observer)
   ============================================================ */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px', ...options });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, as: As = 'div', stagger = false, className = '', ...rest }) => {
  const [ref, inView] = useInView();
  const cls = [
  stagger ? 'reveal-stagger' : 'reveal',
  inView ? 'is-visible' : '',
  className].
  filter(Boolean).join(' ');
  return <As ref={ref} className={cls} {...rest}>{children}</As>;
};

/* ============================================================
   BRAND / NAV
   ============================================================ */
const Logo = ({ variant = 'dark' }) =>
<span className="nav-brand">
    <img
    src="assets/versus-logo.png"
    alt="Versus Law Solicitors"
    className="nav-logo-img"
    width="518"
    height="100" />
  
  </span>;


const Nav = ({ onQuoteClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
  { href: '#services', label: 'Conveyancing' },
  { href: '#services', label: 'Property Services' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#team', label: 'About' },
  { href: '#footer', label: 'Contact' }];


  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`} data-screen-label="Homepage">
      <div className="container nav-inner">
        <a href="#top" aria-label="Versus Law — Manchester Solicitors">
          <Logo />
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) =>
            <li key={l.label}><a href={l.href}>{l.label}</a></li>
            )}
          </ul>
        </nav>
        <div className="nav-cta">
          <a href="tel:01612495087" className="nav-phone nav-phone-desktop" aria-label="Call 0161 249 5087">
            <Icon name="phone" size={15} strokeWidth={1.8} />
            0161 249 5087
          </a>
          <button className="btn btn-primary" onClick={onQuoteClick}>Get a Quote</button>
          <button
            className="nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setMobileOpen((o) => !o)}>
            
            <Icon name={mobileOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div className="container">
          <ul>
            {links.map((l) =>
            <li key={l.label}><a href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a></li>
            )}
          </ul>
          <a href="tel:01612495087" className="phone-line">
            <Icon name="phone" size={16} /> 0161 249 5087
          </a>
        </div>
      </div>
    </header>);

};

/* ============================================================
   HERO
   ============================================================ */
const TrustStrip = () =>
<div className="trust-strip">
    <span className="label">As trusted by</span>
    <span className="trust-badge trust-badge--logo" aria-label="As featured on BBC Radio 4">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/BBC_Radio_4_2022.svg" alt="BBC Radio 4" className="bbc-logo bbc-logo--radio" />
    </span>
    <span className="trust-badge trust-badge--logo" aria-label="As featured on BBC News">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/BBC_News_2019.svg" alt="BBC News" className="bbc-logo bbc-logo--news" />
    </span>
    <span className="trust-badge trust-badge--logo" aria-label="CQS Accredited by the Law Society">
      <img src="https://www.bennettgriffin.co.uk/wp-content/uploads/2023/11/New-CQS-logo.jpg.webp" alt="CQS — Conveyancing Quality Scheme Accredited" className="accred-logo accred-logo--cqs" />
    </span>
    <span className="trust-badge trust-badge--logo" aria-label="Regulated by the Solicitors Regulation Authority">
      <img src="https://www.sra.org.uk/globalassets/images/homepages/consumer-2.jpg" alt="SRA Regulated" className="accred-logo accred-logo--sra" />
    </span>
    <span className="trust-badge">
      <span className="stars-inline" aria-label="5 out of 5 stars">★★★★★</span>
      351 verified reviews
    </span>
  </div>;


/* ============================================================
   QUOTE FORM + MODAL
   ============================================================ */
const QuoteForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    propertyType: '', transaction: '',
    name: '', email: '', phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.propertyType) next.propertyType = 'Required';
    if (!form.transaction) next.transaction = 'Required';
    if (!form.name) next.name = 'Required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.phone) next.phone = 'Required';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      onSuccess && onSuccess(form);
    }
  };

  if (submitted) {
    return (
      <div className="quote-card form-success" role="status">
        <span style={{ color: 'var(--color-success)', flex: '0 0 auto' }}><Icon name="check" size={22} /></span>
        <div>
          <strong>Quote request received.</strong>
          Thanks {form.name.split(' ')[0] || 'there'} — one of our named solicitors will be in touch on {form.phone} within one business day with a fixed-fee quote. Urgent? Call us directly on 0161 249 5087.
        </div>
      </div>
    );
  }

  return (
    <form className="quote-card quote-card--stacked" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="transaction">I'm</label>
          <select id="transaction" value={form.transaction} onChange={(e) => update('transaction', e.target.value)} aria-invalid={!!errors.transaction}>
            <option value="">Select…</option>
            <option>Buying</option>
            <option>Selling</option>
            <option>Buying &amp; Selling</option>
            <option>Remortgaging</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="propertyType">Property</label>
          <select id="propertyType" value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} aria-invalid={!!errors.propertyType}>
            <option value="">Select…</option>
            <option>House</option>
            <option>Flat / Apartment</option>
            <option>Commercial</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} />
        </div>
      </div>

      <button className="btn btn-primary btn-block" type="submit">
        Get My Free Quote <Arrow />
      </button>
      <p className="fine">
        No obligation · SRA regulated · We respond within 1 business day.
      </p>
    </form>
  );
};

const QuoteModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={20} />
        </button>
        <header className="modal-head">
          <h2 className="h-display" id="quote-modal-title">Get your free conveyancing quote.</h2>
          <p>Fixed fees · Named solicitor · 60-second form.</p>
        </header>
        <QuoteForm />
      </div>
    </div>
  );
};

const Hero = ({ onQuoteClick }) => (
  <section className="hero hero--photo" id="top" data-screen-label="Hero">
    <div className="hero-photo-bg" aria-hidden="true" />
    <div className="container">
      <div className="hero-copy">
        <Reveal>
          <h1>
            Get your free<br />
            conveyancing quote<br />
            in 60 seconds.
          </h1>
          <p className="lead">
            Manchester's most trusted conveyancing solicitors. Fixed fees,
            named solicitors, no obligation — a real person responds within
            one business day.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={onQuoteClick}>
              Get a Quote <Arrow />
            </button>
            <a className="btn btn-outline" href="tel:01612495087">
              <Icon name="phone" size={16} /> Call 0161 249 5087
            </a>
          </div>
          <TrustStrip />
        </Reveal>
      </div>
    </div>
  </section>
);

/* ============================================================
   SERVICES
   ============================================================ */
const services = [
{ icon: 'home', title: 'Conveyancing', copy: 'Buying, selling, or remortgaging. Fixed fees from quote to keys.', cta: 'See conveyancing details' },
{ icon: 'building', title: 'Property Services', copy: 'Auction purchases, bridging loans, and commercial leases — done at speed.', cta: 'See property services' },
{ icon: 'shield', title: 'Housing Disrepair', copy: 'Damp, mould, broken heating? We claim against your landlord. No win, no fee.', cta: 'Check your claim' },
{ icon: 'briefcase', title: 'Employment Law', copy: 'Settlement agreements, unfair dismissal, tribunal claims — clear advice from day one.', cta: 'Get employment advice' },
{ icon: 'heart', title: 'Personal Injury', copy: 'Road accidents, workplace injuries, slips. No win, no fee. Free claim check.', cta: 'Check your claim' },
{ icon: 'file', title: 'Wills & Probate', copy: 'Make your will, plan your estate, or handle probate — without the legal fog.', cta: 'Start your will' }];


const Services = () =>
<section className="section services-section" id="services" data-screen-label="Services">
    <div className="container">
      <Reveal>
        <div className="section-head">
          <h2 className="h-display h2">Everything your property move needs, under one roof.</h2>
          <p className="sub">Manchester solicitors covering every move-related matter — from a flat purchase to a housing disrepair claim.</p>
        </div>
      </Reveal>
      <Reveal stagger className="services-grid">
        {services.map((s) =>
      <article className="service-card" key={s.title}>
            <span className="service-icon"><Icon name={s.icon} size={28} strokeWidth={1.4} /></span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
            <a className="arrow-link" href="#">
              {s.cta} <Arrow />
            </a>
          </article>
      )}
      </Reveal>
      <Reveal>
        <div className="services-more">
          <span>Also from Versus Law:</span>
          <a href="#">Immigration <Arrow /></a>
          <span className="sep">·</span>
          <a href="#">Frequently asked questions <Arrow /></a>
        </div>
      </Reveal>
    </div>
  </section>;


/* ============================================================
   WHY US
   ============================================================ */
const stats = [
{ num: '10,000', small: '+', lbl: 'transactions completed' },
{ num: '351', small: '', lbl: 'verified five-star reviews' },
{ num: 'CQS', small: '', lbl: 'Law Society accredited' },
{ num: 'BBC', small: '', lbl: 'Radio 4 and News featured' }];


const diffs = [
{ h: 'Named solicitors.', icon: 'user', p: "You'll know exactly who's handling your case from day one. Not a call centre. Not 'your case team.' A real person \u2014 Waqas Chaudhri, Natalie Moylan, or Umi Bhamjee \u2014 with a direct line." },
{ h: 'Fixed fees.', icon: 'pound', p: 'Your quote is your final bill. No surprise costs on completion day. We tell you what it costs before we start.' },
{ h: 'Speed when it counts.', icon: 'gauge', p: 'Auction completion in 4 days. Standard purchases in 8 to 12 weeks. Whatever your timeline is, we work to it.' }];


const WhyUs = () =>
<section className="section whyus" id="why" data-screen-label="Why us">
    <div className="container">
      <Reveal>
        <div className="whyus-grid">
          <div className="stats reveal-stagger is-visible">
            {stats.map((s) =>
          <div className="stat" key={s.lbl}>
                <div className="num">
                  {s.num}{s.small && <span className="small">{s.small}</span>}
                </div>
                <div className="lbl">{s.lbl}</div>
              </div>
          )}
          </div>
          <div className="whyus-copy">
            <h2 className="h-display h2">What makes us different.</h2>
            <div className="diff-list">
              {diffs.map((d) =>
            <div className="diff" key={d.h}>
                  <h3>
                    <span className="diff-icon"><Icon name={d.icon} size={20} strokeWidth={1.6} /></span>
                    {d.h}
                  </h3>
                  <p>{d.p}</p>
                </div>
            )}
            </div>
            <a className="arrow-link" href="#team">Meet the team <Arrow /></a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>;


/* ============================================================
   TEAM
   ============================================================ */
const BASE = 'https://www.versuslaw.co.uk/wp-content/uploads/';
const ph = null; // blank → fall back to initials placeholder

const teamData = {
  partners: {
    label: 'Partners',
    people: [
    { name: 'Paul McGinty', role: 'Partner', img: BASE + '2019/07/paul-mcginty.jpg' },
    { name: 'Shazia Mhar', role: 'Partner', img: BASE + '2019/07/shazie-mhar.jpg' },
    { name: 'Amjid Ali', role: 'Partner', img: BASE + '2017/04/amjid-ali-3.jpg' },
    { name: 'Waqas Chaudhri', role: 'Partner', img: BASE + '2019/07/waqas-chaudhri.jpg' },
    { name: 'Stephanie Pyle', role: 'Partner', img: BASE + '2019/07/stephanie-pyle.jpg' }]

  },
  solicitors: {
    label: 'Solicitors',
    people: [
    { name: 'Kulbinder Mehay', role: 'Associate Solicitor · Dispute Resolution', img: BASE + '2019/07/kulbinder-mehay.jpg' },
    { name: 'Asiya Kaleem', role: 'Solicitor · Commercial & Property', img: ph },
    { name: 'Imran Altaf', role: 'Solicitor · Commercial & Property', img: ph },
    { name: 'Aisha Razi', role: 'Associate Solicitor', img: ph },
    { name: 'Anila Aleem', role: 'Solicitor · Immigration', img: ph },
    { name: 'Raheela Jilani', role: 'Solicitor · Dispute Resolution', img: BASE + '2019/07/raheela-jilani.jpg' },
    { name: 'Umi Bhamjee', role: 'Trainee Solicitor · Commercial', img: ph }]

  },
  conveyancing: {
    label: 'Conveyancing & Other Staff',
    people: [
    { name: 'Natalie Moylan', role: 'Conveyancer · Head of Conveyancing', img: BASE + '2019/07/natalie-moylan-2.jpg' },
    { name: 'Chima Lungu', role: 'Conveyancer', img: ph },
    { name: 'Andrew Brogan', role: 'Conveyancer', img: ph },
    { name: 'Nathalie Biragi', role: 'Conveyancing Assistant', img: ph },
    { name: 'Olivia Waugh', role: 'Conveyancing Assistant', img: ph },
    { name: 'Katarzyna Pysz', role: 'Conveyancing Assistant', img: ph },
    { name: 'Nicholas Lusty', role: 'Litigation Executive', img: BASE + '2019/07/nicholas-lusty.jpg' },
    { name: 'Ahad Omer', role: 'Flight Delays', img: ph },
    { name: 'Shamaila Saleem', role: 'Paralegal', img: ph },
    { name: 'Laura Gormley', role: 'Paralegal', img: ph },
    { name: 'Andrew Cassin', role: 'Costs Draughtsman', img: ph },
    { name: 'Numan Akhtar', role: 'Web Development', img: BASE + '2019/07/numan-akhtar-1.jpg' }]

  },
  reception: {
    label: 'Reception & Admin',
    people: [
    { name: 'Tracey Arnold', role: 'Office Manager', img: BASE + '2019/07/tracey-arnold.jpg' },
    { name: "Rhian O'Loughlin", role: 'Accounts', img: BASE + '2019/07/rhian-oloughlin.jpg' },
    { name: 'David Grimshaw', role: 'Reception', img: ph },
    { name: 'Beatrice Daminabo', role: 'Reception', img: ph }]

  }
};

const tabOrder = ['partners', 'solicitors', 'conveyancing', 'reception'];

const TeamCard = ({ person }) => {
  const initials = person.name.split(/\s+/).map((s) => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return (
    <article className="team-card">
      <div className="team-photo">
        {person.img ?
        <img src={person.img} alt={`${person.name} — ${person.role}`} loading="lazy" /> :

        <>
            <div className="ph-initials" aria-hidden="true">{initials}</div>
            <span className="visually-hidden">Headshot pending for {person.name}</span>
          </>
        }
      </div>
      <div className="team-info">
        <h3>{person.name}</h3>
        <p className="role">{person.role}</p>
      </div>
    </article>);

};

const Team = () => {
  const [activeTab, setActiveTab] = useState('partners');
  const data = teamData[activeTab];

  return (
    <section className="section team-section" id="team" data-screen-label="Team">
      <div className="container">
        <Reveal>
          <div className="team-head">
            <div className="team-head-copy">
              <h2 className="h-display h2">Real solicitors. Real names.<br />Real accountability.</h2>
              <p className="sub">You'll know who's handling your case before you sign anything.</p>
            </div>
            <div className="team-tabs" role="tablist" aria-label="Team categories">
              {tabOrder.map((key) =>
              <button
                key={key}
                role="tab"
                aria-selected={activeTab === key}
                className={`team-tab ${activeTab === key ? 'is-active' : ''}`}
                onClick={() => setActiveTab(key)}>
                
                  <span className="team-tab-label">{teamData[key].label}</span>
                  <span className="team-tab-count">{teamData[key].people.length}</span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <div className="team-grid" role="tabpanel" key={activeTab}>
          {data.people.map((p) =>
          <TeamCard person={p} key={p.name} />
          )}
        </div>
      </div>
    </section>);

};

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testimonials = [
{
  quote: "We had only 4 days to complete our auction purchase. Versus Law made it happen. Calm, fast, and on top of every detail.",
  name: 'R. Nabi', loc: 'Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "From the moment we rang Versus Law to the moment we completed on our first home, the team were excellent. Tom kept us updated every step of the way.",
  name: 'J. Williams', loc: 'Didsbury, Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "Natalie Moylan handled my case from start to finish — I couldn't ask for anyone better. The sale completed in no time at all.",
  name: 'Gem', loc: 'Greater Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "Nicola and Natalie are real diamonds. You get the sense they actually care about you — we live in London but kept using them.",
  name: 'Colin & Yvonne', loc: 'London', source: 'Verified Trustpilot review'
},
{
  quote: "My purchase was a rapid sale — 6 weeks to beat the stamp duty deadline. Umar was absolutely brilliant. I completed 10 days early.",
  name: 'D. Rahman', loc: 'Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "Recently dealt with Nick Wintrip when selling my property. Professional, quick and thorough. He made the whole process stress-free.",
  name: 'Mrs L. C.', loc: 'Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "As a first-time single buyer Natalie and Nicola were so approachable — super responsive to emails and all my questions. Definitely recommend.",
  name: 'Danielle', loc: 'Manchester', source: 'Verified Trustpilot review'
},
{
  quote: "The conveyancing team held my hand all the way through. On completion day there was a delay and they stayed late to push it through.",
  name: 'Jackie', loc: 'Manchester', source: 'Verified Trustpilot review'
}];


const Testimonials = () =>
<section className="section testimonials-section" id="testimonials" data-screen-label="Testimonials">
    <div className="container">
      <Reveal>
        <div className="section-head">
          <h2 className="h-display h2">What Manchester movers say.</h2>
          <p className="sub">Eight real reviews from our 351 verified five-star ratings.</p>
        </div>
      </Reveal>
      <Reveal stagger className="testimonial-grid">
        {testimonials.map((t, i) =>
      <figure className="testimonial" key={i}>
            <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>{t.quote}</blockquote>
            <figcaption className="credit">
              <span className="name">{t.name}</span>
              <span className="loc">{t.loc}</span>
              <span className="source">{t.source}</span>
            </figcaption>
          </figure>
      )}
      </Reveal>
      <Reveal>
        <div className="reviews-more">
          <a className="arrow-link" href="#">See all 351 verified reviews <Arrow /></a>
        </div>
      </Reveal>
    </div>
  </section>;


/* ============================================================
   BBC STRIP
   ============================================================ */
const BBCStrip = () =>
<section className="bbc-strip" id="bbc" data-screen-label="BBC strip">
    <div className="container">
      <Reveal>
        <h2 className="h-display">We're the firm the BBC trusts for property law.</h2>
        <p>Our solicitors are regularly featured on BBC Radio 4 and BBC News as expert sources on UK property and conveyancing law.</p>
        <div className="bbc-marks">
          <div className="bbc-mark">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/BBC_Radio_4_2022.svg"
              alt="BBC Radio 4"
              className="bbc-feature-logo bbc-feature-logo--radio"
            />
          </div>
          <div className="bbc-mark">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/62/BBC_News_2019.svg"
              alt="BBC News"
              className="bbc-feature-logo bbc-feature-logo--news"
            />
          </div>
        </div>
      </Reveal>
    </div>
  </section>;


/* ============================================================
   FINAL CTA
   ============================================================ */
const FinalCTA = ({ onQuoteClick }) =>
<section className="final-cta" id="cta" data-screen-label="Final CTA">
    <div className="container">
      <Reveal>
        <h2 className="h-display">Ready to move?</h2>
        <p>Fixed fees. Named solicitors. No obligation.<br />Get your free conveyancing quote today.</p>
        <button className="btn btn-primary btn-lg" onClick={onQuoteClick}>Get Your Free Quote <Arrow /></button>
        <span className="secondary">Or call us directly — <a href="tel:01612495087">0161 249 5087</a></span>
      </Reveal>
    </div>
  </section>;


/* ============================================================
   FOOTER
   ============================================================ */
const Footer = () =>
<footer className="footer" id="footer" data-screen-label="Footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo"><span className="mark" /> Versus<span style={{ color: 'var(--color-accent)' }}>.</span></span>
          <p className="tagline">Manchester's most trusted conveyancing solicitors.</p>
          <p className="addr">10 Lapwing Lane<br />West Didsbury<br />Manchester M20 2WS</p>
          <div className="socials" aria-label="Social media">
            <a href="#" aria-label="Follow Versus Law on Facebook"><Icon name="facebook" size={16} /></a>
            <a href="#" aria-label="Follow Versus Law on LinkedIn"><Icon name="linkedin" size={16} /></a>
            <a href="#" aria-label="Follow Versus Law on Instagram"><Icon name="instagram" size={16} /></a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#">Conveyancing</a></li>
            <li><a href="#">Property Services</a></li>
            <li><a href="#">Housing Disrepair</a></li>
            <li><a href="#">Employment Law</a></li>
            <li><a href="#">Personal Injury</a></li>
            <li><a href="#">Immigration</a></li>
            <li><a href="#">Wills & Probate</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="item">
            <span className="k">Phone</span>
            <a className="v" href="tel:01612495087">0161 249 5087</a>
          </div>
          <div className="item">
            <span className="k">Email</span>
            <a className="v" href="mailto:info@versuslaw.co.uk">info@versuslaw.co.uk</a>
          </div>
          <div className="item">
            <span className="k">Office hours</span>
            <span className="v">Mon–Fri · 9:00am – 5:30pm</span>
          </div>
        </div>
      </div>

      <div className="footer-creds">
        <div className="cred-badge cred-badge--logo">
          <img src="https://www.bennettgriffin.co.uk/wp-content/uploads/2023/11/New-CQS-logo.jpg.webp" alt="CQS Accredited" className="cred-logo cred-logo--cqs" />
          <span><strong>Conveyancing Quality Scheme</strong><br />Law Society accredited</span>
        </div>
        <div className="cred-badge cred-badge--logo">
          <img src="https://www.sra.org.uk/globalassets/images/homepages/consumer-2.jpg" alt="SRA Regulated" className="cred-logo cred-logo--sra" />
          <span><strong>SRA Regulated</strong><br />SRA No. 519056</span>
        </div>
        <div className="cred-badge"><span className="seal">★</span><span><strong>351 verified reviews</strong><br />Trustpilot · ReviewSolicitors</span></div>
      </div>

      <p className="footer-regulatory">
        Versus Law Ltd is a Private Limited Company registered in England and Wales with
        registration number <strong>6981763</strong>. Registered office and principal place
        of business is Mercantile House, 10 Lapwing Lane, West Didsbury, Manchester
        M20&nbsp;2WS. Versus Law Solicitors is a trading style of Versus Law Ltd.
        Versus Law Ltd is authorised and regulated by the Solicitors Regulation Authority,
        SRA&nbsp;Number&nbsp;<strong>519056</strong>. The professional rules of the SRA can
        be accessed <a href="https://www.sra.org.uk/solicitors/standards-regulations/" target="_blank" rel="noopener">here</a>.
        If you have any queries please <a href="#footer">contact us</a>.
      </p>

      <div className="footer-legal">
        <span>© 2026 Versus Law Solicitors Ltd. All rights reserved.</span>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>
    </div>
  </footer>;


/* ============================================================
   COOKIE BANNER
   ============================================================ */
const CookieBanner = () => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem('vsl-cookie');
      if (!v) setShown(true);
    } catch (e) {setShown(true);}
  }, []);
  const close = (choice) => {
    try {localStorage.setItem('vsl-cookie', choice);} catch (e) {}
    setShown(false);
  };
  if (!shown) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie notice">
      <p>We use cookies to improve your experience and measure site performance. See our <a href="#">privacy policy</a> for detail.</p>
      <div className="actions">
        <button className="btn btn-outline" onClick={() => close('declined')}>Decline</button>
        <button className="btn btn-primary" onClick={() => close('accepted')}>Accept</button>
      </div>
    </div>);

};

/* ============================================================
   STICKY MOBILE CTA
   ============================================================ */
const StickyMobileCTA = ({ onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-mcta ${visible ? 'is-visible' : ''}`}>
      <a className="btn btn-outline" href="tel:01612495087"><Icon name="phone" size={16} /> Call</a>
      <button className="btn btn-primary" onClick={onQuoteClick}>Get a Quote</button>
    </div>);

};

/* ============================================================
   APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "team",
  "accentColor": "#8E191B",
  "backgroundTone": "#f7f4ef",
  "showCookieBanner": true
} /*EDITMODE-END*/;

const App = () => {
  const tw = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const tweaks = tw[0];
  const setTweak = tw[1];

  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  // Apply tweakable design tokens
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', tweaks.accentColor);
    document.documentElement.style.setProperty('--color-secondary', tweaks.backgroundTone);
  }, [tweaks.accentColor, tweaks.backgroundTone]);

  return (
    <>
      <a href="#main" className="skip-nav">Skip to content</a>
      <Nav onQuoteClick={openQuote} />
      <main id="main">
        <Hero onQuoteClick={openQuote} />
        <Services />
        <WhyUs />
        <Team />
        <Testimonials />
        <BBCStrip />
        <FinalCTA onQuoteClick={openQuote} />
      </main>
      <Footer />

      <QuoteModal open={quoteOpen} onClose={closeQuote} />

      {tweaks.showCookieBanner && <CookieBanner />}
      <StickyMobileCTA onQuoteClick={openQuote} />

      {window.TweaksPanel &&
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Hero photo direction" />
          <window.TweakRadio
          label="Placeholder"
          value={tweaks.heroVariant}
          onChange={(v) => setTweak('heroVariant', v)}
          options={[
          { value: 'team', label: 'Team' },
          { value: 'portrait', label: 'Portrait' },
          { value: 'cityscape', label: 'City' }]
          } />
        
          <window.TweakSection label="Palette" />
          <window.TweakColor
          label="Accent (CTAs)"
          value={tweaks.accentColor}
          onChange={(v) => setTweak('accentColor', v)}
          options={['#8E191B', '#761416', '#1a1a1a', '#5a3a2a']} />
        
          <window.TweakColor
          label="Warm white"
          value={tweaks.backgroundTone}
          onChange={(v) => setTweak('backgroundTone', v)}
          options={['#f7f4ef', '#f3ece0', '#f4f1ea', '#ffffff']} />
        
          <window.TweakSection label="Chrome" />
          <window.TweakToggle
          label="Cookie banner"
          value={tweaks.showCookieBanner}
          onChange={(v) => setTweak('showCookieBanner', v)} />
        
        </window.TweaksPanel>
      }
    </>);

};

Object.assign(window, { App });
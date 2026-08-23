/**
 * ChandraKala Dance Academy — Temple Light Editorial
 * Design reminder: ceremonial typography, asymmetrical composition, pomegranate rhythm dots,
 * and concise choreographed motion. Every interaction should feel poised, warm, and purposeful.
 */
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  Phone,
  Play,
  Send,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const navItems = [
  ["Academy", "academy"],
  ["Courses", "courses"],
  ["Instructors", "instructors"],
  ["Gallery", "gallery"],
  ["Programs", "programs"],
  ["Enquire", "enquire"],
] as const;

const courses = [
  {
    level: "Open to all levels",
    title: "Hip Hop",
    ages: "Children & adults",
    description: "Build groove, confidence, musicality, and stage presence through energetic, expressive movement.",
    accent: "from-[#B83A3A] to-[#7C2027]",
  },
  {
    level: "Traditional form",
    title: "Sattriya",
    ages: "Children & adults",
    description: "Learn the grace, rhythm, and storytelling traditions of Assam’s celebrated classical dance form.",
    accent: "from-[#2A4F55] to-[#15343A]",
  },
  {
    level: "Folk tradition",
    title: "Assamese Bihu",
    ages: "Children & adults",
    description: "Celebrate the vitality of Bihu through joyful footwork, group choreography, and cultural expression.",
    accent: "from-[#B56D36] to-[#7D3F23]",
  },
];

const instructors = [
  {
    name: "Sancharu Boro",
    role: "Founder & Lead Teacher",
    initials: "SB",
    note: "Hip Hop, Sattriya, Assamese Bihu & dance training",
    tone: "bg-[#B83A3A]",
  },
  {
    name: "Dhiraj Nath",
    role: "Co-founder & Management",
    initials: "DN",
    note: "Admissions, coordination & academy management",
    tone: "bg-[#2A4F55]",
  },
  {
    name: "Sourav Maity",
    role: "CTO",
    initials: "SM",
    note: "Technology, website & digital operations",
    tone: "bg-[#B56D36]",
  },
];

const galleryItems = [
  { title: "Navarasa", type: "Performance", className: "gallery-main", image: "/images/chandrakala-gallery-performance_5cbcaed2.jpg" },
  { title: "The Practice Room", type: "Studio", className: "gallery-quote" },
  { title: "Feet in Rhythm", type: "Detail", className: "gallery-detail" },
  { title: "Curtain Call", type: "Performance", className: "gallery-curtain" },
  { title: "Before the Lights", type: "Backstage", className: "gallery-backstage" },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGallery, setActiveGallery] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("A course");
  const [reelOpen, setReelOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleGallery = useMemo(
    () => (activeGallery === "All" ? galleryItems : galleryItems.filter(item => item.type === activeGallery)),
    [activeGallery],
  );

  function handleEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name") || "A prospective student";
    toast.success("Your enquiry is ready to send", {
      description: "Your email application will open so you can send the academy your details.",
    });
    window.setTimeout(() => {
      const subject = encodeURIComponent(`ChandraKala enquiry — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${form.get("phone")}\nEmail: ${form.get("email")}\nCourse interest: ${selectedCourse}\n\nMessage: ${form.get("message")}`,
      );
      window.location.href = `mailto:sancharub8@gmail.com?subject=${subject}&body=${body}`;
    }, 350);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F0E5] text-[#1E2524]">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollToSection("top")} aria-label="Return to home">
          <img src="/images/chandrakala-dance-school-logo_2b0016cc.png" alt="ChandraKala Dance School logo" className="brand-mark" />
          <span>
            <strong>ChandraKala</strong>
            <small>Dance School</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)}>{label}</button>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-whatsapp" href="https://wa.me/919365933234?text=Hello%20ChandraKala%20Dance%20School%2C%20I%20would%20like%20to%20know%20about%20admissions." target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> <span>WhatsApp</span>
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-menu-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>
              <div className="mobile-menu-top">
                <span className="eyebrow">Navigate the academy</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={24} /></button>
              </div>
              <div className="mobile-nav-links">
                {navItems.map(([label, id], index) => (
                  <motion.button key={id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.055 }} onClick={() => { scrollToSection(id); setMenuOpen(false); }}>
                    <span>0{index + 1}</span>{label}<ArrowUpRight size={18} />
                  </motion.button>
                ))}
              </div>
              <a className="mobile-contact" href="https://wa.me/919365933234?text=Hello%20ChandraKala%20Dance%20School" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Begin on WhatsApp</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero-section">
          <div className="hero-photo" role="img" aria-label="Bharatanatyam dancer performing under warm stage light" />
          <div className="hero-shade" />
          <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
          <div className="hero-copy-wrap">
            <motion.p className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>Classical dance, alive with feeling</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              Let every<br /><em>step speak.</em>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.32 }}>
              ChandraKala is a home for disciplined classical training, joyful beginnings, and performances with presence.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.42 }}>
              <button className="btn-pomegranate" onClick={() => scrollToSection("enquire")}>Begin your journey <ArrowRight size={18} /></button>
              <button className="hero-text-link" onClick={() => scrollToSection("courses")}>Explore courses <ChevronRight size={18} /></button>
            </motion.div>
          </div>
          <motion.div className="hero-seal" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.48 }}>
            <span>Est.</span><strong>20<span>14</span></strong><small>Move. Master. Become.</small>
          </motion.div>
          <motion.button className="hero-scroll" onClick={() => scrollToSection("academy")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.76 }}>
            <span>Scroll to discover</span><ChevronDown size={18} />
          </motion.button>
        </section>

        <section className="announcement-bar" aria-label="Latest academy update">
          <div className="announcement-label"><Sparkles size={15} /> Latest update</div>
          <div className="announcement-copy"><span>Admissions for the new term are now open.</span><span className="announcement-dot" /> <span>Book your first studio visit.</span></div>
          <button onClick={() => scrollToSection("enquire")}>Read the notice <ArrowUpRight size={16} /></button>
        </section>

        <section id="academy" className="section academy-section">
          <div className="academy-layout">
            <motion.div className="academy-image-frame" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.6 }}>
              <img src="/images/chandrakala-studio-practice_006c31a5.jpg" alt="Students rehearsing in the ChandraKala studio" />
              <div className="academy-image-note"><span>01</span> A dance school where <em>tradition</em> and rhythm meet.</div>
            </motion.div>
            <motion.div className="academy-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.6, delay: 0.12 }}>
              <p className="eyebrow"><span>01</span> The academy</p>
              <h2>We teach more than a sequence of <em>movements.</em></h2>
              <p className="body-large">Every class connects detailed classical technique with the confidence to perform, express, and belong. Learners grow in attentive small groups, guided by faculty who see the individual inside the ensemble.</p>
              <div className="academy-values">
                <div><span>01</span><strong>Rooted technique</strong><p>Clear foundations built with patient repetition.</p></div>
                <div><span>02</span><strong>Expressive artistry</strong><p>Movement that makes room for imagination.</p></div>
                <div><span>03</span><strong>Generous community</strong><p>A studio culture that celebrates progress together.</p></div>
              </div>
              <button className="text-arrow" onClick={() => scrollToSection("instructors")}>Meet our teaching team <ArrowRight size={18} /></button>
            </motion.div>
          </div>
        </section>

        <section id="courses" className="section courses-section">
          <motion.div className="section-heading split-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55 }}>
            <div><p className="eyebrow light-eyebrow"><span>02</span> Dance courses</p><h2>Find the right<br /><em>first step.</em></h2></div>
            <p>Hip Hop, Sattriya, Assamese Bihu, and more—every course welcomes dancers ready to move with confidence.</p>
          </motion.div>
          <div className="course-grid">
            {courses.map((course, index) => (
              <motion.article className="course-card" key={course.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.48, delay: index * 0.08 }} whileHover={{ y: -8 }}>
                <div className={`course-number bg-gradient-to-br ${course.accent}`}>0{index + 1}</div>
                <div className="course-meta"><span>{course.level}</span><span>{course.ages}</span></div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => { setSelectedCourse(course.title); scrollToSection("enquire"); }}>Choose this path <ArrowUpRight size={18} /></button>
              </motion.article>
            ))}
          </div>
          <p className="courses-note">All dance courses are available without prices shown online. <button onClick={() => scrollToSection("enquire")}>Tell us about your dancer</button> and we’ll help you find the right class.</p>
        </section>

        <section id="instructors" className="section instructors-section">
          <motion.div className="instructors-top" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55 }}>
            <div><p className="eyebrow"><span>03</span> Leadership & team</p><h2>The people behind<br /><em>every rhythm.</em></h2></div>
            <p className="body-large">The ChandraKala team brings together teaching, thoughtful management, and reliable digital support for every dancer.</p>
          </motion.div>
          <div className="instructor-list">
            {instructors.map((instructor, index) => (
              <motion.article className="instructor-row" key={instructor.name} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                <div className={`instructor-monogram ${instructor.tone}`}>{instructor.initials}</div>
                <div className="instructor-name"><span>0{index + 1}</span><h3>{instructor.name}</h3></div>
                <div className="instructor-role"><strong>{instructor.role}</strong><p>{instructor.note}</p></div>
                <button className="round-arrow" onClick={() => toast.info(`${instructor.name}'s bio can be added here.`)} aria-label={`Learn more about ${instructor.name}`}><ArrowUpRight size={18} /></button>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <motion.div className="gallery-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55 }}>
            <div><p className="eyebrow light-eyebrow"><span>04</span> Gallery</p><h2>Light, line,<br /><em>and expression.</em></h2></div>
            <div className="gallery-filters" role="tablist" aria-label="Gallery filters">
              {["All", "Performance", "Studio", "Detail", "Backstage"].map(filter => (
                <button className={activeGallery === filter ? "filter-active" : ""} key={filter} onClick={() => setActiveGallery(filter)}>{filter}</button>
              ))}
            </div>
          </motion.div>
          <motion.div className="gallery-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleGallery.map((item, index) => (
                <motion.article className={`gallery-card ${item.className}`} key={item.title} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.28, delay: index * 0.04 }}>
                  {item.image && <img src={item.image} alt="Bharatanatyam dancers performing as an ensemble" />}
                  <div className="gallery-overlay" />
                  <span className="gallery-type">{item.type}</span>
                  <h3>{item.title}</h3>
                  <button onClick={() => toast.info(`${item.title} gallery lightbox is ready for your real academy photography.`)} aria-label={`View ${item.title}`}><ArrowUpRight size={18} /></button>
                  {item.className === "gallery-quote" && <p>“The body remembers what the heart gives it.”</p>}
                  {item.className === "gallery-detail" && <div className="detail-soles"><span /><span /><span /></div>}
                  {item.className === "gallery-curtain" && <div className="curtain-lines" />}
                  {item.className === "gallery-backstage" && <div className="backstage-disc"><MoonStar size={38} /></div>}
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>


        <section id="programs" className="section programs-section">
          <motion.div className="programs-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55 }}>
            <div><p className="eyebrow"><span>06</span> Events & programs</p><h2>Moments to<br /><em>gather around.</em></h2></div>
            <button className="outline-button" onClick={() => toast.info("A complete academy calendar can be connected here.")}>View full calendar <CalendarDays size={16} /></button>
          </motion.div>
          <div className="event-feature">
            <img src="/images/chandrakala-event-temple_ddd35940.jpg" alt="Lamp-lit recital courtyard prepared for a dance program" />
            <div className="event-feature-shade" />
            <div className="event-date"><span>Next</span><strong>Program</strong></div>
            <div className="event-content"><p className="eyebrow light-eyebrow">Studio showcase</p><h3>Where the moon<br />keeps time.</h3><p>An intimate evening of student works, live rhythm, and the quiet electricity before a performance.</p><button onClick={() => scrollToSection("enquire")}>Reserve your place <ArrowRight size={18} /></button></div>
          </div>
          <div className="event-list">
            {["Open studio afternoon", "Rhythm lab for young dancers", "Parents’ observation week"].map((event, index) => (
              <button key={event} onClick={() => toast.info(`${event} details can be added to the academy calendar.`)}><span>0{index + 1}</span><strong>{event}</strong><span>Program details</span><ArrowUpRight size={18} /></button>
            ))}
          </div>
        </section>

        <section id="enquire" className="enquiry-section">
          <div className="enquiry-decor enquiry-decor-one" /><div className="enquiry-decor enquiry-decor-two" />
          <div className="enquiry-wrap">
            <motion.div className="enquiry-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55 }}>
              <p className="eyebrow"><span>07</span> Admissions & enquiry</p>
              <h2>There is a place<br />for your <em>next step.</em></h2>
              <p>Tell us a little about the dancer in your life. We’ll help you choose a class and arrange a visit to the studio.</p>
              <a className="whatsapp-callout" href="https://wa.me/919365933234?text=Hello%20ChandraKala%20Dance%20School%2C%20I%20would%20like%20to%20ask%20about%20classes." target="_blank" rel="noreferrer"><MessageCircle size={20} /><span><small>Prefer a quick question?</small><strong>Message us on WhatsApp</strong></span><ArrowUpRight size={18} /></a>
            </motion.div>
            <motion.form className="enquiry-form" onSubmit={handleEnquiry} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <label>Your name<input required name="name" placeholder="How should we greet you?" /></label>
              <div className="form-pair"><label>Phone<input required type="tel" name="phone" placeholder="Your contact number" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label></div>
              <fieldset><legend>Which path feels right?</legend><div className="course-options">{["Hip Hop", "Sattriya", "Assamese Bihu", "Not sure yet"].map(option => <button type="button" className={selectedCourse === option ? "course-selected" : ""} onClick={() => setSelectedCourse(option)} key={option}>{selectedCourse === option && <Check size={13} />}{option}</button>)}</div></fieldset>
              <label>Anything you’d like us to know?<textarea name="message" placeholder="Age, past dance experience, preferred days..." rows={3} /></label>
              <button type="submit" className="btn-ink">Send my enquiry <Send size={17} /></button>
              <p className="form-note">Submitting opens your email app with the details filled in. Replace the academy inbox before publishing.</p>
            </motion.form>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-wrap">
            <motion.div className="contact-map" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
              <div className="map-grid" /><div className="map-line map-line-one" /><div className="map-line map-line-two" />
              <div className="location-pin"><MapPin size={25} fill="currentColor" /><span>Studio<br />location</span></div>
              <div className="map-corner"><span>CHANDRAKALA</span><span>LOCATE / 01</span></div>
            </motion.div>
            <motion.div className="contact-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55, delay: 0.1 }}>
              <p className="eyebrow light-eyebrow"><span>08</span> Contact & location</p>
              <h2>Come see what<br /><em>practice feels like.</em></h2>
              <p>Visit us at Janata High School on the Goreswar to Khoirabari Road. Contact us to arrange your school visit and find the class that feels right.</p>
              <div className="contact-links">
                <a href="tel:+919365933234"><Phone size={17} /><span><small>Founder & Lead Teacher</small><strong>93659 33234</strong></span></a>
                <a href="mailto:sancharub8@gmail.com"><Mail size={17} /><span><small>Write to Sancharu</small><strong>sancharub8@gmail.com</strong></span></a>
                <a href="tel:+919957322262"><Phone size={17} /><span><small>Management</small><strong>99573 22262</strong></span></a>
                <a href="mailto:its.sourav5198@gmail.com"><Mail size={17} /><span><small>Digital support</small><strong>its.sourav5198@gmail.com</strong></span></a>
              </div>
              <a className="outline-light" href="https://www.google.com/maps/search/?api=1&query=Janata%20High%20School%2C%20Goreswar%2C%20Goreswar%20to%20Khoirabari%20Road" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><img src="/images/chandrakala-dance-school-logo_2b0016cc.png" alt="ChandraKala Dance School logo" /><div><strong>ChandraKala</strong><span>Dance School</span></div></div>
          <p>Hip Hop. Sattriya. Assamese Bihu.<br />A dance school where every step becomes a story.</p>
          <div className="social-links"><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a><a href="#contact" aria-label="YouTube"><Youtube size={19} /></a><a href="#contact" aria-label="Facebook"><Facebook size={18} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 ChandraKala Dance School</span><button onClick={() => scrollToSection("top")}>Back to beginning <ArrowUpRight size={15} /></button><span>Goreswar · Assam</span></div>
      </footer>

      <AnimatePresence>
        {reelOpen && (
          <motion.div className="reel-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReelOpen(false)}>
            <motion.div className="reel-modal-card" initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.24 }} onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setReelOpen(false)} aria-label="Close performance archive"><X size={20} /></button>
              <div className="modal-reel-visual"><CirclePlay size={57} /><span>Performance reel placeholder</span></div>
              <p className="eyebrow"><span>Archive</span> Performance feature</p><h3>Bring your academy’s performance video into this frame.</h3><p>This animated viewer is ready for an embedded YouTube, Vimeo, or hosted performance reel.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

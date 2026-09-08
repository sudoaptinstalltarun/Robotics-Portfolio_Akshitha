import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Activity, ArrowDown, ArrowUpRight, Box, Check, ChevronDown, Crosshair, ExternalLink, Github, Linkedin, Mail, Menu, MoveUpRight, Phone, Plane, Satellite, Terminal, X } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

type Project = {
  number: string;
  title: string;
  shortTitle: string;
  context: string;
  description: string;
  tags: string[];
  accent: 'mint' | 'gold' | 'coral' | 'blue';
  icon: typeof Satellite;
  details: string[];
};

const projects: Project[] = [
  {
    number: '01',
    title: 'ICE-PATH',
    shortTitle: 'Lunar ice detection & rover traverse planning',
    context: 'ISRO BAH 2026',
    description: 'A transparent planning stack for the lunar south pole — turning radar, terrain, and illumination into routes a rover can trust.',
    tags: ['DFSAR', 'Weighted A*', 'Explainable AI'],
    accent: 'mint',
    icon: Satellite,
    details: ['Fused L/S-band DFSAR radar, terrain, and illumination models into an explainable Ice Confidence Index.', 'Implemented weighted A* rover traverse planning across permanently shadowed regions.', 'Built dynamic Safety-First and Shortest-Path planning profiles for mission trade-offs.'],
  },
  {
    number: '02',
    title: 'SUDOSQUAD',
    shortTitle: 'Intelligent autonomous warehouse picking robot',
    context: 'MAHE HACKATHON 2026',
    description: 'A ROS 2 warehouse robot that reads the room, finds the right marker, and reshapes its mission when the floor changes.',
    tags: ['ROS 2', 'Nav2', 'OpenCV'],
    accent: 'gold',
    icon: Box,
    details: ['Used multi-frame ArUco marker filtering to make shelf identification resilient.', 'Built a cost-based mission planner with dynamic re-planning and task queue updates.', 'Integrated autonomous navigation through ROS 2, Nav2, OpenCV, and ArUco detection.'],
  },
  {
    number: '03',
    title: 'HYBRID NAV',
    shortTitle: 'Hybrid autonomous navigation system',
    context: 'SAHYADRI COLLEGE',
    description: 'A hybrid ROS 2 pipeline where global planning and local vision guidance cooperate instead of competing.',
    tags: ['Gazebo', 'URDF', 'Action Servers'],
    accent: 'coral',
    icon: Crosshair,
    details: ['Bridged Nav2 global planning with local vision-based guidance for AGVs.', 'Implemented HSV line following, custom Action Servers, and Twist multiplexing.', 'Built URDF simulations in Gazebo with costmap tuning and recovery behaviors.'],
  },
  {
    number: '04',
    title: 'AGRIDRONE AUDIT',
    shortTitle: 'UAV-based crop ET sensing',
    context: 'SMART INDIA HACKATHON 2024',
    description: 'Aerial crop intelligence that turns drone footage into irrigation water accounting and actionable health zones.',
    tags: ['YOLOv8', 'OpenCV', 'UAV'],
    accent: 'blue',
    icon: Plane,
    details: ['Built evapotranspiration sensing and irrigation water accounting from aerial imagery.', 'Used YOLOv8 and OpenCV for crop detection with about 85% accuracy.', 'Mapped crop health zones and irrigation anomalies from drone footage.'],
  },
];

const skillGroups = [
  { label: 'ROBOTICS SYSTEMS', skills: ['ROS 2 Humble', 'Nav2', 'SLAM Toolbox', 'Gazebo', 'RViz', 'URDF'] },
  { label: 'CODE & TOOLING', skills: ['Python', 'C++', 'C', 'Bash', 'Git', 'Linux'] },
  { label: 'VISION & AI', skills: ['OpenCV', 'YOLOv8', 'ArUco Marker Detection'] },
  { label: 'UAV SYSTEMS', skills: ['Pixhawk', 'ArduPilot', 'MAVLink', 'Mission Planner'] },
  { label: 'MECHANICAL & EMBEDDED', skills: ['SOLIDWORKS', 'MATLAB/Simulink', 'Fusion 360', 'Raspberry Pi', 'Arduino'] },
];

function TelemetryMark() {
  return (
    <span className="telemetry-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="section-label" data-testid={`label-section-${index}`}>
      <span className="mono">{index}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <div className={`project-visual visual-${project.accent}`} aria-hidden="true">
      <div className="visual-scanline" />
      <div className="visual-grid" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-node node-one" />
      <div className="visual-node node-two" />
      <div className="visual-node node-three" />
      <div className="visual-route" />
      <Icon className="visual-icon" strokeWidth={1.2} />
      <span className="visual-coordinates mono">12° 49' 11.4"N<br />74° 56' 42.1"E</span>
      <span className="visual-readout mono">SYS / {project.number}<br />SIGNAL: STABLE</span>
    </div>
  );
}

function Navigation({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const links = [['HOME', '#home'], ['WORK', '#work'], ['CAPABILITIES', '#capabilities'], ['EXPERIENCE', '#experience'], ['ABOUT', '#about'], ['CONTACT', '#contact']];
  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)} data-testid="link-brand">
        <span className="brand-mark"><span /><span /><span /></span>
        <span>AS<span className="brand-dot">.</span></span>
      </a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
        {links.map(([label, href], index) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${label.toLowerCase()}`}>
            <span className="mono nav-index">0{index + 1}</span>{label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact" data-testid="link-header-contact">LET'S CONNECT <ArrowUpRight size={15} /></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-ambient ambient-one" />
      <div className="hero-ambient ambient-two" />
      <div className="hero-copy">
        <div className="eyebrow reveal"><TelemetryMark /><span className="mono">ROBOTICS / AUTONOMY / SYSTEMS</span><span className="status-live"><i /> AVAILABLE FOR OPPORTUNITIES</span></div>
        <h1 className="hero-title reveal reveal-delay-1">I make machines<br /><em>find their way.</em></h1>
        <p className="hero-summary reveal reveal-delay-2">Akshitha Shetty is a final-year Robotics and Automation Engineering student building robots that <strong>perceive, plan, and move</strong> in the real world.</p>
        <div className="hero-actions reveal reveal-delay-3">
          <a className="button-primary" href="#work" data-testid="link-hero-work">EXPLORE THE WORK <ArrowDown size={16} /></a>
          <a className="button-text" href="#contact" data-testid="link-hero-contact">GET IN TOUCH <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="hero-radar" aria-label="Abstract navigation radar visualization">
        <div className="radar-label radar-label-top mono">NAV / 01</div>
        <div className="radar-label radar-label-bottom mono">LAT 12.9716<br />LON 77.5946</div>
        <div className="radar-sweep" />
        <div className="radar-ring ring-outer" /><div className="radar-ring ring-middle" /><div className="radar-ring ring-inner" />
        <div className="radar-crosshair horizontal" /><div className="radar-crosshair vertical" />
        <div className="radar-point point-a"><span /></div><div className="radar-point point-b"><span /></div><div className="radar-point point-c"><span /></div>
        <div className="radar-center"><Crosshair size={20} /></div>
      </div>
      <div className="hero-footer mono"><span>01 — 06</span><span>SCROLL TO NAVIGATE <ArrowDown size={13} /></span><span>UDUPI / IN</span></div>
    </section>
  );
}

function IntroBand() {
  return (
    <section className="intro-band">
      <div className="intro-big mono">FIELD NOTE 001</div>
      <p>Good robotics is not a demo. It is a quiet chain of decisions — <span>what to sense, what to trust, and when to move.</span></p>
      <div className="intro-stamp"><Activity size={18} /><span className="mono">SYSTEMS<br />THINKING</span></div>
    </section>
  );
}

function WorkSection({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section id="work" className="content-section work-section">
      <div className="section-heading"><SectionLabel index="01" children="SELECTED WORK" /><h2>From raw signal<br />to <em>right action.</em></h2><p className="section-dek">Projects where perception becomes a plan, and plans become machines that can act.</p></div>
      <div className="project-list">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article className="project-card" key={project.number} data-testid={`card-project-${project.number}`}>
              <ProjectVisual project={project} />
              <div className="project-content">
                <div className="project-meta"><span className="mono project-number">{project.number}</span><span className="mono project-context">{project.context}</span></div>
                <h3>{project.title}</h3>
                <h4>{project.shortTitle}</h4>
                <p>{project.description}</p>
                <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <button className="project-link" onClick={() => onSelect(project)} data-testid={`button-project-details-${project.number}`}><span>VIEW SYSTEM NOTES</span><MoveUpRight size={16} /></button>
              </div>
              <Icon className="project-watermark" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="content-section capabilities-section">
      <div className="capabilities-intro"><SectionLabel index="02" children="CAPABILITIES" /><h2>A stack built<br />for <em>the unknown.</em></h2><p>Across simulation, software, sensors, and airframes — I like understanding the whole loop.</p></div>
      <div className="skills-board">
        {skillGroups.map((group, index) => (
          <div className="skill-group" key={group.label} data-testid={`group-skills-${index}`}>
            <div className="skill-group-head"><span className="mono">0{index + 1}</span><h3>{group.label}</h3></div>
            <div className="skill-list">{group.skills.map((skill) => <span key={skill}><Check size={13} />{skill}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="certification-row"><span className="mono">CERTIFIED IN</span><span>Python Foundation — SpringBoard</span><span>MATLAB Onramp — MathWorks</span><span>Simulink Onramp — MathWorks</span></div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="content-section experience-section">
      <div className="section-heading"><SectionLabel index="03" children="FIELD EXPERIENCE" /><h2>Learning by<br /><em>launching.</em></h2></div>
      <div className="experience-grid">
        <div className="experience-rail"><span className="mono">2024</span><div className="rail-line"><i /></div><span className="mono">NOW</span></div>
        <div className="experience-items">
          <article className="experience-item"><div className="experience-date mono">FEB 2025 — MAR 2025</div><div><h3>Project Intern <span>@ NIT Karnataka</span></h3><p>Designed a SOLIDWORKS catapult launch and parachute recovery mechanism for a 1.5 kg fixed-wing UAV. Balanced the airframe, modeled flight dynamics in MATLAB/Simulink, and integrated autonomous mission execution with live GCS telemetry using Mission Planner and ArduPilot.</p><div className="experience-tools"><span>SOLIDWORKS</span><span>MATLAB / SIMULINK</span><span>ARDUPILOT</span></div></div></article>
          <article className="experience-item"><div className="experience-date mono">JUN 2024 — PRESENT</div><div><h3>Core Team Member &amp; Documentation Lead <span>@ Team Challengers</span></h3><p>Design, build, and pilot aeromodels and UAVs for national-level events including IIT Kanpur Techfest. Lead technical documentation for Aerophilia 2025 and run hands-on STEM aeromodeling workshops.</p><div className="experience-tools"><span>AEROMODELING</span><span>UAV DESIGN</span><span>STEM OUTREACH</span></div></div></article>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="content-section about-section">
      <div className="about-orbit"><div className="orbit-dot" /><div className="orbit-path path-a" /><div className="orbit-path path-b" /><span className="mono">PROFILE / AS-01</span></div>
      <div className="about-copy"><SectionLabel index="04" children="ABOUT / EDUCATION" /><h2>Curious about<br /><em>the whole machine.</em></h2><p>My work sits at the seam between the algorithm and the actuator. I care about what happens after the neat simulation — when the camera is noisy, the map is incomplete, and the robot still needs to choose.</p><p>Currently studying Robotics and Automation Engineering at Sahyadri College of Engineering and Management, Mangaluru.</p><div className="education-card"><div className="mono">2023 — 2027</div><h3>B.E. Robotics &amp; Automation Engineering</h3><p>Sahyadri College of Engineering and Management, Mangaluru</p><strong>CGPA <span>7.01</span></strong></div></div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-top"><SectionLabel index="05" children="CONTACT" /><div className="contact-coordinates mono">12° 54' 00.0"N<br />74° 52' 00.0"E</div></div>
      <h2>Have a system<br />in mind<span>?</span></h2>
      <p>I'm always interested in thoughtful problems at the edge of autonomy, UAV systems, and the physical world.</p>
      <a className="contact-email" href="mailto:akshithashetty982@gmail.com" data-testid="link-email"><span>akshithashetty982@gmail.com</span><ArrowUpRight size={21} /></a>
      <div className="contact-details"><a href="tel:+917829154715" data-testid="link-phone"><Phone size={15} />+91 7829154715</a><span className="contact-divider" /><a href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} />GitHub <ExternalLink size={12} /></a><a href="https://www.linkedin.com/in/akshitha-shetty-01a1a2284" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} />LinkedIn <ExternalLink size={12} /></a></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><span /><span /><span /></span><span>AKSHITHA SHETTY</span></div><span className="mono">BUILT WITH CURIOSITY / 2026</span><a href="#home" className="back-top" data-testid="link-back-top">BACK TO TOP <ArrowUpRight size={14} /></a></footer>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close system notes" data-testid="button-close-project"><X size={20} /></button>
        <ProjectVisual project={project} />
        <div className="modal-copy"><span className="mono modal-kicker">{project.context} / SYSTEM NOTES</span><h2 id="project-modal-title">{project.title}</h2><p>{project.description}</p><ul>{project.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="portfolio-shell">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main><Hero /><IntroBand /><WorkSection onSelect={setSelectedProject} /><CapabilitiesSection /><ExperienceSection /><AboutSection /><ContactSection /></main>
      <Footer />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Home /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
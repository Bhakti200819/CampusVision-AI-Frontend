import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Smartphone,
  Bell,
  Camera,
  ArrowRight,
  Activity,
  BrainCircuit,
  Eye
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="cv-home">
      <nav className="cv-navbar">
        <a href="#how-it-works">How It Works</a>
        <Link to="/" className="cv-brand">
          <span className="cv-brand-icon">
            <BrainCircuit size={25} />
          </span>
          <span>CampusVision <b>AI</b></span>
        </Link>

        <div className="cv-nav-links">
          <a href="#features">Features</a>
          <a href="#technology">Technology</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>

        <Link to="/login" className="cv-login-btn">
          Portal Login <ArrowRight size={17} />
        </Link>
      </nav>

      <main>
        
<section className="cv-hero">
  <div className="cv-hero-content">
    <div className="cv-eyebrow">
      <span className="cv-live-dot" />
      NEXT-GENERATION CLASSROOM INTELLIGENCE
    </div>

    <h1>
      See Beyond
      <span> The Classroom.</span>
    </h1>

    <div className="cv-hero-subtitle">
      INTELLIGENCE IN EVERY FRAME.
    </div>

    <p>
      Transforming classroom environments with intelligent
      computer vision. Detect mobile phones, understand
      classroom events and empower educators with AI-driven insights.
    </p>

    <div className="cv-hero-actions">
      <Link to="/login" className="cv-primary-btn">
        Explore AI Platform <ArrowRight size={18} />
      </Link>

      <a href="#technology" className="cv-secondary-btn">
        Discover Technology
      </a>
    </div>

    <div className="cv-trust-line">
      <ShieldCheck size={18} />
      COMPUTER VISION • INTELLIGENT DETECTION • SMART CLASSROOMS
    </div>
  </div>

  <div className="cv-visual">
    <div className="cv-visual-top">
      <span><Activity size={15} /> AI VISION INTERFACE</span>
      <span className="cv-status">● DEMO ENVIRONMENT</span>
    </div>

    <div className="cv-camera-screen">
      <div className="cv-scan-line" />

      <div className="cv-camera-label">
        <Camera size={15} /> CLASSROOM / CAMERA_01
      </div>

      <div className="cv-ai-corner cv-corner-one" />
      <div className="cv-ai-corner cv-corner-two" />
      <div className="cv-ai-corner cv-corner-three" />
      <div className="cv-ai-corner cv-corner-four" />

      <div className="cv-detection-frame">
        <Smartphone size={42} />
        <span>MOBILE DETECTED</span>
        <small>AI CONFIDENCE: DEMO</small>
      </div>

      <div className="cv-camera-bottom">
        COMPUTER VISION ANALYSIS <span>●</span>
      </div>
    </div>

    <div className="cv-alert-panel">
      <div className="cv-alert-icon">
        <Bell size={21} />
      </div>
      <div>
        <strong>AI Detection Event</strong>
        <p>Classroom mobile detection preview</p>
      </div>
      <span className="cv-alert-tag">PREVIEW</span>
    </div>
  </div>
</section>


        <section className="cv-feature-section" id="features">
          <div className="cv-section-heading">
            <span>CORE CAPABILITIES</span>
            <h2>Intelligence Behind Every Classroom</h2>
            <p>Technology designed to support a focused learning environment.</p>
          </div>

          <div className="cv-feature-grid">
            <article className="cv-feature-card">
              <div><Smartphone size={24} /></div>
              <h3>Mobile Detection</h3>
              <p>AI-powered identification of mobile phones in classroom images.</p>
            </article>

            <article className="cv-feature-card">
              <div><Bell size={24} /></div>
              <h3>Smart Alerts</h3>
              <p>Designed to notify the responsible class teacher about detection events.</p>
            </article>

            <article className="cv-feature-card">
              <div><Camera size={24} /></div>
              <h3>Camera Monitoring</h3>
              <p>A centralized interface designed for classroom camera management.</p>
            </article>

            <article className="cv-feature-card">
              <div><Eye size={24} /></div>
              <h3>Detection History</h3>
              <p>Review recorded detection events and their available evidence.</p>
            </article>
          </div>
        </section>

        <section className="cv-about-section" id="about">
          <div>
            <span>ABOUT CAMPUSVISION AI</span>
            <h2>Creating a smarter digital classroom environment.</h2>
          </div>
          <p>
            CampusVision AI is a smart classroom monitoring platform
            designed to use computer vision technology for mobile
            phone detection and classroom event management.
          </p>
        </section>

        
<section className="cv-workflow-section" id="how-it-works">
  <div className="cv-workflow-heading">
    <span>THE INTELLIGENCE PROCESS</span>
    <h2>How CampusVision AI <b>Thinks.</b></h2>
    <p>
      From classroom visuals to intelligent insights.
      Four stages powering a smarter learning environment.
    </p>
  </div>

  <div className="cv-workflow-grid">

    <article className="cv-workflow-card">
      <div className="cv-workflow-number">01</div>
      <div className="cv-workflow-icon">
        <Camera size={29} />
      </div>
      <span className="cv-workflow-label">INPUT LAYER</span>
      <h3>Image Input</h3>
      <p>
        Classroom images are provided to the platform
        for intelligent visual processing.
      </p>
      <div className="cv-workflow-line" />
    </article>

    <article className="cv-workflow-card">
      <div className="cv-workflow-number">02</div>
      <div className="cv-workflow-icon">
        <Eye size={29} />
      </div>
      <span className="cv-workflow-label">VISION ENGINE</span>
      <h3>AI Detection</h3>
      <p>
        Computer vision analyzes the image and
        identifies mobile phones.
      </p>
      <div className="cv-workflow-line" />
    </article>

    <article className="cv-workflow-card">
      <div className="cv-workflow-number">03</div>
      <div className="cv-workflow-icon">
        <BrainCircuit size={29} />
      </div>
      <span className="cv-workflow-label">INTELLIGENCE LAYER</span>
      <h3>Event Analysis</h3>
      <p>
        Detection results can be organized into
        classroom events and history.
      </p>
      <div className="cv-workflow-line" />
    </article>

    <article className="cv-workflow-card">
      <div className="cv-workflow-number">04</div>
      <div className="cv-workflow-icon">
        <Bell size={29} />
      </div>
      <span className="cv-workflow-label">RESPONSE LAYER</span>
      <h3>Teacher Alert</h3>
      <p>
        The system is designed to send a detection
        notification to the responsible class teacher.
      </p>
      <div className="cv-workflow-line" />
    </article>

  </div>

  <div className="cv-workflow-footer">
    <span className="cv-live-dot" />
    INTELLIGENCE THAT SUPPORTS FOCUSED LEARNING
  </div>
</section>


        <section className="cv-technology-section" id="technology">
          <div>
            <span>OUR TECHNOLOGY</span>
            <h2>AI Vision. Intelligent Insights.</h2>
            <p>
              A platform built around computer vision, detection
              processing and centralized classroom management.
            </p>
          </div>
          <BrainCircuit size={75} />
        </section>
      </main>

      
{/* CONTACT SECTION */}

<section className="cv-contact-section" id="contact">
  <div className="cv-contact-content">
    <span className="cv-contact-label">
      CONNECT WITH CAMPUSVISION AI
    </span>

    <h2>
      Let's Build a
      <span> Smarter Campus.</span>
    </h2>

    <p>
      Interested in intelligent classroom monitoring?
      Connect with us to explore the CampusVision AI platform.
    </p>

    <div className="cv-contact-details">
      <div className="cv-contact-item">
        <span className="cv-contact-icon">
          <BrainCircuit size={21} />
        </span>
        <div>
          <strong>AI Innovation</strong>
          <small>Intelligent classroom technology</small>
        </div>
      </div>

      <div className="cv-contact-item">
        <span className="cv-contact-icon">
          <ShieldCheck size={21} />
        </span>
        <div>
          <strong>Smart Campus Security</strong>
          <small>Technology for focused learning</small>
        </div>
      </div>
    </div>

    <Link to="/login" className="cv-contact-button">
      Explore Software Portal
      <ArrowRight size={18} />
    </Link>
  </div>

  <div className="cv-contact-visual">
    <div className="cv-contact-orbit cv-orbit-one" />
    <div className="cv-contact-orbit cv-orbit-two" />

    <div className="cv-contact-brain">
      <BrainCircuit size={100} />
      <span>CAMPUSVISION AI</span>
      <small>INTELLIGENT CLASSROOM SYSTEM</small>
    </div>
  </div>
</section>


      
<footer className="cv-footer" id="footer">
  <div className="cv-footer-main">

    <div className="cv-footer-brand">
      <h2>CampusVision <span>AI</span></h2>
      <p>
        Intelligent classroom monitoring powered by
        artificial intelligence. Building safer and
        smarter learning environments.
      </p>
      <div className="cv-footer-status">
        <span className="cv-status-dot"></span>
        AI Innovation for Smart Campuses
      </div>
    </div>

    <div className="cv-footer-links">
      <h3>Explore</h3>
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#technology">Technology</a>
    </div>

    <div className="cv-footer-links">
      <h3>Platform</h3>
      <a href="/login">Portal Login</a>
      <a href="#about">About System</a>
      <a href="#contact">Contact</a>
    </div>

    <div className="cv-footer-contact">
      <h3>Our Vision</h3>
      <p>Smarter Classrooms.</p>
      <p>Safer Learning.</p>
      <p>Intelligent Future.</p>
    </div>

  </div>

  <div className="cv-footer-bottom">
    <p>© 2026 CampusVision AI. All rights reserved.</p>
    <p>Designed for the Future of Education</p>
  </div>
</footer>

    </div>
  );
}

export default Home;
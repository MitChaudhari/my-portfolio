// src/pages/index.tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { createFireflies } from '../utils/createFireflies';
import { addJumpEffectToIcons } from '../utils/iconJumpEffect';
import { handleScroll } from '../utils/handleScroll';
import Navbar from '../components/Navbar';
import { EmailIcon, LinkedInIcon, GitHubIcon } from '../components/Icons';
import DotPortrait from '../components/DotPortrait';

export default function Home() {
  const firefliesRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState(null);
  const [arrowUpData, setArrowUpData] = useState(null);

  // Home page background fireflies effect
  useEffect(() => {
    createFireflies(firefliesRef.current, 12);

    return () => {
      if (firefliesRef.current) {
        firefliesRef.current.innerHTML = '';
      }
    };
  }, []);

  // Icon Jump Effect
  useEffect(() => {
    const cleanupJumpEffect = addJumpEffectToIcons();

    return cleanupJumpEffect;
  }, []);

  // Fetch Arrow-Down & Arrow-up Animation
  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const [arrowDown, arrowUp] = await Promise.all([
          fetch('/animation/arrow-down.json').then((res) => res.json()),
          fetch('/animation/arrow-up.json').then((res) => res.json()),
        ]);
        setAnimationData(arrowDown);
        setArrowUpData(arrowUp);
      } catch (error) {
        console.error('Error loading animations:', error);
      }
    };
    fetchAnimationData();
  }, []);

  return (
    <>
      <Head>
        <title>Mitansh's Portfolio</title>
        <meta name="description" content="My personal portfolio Website." />
        <link rel="icon" href="/images/logo/logo.png" />
      </Head>

      {/* Home Section */}
      <div id="home" className="home-container">
        <div className="moon"></div>
        <img
          src="/images/background/hero-bg.jpg"
          alt="Background Image"
          className="background-image"
        />

        <div className="fireflies" ref={firefliesRef}></div>

        <div className="title-container">
          <h1 className="title">
            Hi, I'm <span className="highlight">Mitansh Chaudhari</span>
          </h1>
        </div>

        <div className="sub-title-container">
          <p>Aspiring Software Engineer | Full Stack Web & App Developer</p>
        </div>
        <div className="social-icons-container">
          <a
            href="mailto:mitansh46@gmail.com"
            className="social-icon home-icon email-icon"
          >
            <EmailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/mit01/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon home-icon linkedin-icon"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/MitChaudhari"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon home-icon github-icon"
          >
            <GitHubIcon />
          </a>
        </div>

        <div className="lottie-animation-container">
          <a href="#about" onClick={(event) => handleScroll(event, 'about')}>
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </a>
        </div>
      </div>
      <Navbar />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="portrait-and-description">
          <div className="portrait-container">
            <DotPortrait />
          </div>
          <div className="about-description card">
            <h2 className="about-title">About Me</h2>
            <div className="about-text">
            <p>
              Like a <span className="highlight-sun">traveler</span> standing on the edge of a cliff, watching the <span className="highlight-sun">golden sun</span> dip below the horizon, I find myself at the beginning of an extraordinary journey. The <span className="highlight-river">winding river</span> below reflects the twists and turns of my path—each challenge I’ve embraced and every lesson I’ve gathered along the way.
            </p>
            <p>
              As a recent graduate of IIT Chicago and a <span className="highlight-engineer">software engineer</span> by craft, I see my career as the <span className="highlight-house">house in the hills</span>, its warm light burning with <span className="highlight-light">curiosity</span>, <span className="highlight-light">creativity</span>, and <span className="highlight-light">purpose</span>. Each <span className="highlight-code">line of code</span> I write is a step forward on this journey—building bridges, exploring uncharted horizons, and shaping a future full of possibilities.
            </p>
            <p>
              I believe that great <span className="highlight-engineer">engineering</span>, like great journeys, is a balance of <span className="highlight-balance">precision</span> and <span className="highlight-balance">imagination</span>. As I take my next steps, I carry with me a <span className="highlight-drive">passion for creating</span>, a <span className="highlight-drive">resilience forged through challenges</span>, and the drive to leave a <span className="highlight-sun">spark of light</span> wherever I go.
            </p>
            <p>
              -mitt✌️
            </p>

            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="projects-title">Projects</h2>
        {/* Your projects go here */}
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title">Contact</h2>
        {/* Your contact form or details go here */}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-arrow">
          {arrowUpData && (
            <a href="#home" onClick={(event) => handleScroll(event, 'home')}>
              <Lottie animationData={arrowUpData} loop={true} className="arrow-up" />
            </a>
          )}
        </div>
        <div className="social-icons-container">
          <a href="mailto:mitansh46@gmail.com" className="social-icon email-icon">
            <EmailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/mit01/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin-icon"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/MitChaudhari"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon github-icon"
          >
            <GitHubIcon />
          </a>
        </div>
        <p className="copyright">MITANSH CHAUDHARI ©2024</p>
      </footer>
    </>
  );
}

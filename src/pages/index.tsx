/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// src/pages/index.tsx
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { createFireflies } from '../utils/firefliesEffect';
import { addJumpEffectToIcons } from '../utils/iconJumpEffect';
import { handleScroll } from '../utils/handleScroll';
import Navbar from '../components/Navbar';
import { EmailIcon, LinkedInIcon, GitHubIcon } from '../components/Icons';


export default function Home() {
  const firefliesRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState(null);

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

  // Arrow-Down Animation
  useEffect(() => {
    fetch('/animation/arrow-down.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
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
        <div className="development-banner">
          <p>This website is under development 🚧</p>
        </div>

        <div className="moon"></div>

        <img src="/images/background/hero-bg.jpg" alt="Background Image" className="background-image" />

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
        <a href="mailto:mitansh46@gmail.com" className="social-icon email-icon">
            <EmailIcon />
          </a>
          <a href="https://www.linkedin.com/in/mit01/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin-icon">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/MitChaudhari" target="_blank" rel="noopener noreferrer" className="social-icon github-icon">
            <GitHubIcon />
          </a>
        </div>
        <div className="lottie-animation-container">
          <a href="#about" onClick={handleScroll}>
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </a>
        </div>
      </div>
      <Navbar />

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="about-title">About Me</h2>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="about-title">Projects</h2>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="about-title">Contact</h2>
      </section>
    </>
  );
}

'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './globals.css';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="main-container">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto navbar-links">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/about">About Me</Nav.Link>
            <Nav.Link as={Link} href="/resume">Resume</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <header className="header">
        <h1>Bryan Tran</h1>
        <h2>I am a developer who is eager to learn new technologies.</h2>
        <h2>
          I went to 
            <Image src="/assets/LSU-logo.png" alt="LSU logo" width={100} height={100} />
          and graduated with a Bachelor's of Science in Computer Science.
        </h2>
        <h2>
          I currently work at 
          <span className="inline-image">
            <Image src="/assets/ibm_blue.png" alt="IBM logo" width={100} height={100} />
          </span> 
          as an Application Developer.
        </h2>
        <h2>I really like gaming, fitness, and food.</h2>
      </header>

      
      <div className="social-links">
        <a href="mailto:bryantran21@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
        <a href="https://github.com/bryantran21" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://www.instagram.com/bryan.tran/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/bryan-huy-tran/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://x.com/bryantran21" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} size="2x" />
        </a>
      </div>
    </div>
  );
}

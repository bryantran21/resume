'use client';


import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3, faJsSquare, faReact, faAngular, faVuejs, faBootstrap, faJava, faNodeJs, faGithub, faPython, faPhp, faJira } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import '../globals.css';



export default function Resume() {
    return (
        <div>
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

            <h1>My Work Experience</h1>
            <div className="cards-container">
                <div className="card">
                    <Image src="/assets/ibm.png" alt="Job 1 Image" width={300} height={250} />
                    <div className="overlay">
                    <h1>Application Developer</h1>
                        <ul>
                            <li>Designed software application to have a more responsive UI that reports bench metrics to Delivery manager using Figma/Carbon</li>
                            <li>Recieved Secret level clearance to work on Navy ADE project</li>
                            <li>Answer Help Desk tickets for the Navy ADE application and improve the Help Desk experience for current customers by utilizing Jira to track tickets</li>
                        </ul>  
                    </div>
                </div>

                <div className="card">
                    <Image src="/assets/lsu.png" alt="Job 2 Image" width={300} height={250} />
                    <div className="overlay">
                    <h1>Student Web Developer</h1>
                    <ul>
                        <li>Diagnose, fix errors, and application crashes through log files, code walkthroughs, and error logs using different DevOps tools through a System Admin</li>
                        <li>Remodeled LSU’s applications using WAVE, HTML, and CSS, making it more accessible for users with screen readers and updating the Bootstrap packages.</li>
                        <li>Migrated LSU's java applications to most current version of Spring by updating the Maven repositories and resolving any conflicts among repos.</li>
                    </ul>
                    </div>
                </div>

                <div className="card">
                    <Image src="/assets/tag.png" alt="Job 2 Image" width={300} height={250} />
                    <div className="overlay">
                    <h1>Fullstack Developer</h1>
                    <ul>
                        <li>Conceptualizing design for application/functionality of custom software for laboratory animal clinics</li>
                        <li>Creating site layout/user interfaces from provided design concepts by using standard HTML/CSS/PHP/Javascript practices for web applications</li>
                        <li>Designed and creation of relational database schemas, using BackboneJS to apply front end user requirements</li>
                    </ul>
                    </div>
                </div>

                <div className="card">
                    {/* the png is making it bigger for some reason */}
                    <Image src="/assets/mapp.jpg" alt="Job 2 Image" width={300} height={250} />
                    <div className="overlay">
                        <h1>IT Intern</h1>
                    <ul>
                        <li>Provided technical support for all departments within the company through video calls and remote access, on-site debugging, and setting up hardware for new/current users</li>
                        <li>Creating site layout/user interfaces from provided design concepts by using standard HTML/CSS/PHP/Javascript practices for web applications</li>
                        <li>Designed and creation of relational database schemas, using BackboneJS to apply front end user requirements</li>
                    </ul>
                    </div>
                </div>
            </div>

            <h1>Technologies & Skills</h1>
            
            <div className="skills-container">
                <div className="skills">
                    <h2>Frontend</h2>
                    <ul>
                        <li>HTML <FontAwesomeIcon icon={faHtml5} /></li>
                        <li>CSS <FontAwesomeIcon icon={faCss3} /></li>
                        <li>JavaScript <FontAwesomeIcon icon={faJsSquare} /></li>
                        <li>React <FontAwesomeIcon icon={faReact} /></li>
                        <li>Angular <FontAwesomeIcon icon={faAngular} /></li>
                        <li>Vue <FontAwesomeIcon icon={faVuejs} /></li>
                        <li>Bootstrap <FontAwesomeIcon icon={faBootstrap} /></li>
                        <li>Tailwind</li>
                        <li>Handlebars</li>
                    </ul>
                </div>

                <div className="skills">
                    <h2>Backend</h2>
                    <ul>
                        <li>Java <FontAwesomeIcon icon={faJava} /></li>
                        <li>Node.js <FontAwesomeIcon icon={faNodeJs} /></li>
                        <li>Python <FontAwesomeIcon icon={faPython} /></li>
                        <li>PHP <FontAwesomeIcon icon={faPhp} /></li>
                        <li>SQL <FontAwesomeIcon icon={faDatabase} /></li>
                        <li>Apache</li>
                        <li>Tomcat</li>
                        <li>Spring</li>
                        <li>Thymeleaf</li>
                        <li>Azure</li>
                    </ul>
                </div>

                <div className="skills">
                    <h2>Tools</h2>
                    <ul>
                        <li>Git <FontAwesomeIcon icon={faGithub} /></li>
                        <li>Jira <FontAwesomeIcon icon={faJira} /></li>
                        <li>VS Code</li>
                        <li>IntelliJ</li>
                        <li>Eclipse</li>
                        <li>Visual Studio</li>
                        <li>C#</li>
                        <li>Web Servlet Frameworks</li>
                        <li>NPM</li>
                        <li>Webpack</li>
                        <li>AWS</li>
                    </ul>
                </div>

                <div className="skills">
                    <h2>Other</h2>
                    <ul>
                        <li>Agile</li>
                        <li>Scrum</li>
                        <li>DevOps</li>
                        <li>CI/CD</li>
                        <li>Unit Testing</li>
                        <li>End-to-End Testing</li>
                        <li>Documentation</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

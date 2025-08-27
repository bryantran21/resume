"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../globals.css";

export default function About() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/steam")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.response?.games || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load Steam games", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bio-page">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto navbar-links">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About Me</Nav.Link>
              <Nav.Link href="/resume">Resume</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1 style={{ display: "inline", marginBottom: "40px" }}>
        Some facts/hobbies of mine{" "}
        <Image
          src="/assets/happy.png"
          alt="emoji"
          width={50}
          height={50}
          style={{ verticalAlign: "middle", display: "inline" }}
        />
      </h1>

      <div className="hobbies">
        {/* Grid container for Music and Steam Games */}
        <div className="grid-container">
          <section className="music">
            <h2>Top 50 Songs (in my opinion)</h2>
            <iframe
              width="575"
              height="315"
              src="https://www.youtube.com/embed/videoseries?list=PLfgMlANXfidf3d0MPGQ5vUAwomnphixJQ"
              title="YouTube playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </section>

          <section className="steam-games">
            <h2>Steam Games (100% Completed)</h2>
            {loading && <p>Loading...</p>}
            <div className="game-grid">
              {games
                .filter((game) => game.playtime_forever >= 100)
                .map((game) => (
                  <div key={game.appid} className="game-card">
                    <img
                      src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
                      alt={game.name}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <div className="game-info">
                      <span className="game-name">{game.name}</span>
                      <span className="badge">{Math.round(game.playtime_forever / 60)} hrs</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

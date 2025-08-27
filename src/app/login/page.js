"use client";

import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation"; // to redirect after login
import "../globals.css"; // Adjust path as needed

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear any previous error

  const endpoint = isSignUp ? "/api/signup" : "/api/login";
  const payload = isSignUp
    ? { email, password, username }
    : { email, password };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      sessionStorage.setItem("userId", data.userId || "");
      sessionStorage.setItem("username", data.username || "");
      console.log(data.message);
      router.push("/menu");
    }
  } catch (err) {
    setError("An unexpected error occurred");
    console.error(err);
  }
};

  return (
    <div className="auth-page" style={{ minHeight: "100vh" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-links">
              <Nav.Link as={Link} href="/">Home</Nav.Link>
              <Nav.Link as={Link} href="/about">About Me</Nav.Link>
              <Nav.Link as={Link} href="/resume">Resume</Nav.Link>
              <Nav.Link as={Link} href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="auth-container" style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div className="auth-box" style={{ padding: "2rem", borderRadius: "8px", width: "320px" }}>
          <h2 style={{ color: "var(--purpleAccent, #8a2be2)" }}>
            {isSignUp ? "Sign Up" : "Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "0.75rem", padding: "0.5rem" }}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "0.75rem", padding: "0.5rem" }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            />

            {error && (
              <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "var(--purpleAccent, #8a2be2)",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <p
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              color: "white", // <-- updated from purple to white
              textAlign: "center",
            }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </p>
        </div>
      </div>
    </div>
  );
}

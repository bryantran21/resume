"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
import Link from 'next/link';

export default function Menu() {
  const [modalOpen, setModalOpen] = useState(false);
  const [section, setSection] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      const storedUsername = sessionStorage.getItem("username");

      setUserId(storedUserId || null);
      setUsername(storedUsername || "");

      if (!storedUserId) {
        router.replace('/login');
      }
    }
  }, [router]);

  const handleOpenModal = (type) => {
    setSection(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSection("");
  };

  return (
    <div className="menu-container">
      <div className="user-info-topright">
        <div><strong>ID:</strong> {userId || "Not Found"}</div>
      </div>

      <div className="menu-center-content">
        <h1>Welcome <strong></strong> {username || "Not Found"}</h1>
        <p>Please select which application to use.</p>
        <div className="button-group">
          <button className="glow-button" onClick={() => handleOpenModal("gym")}>Training</button>
          <button className="glow-button" onClick={() => handleOpenModal("sports")}>Sports</button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>{section === "gym" ? "Gym Options" : "Sports Options"}</h2>
            {section === "gym" ? (
              <>
                <button className="modal-btn">Workout Tracker</button>
              </>
            ) : (
              <>
                <Link href="/NFL" className="modal-btn">
                  NFL
                </Link>
                <Link href="/CFB" className="modal-btn">
                  CFB
                </Link>
              </>
            )}
            <button className="close-btn" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

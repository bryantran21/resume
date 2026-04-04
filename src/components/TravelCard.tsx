"use client";

import { useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function TravelCard() {
  const [state, setState] = useState<"closed" | "expanding" | "expanded">("closed");

  const isOpen = state !== "closed";

  const handleOpen = () => {
    if (state === "closed") {
      setState("expanding");

      setTimeout(() => {
        setState("expanded");
      }, 300);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("closed");
  };

  const globeRef = useRef<any>(null);

  return (
    <>
      <div className={`bento-card ${state}`} onClick={handleOpen}>
        {/* CLOSE BUTTON */}
        {state === "expanded" && (
          <button className="close" onClick={handleClose}>
            ✕
          </button>
        )}

        {/* TEXT */}
        <div className="content">
          <h3>Travel Globe 🌍</h3>
          <p>Places I've been</p>
        </div>

        {/* GLOBE */}
        <div className="globe-wrapper">
          <Globe
            width={isOpen ? window.innerWidth : 120}
            height={isOpen ? window.innerHeight : 120}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundColor="rgba(0,0,0,0)"
            enablePointerInteraction={state === "expanded"}
            onGlobeReady={(globe) => {
              globe.controls().autoRotate = true;
              globe.controls().autoRotateSpeed = 1;
            }}
          />
        </div>
      </div>

      <style>{`
        .bento-card {
          position: relative;
          padding: 20px;
          border-radius: 20px;
          background: #111;
          color: white;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .bento-card:hover {
          transform: scale(1.03);
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .globe-wrapper {
          position: absolute;
          bottom: -20px;
          right: -20px;
          opacity: 0.6;
          transition: all 0.4s ease;
        }

        /* STEP 1: expand animation */
        .expanding {
          transform: scale(1.2);
          z-index: 50;
        }

        /* STEP 2: fullscreen */
        .expanded {
          position: fixed;
          inset: 0;
          border-radius: 0;
          z-index: 999;
          background: black;
        }

        /* CLOSE BUTTON */
        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background: rgba(0,0,0,0.6);
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
          border-radius: 8px;
          padding: 6px 10px;
        }
      `}</style>
    </>
  );
}
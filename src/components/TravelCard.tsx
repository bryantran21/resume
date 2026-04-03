"use client";

import { useState } from "react";
import Globe from "react-globe.gl";

export default function TravelCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`bento-card travel ${open ? "expanded" : ""}`}
        onClick={() => setOpen(true)}
      >
        {/* CLOSE BUTTON (only when expanded) */}
        {open && (
          <button
            className="close"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 prevents re-open bug
              setOpen(false);
            }}
          >
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
            width={open ? window.innerWidth : 120}
            height={open ? window.innerHeight : 120}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundColor="rgba(0,0,0,0)"
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
          transition: all 0.5s ease;
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
          transition: all 0.5s ease;
        }

        .bento-card {
            position: relative;
            padding: 20px;
            border-radius: 20px;
            background: #111;
            color: white;
            cursor: pointer;
            overflow: hidden;

            transition: transform 0.5s ease, border-radius 0.5s ease;
            }

            .bento-card:hover {
            transform: scale(1.03);
            }

            /* STEP 1: smooth scale up */
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
      `}</style>
    </>
  );
}
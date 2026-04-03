"use client";

import Globe from "react-globe.gl";
import { useState } from "react";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  { name: "New York 🇺🇸", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles 🇺🇸", lat: 34.0522, lng: -118.2437 },
  { name: "Tokyo 🇯🇵", lat: 35.6762, lng: 139.6503 },
  { name: "Paris 🇫🇷", lat: 48.8566, lng: 2.3522 },
];

export default function GlobeModal({ onClose }: { onClose: () => void }) {
  const [hoverD, setHoverD] = useState<Location | null>(null);

  return (
    <div className="overlay">
      <button className="close" onClick={onClose}>✕</button>

      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.02}
        pointRadius={0.3}
        pointColor={() => "#00ffff"}
        onPointHover={setHoverD}
      />

      {hoverD && (
        <div className="tooltip">
          {hoverD.name}
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 1000;
        }

        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 2000;
          background: none;
          color: white;
          font-size: 24px;
          border: none;
          cursor: pointer;
        }

        .tooltip {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: rgba(0,0,0,0.7);
          padding: 8px 12px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
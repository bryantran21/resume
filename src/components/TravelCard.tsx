"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Globe from "react-globe.gl";
import { motion, AnimatePresence } from "framer-motion";

// Each place is just a name; add an `image` path once you have photos for it.
const MY_TRAVEL_DATA = {
  "Texas":
  { title: "Lone Star State",
    places: [{ name: "Houston" }] },
  "New York": { title: "The Big Apple",
    places: [{ name: "NYC" }] },
  "Louisiana": { title: "Pelican State",
    places: [
      { name: "New Orleans" },
      { name: "Baton Rouge" }
    ] },
  "Florida": { title: "Sunshine State",
    places: [{ name: "Orlando" }] },
  "Colorado": { title: "Centennial State",
    places: [
      { name: "Denver" },
      { name: "Breckenridge" }] },

    "Washington": { title: "Evergreen State",
    places: [
      { name: "Seattle" }] },
    "Washington D.C.": { title: "Capital City",
    places: [
      { name: "Smithsonian Museums" }
    ] },
  "Illinois": { title: "Prairie State",
    places: [{ name: "Chicago" }] },
  "Mississippi": { title: "Magnolia State",
    places: [{ name: "Biloxi" }] },
  "Alabama": { title: "Yellowhammer State",
    places: [{ name: "Orange Beach" }] },
  "Georgia": { title: "Peach State",
    places: [
      { name: "Atlanta" },
      { name: "Duluth" }
    ] },
};

type StateName = keyof typeof MY_TRAVEL_DATA;

const VISITED_STATES = Object.keys(MY_TRAVEL_DATA);

export default function TravelCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [geoData, setGeoData] = useState({ features: [] });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const globeRef = useRef<any>();

  // React to the site's light/dark theme
  useEffect(() => {
    const read = () =>
      setTheme((document.documentElement.dataset.theme as 'light' | 'dark') || 'light');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const globeImg =
    theme === 'dark'
      ? '//unpkg.com/three-globe/example/img/earth-dark.jpg'
      : '//unpkg.com/three-globe/example/img/earth-day.jpg';
  const atmoColor = theme === 'dark' ? '#b8ada0' : '#8ab4d8';

  // Load US States GeoJSON
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
      .then(res => res.json())
      .then(setGeoData);
  }, []);

  // Initial Camera position (Center on USA)
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = !isExpanded; 
      controls.autoRotateSpeed = 0.8;
      // Focus on US
      globeRef.current.pointOfView({ lat: 37.09, lng: -95.71, altitude: 2.2 });
    }
  }, [isExpanded]);

  return (
    <>
        <motion.div
          layoutId="globe-card"
          className="bento-card"
          onClick={() => setIsExpanded(true)}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
        <div className="card-header">
          <motion.div layoutId="title" className="text-content">
            <h3>Travel Globe 🌍</h3>
            <p>Places I've been</p>
          </motion.div>
        </div>

        <div className="globe-preview-wrapper">
          <Globe
            ref={globeRef}
            width={280}
            height={280}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={globeImg}
            showAtmosphere={true}
            atmosphereColor={atmoColor}
            atmosphereDaylightAlpha={0.3}
          />
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              layoutId="globe-card"
              className="expanded-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button className="close-btn" onClick={() => setIsExpanded(false)}>✕</button>

              <div className="fullscreen-container">
                <div className="globe-main">
                  <Globe
                    ref={globeRef}
                    width={typeof window !== 'undefined' ? window.innerWidth : 1000}
                    height={typeof window !== 'undefined' ? window.innerHeight : 1000}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl={globeImg}

                    // POLYGON FIXES
                    polygonsData={geoData.features}
                    polygonCapColor={d => VISITED_STATES.includes(d.properties.name) ? 'rgba(244, 238, 225, 0.8)' : 'rgba(255, 255, 255, 0.05)'}
                    polygonSideColor={() => 'rgba(0, 0, 0, 0.2)'}
                    polygonStrokeColor={() => 'rgba(255, 255, 255, 0.2)'}
                    onPolygonClick={(polygon: any) => {
                      const name = polygon.properties.name;
                      if (VISITED_STATES.includes(name)) {
                        setSelectedLocation(name);
                      }
                    }}
                    polygonAltitude={d => VISITED_STATES.includes(d.properties.name) ? 0.02 : 0.005}
                  />
                </div>

                <AnimatePresence>
                  {selectedLocation && (
                    <motion.div
                      className="compendium-panel"
                      initial={{ x: 400 }}
                      animate={{ x: 0 }}
                      exit={{ x: 400 }}
                    >
                      <button className="back-link" onClick={() => setSelectedLocation(null)}>
                        ← Back to Map
                      </button>
                      <h2>{selectedLocation}</h2>
                      <p className="subtitle">{MY_TRAVEL_DATA[selectedLocation as StateName]?.title}</p>
                      <div className="places-list">
                        {MY_TRAVEL_DATA[selectedLocation as StateName]?.places.map((place, i) => (
                          <div key={i} className={`travel-place ${place.image ? 'has-image' : ''}`}>
                            {place.image && (
                              <img src={place.image} alt={place.name} className="travel-place-image" />
                            )}
                            <span className="travel-place-name">{place.name}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .bento-card {
          grid-column: span 2;
          width: auto;
          min-height: 220px;
          background: var(--panel);
          border-radius: 0;
          padding: 24px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--line);
          box-shadow: 5px 5px 0 0 var(--shadow);
        }
        @media (max-width: 600px) { .bento-card { grid-column: span 1; } }

        .expanded-view {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: #000;
        }

        .globe-preview-wrapper {
          position: absolute;
          top: 55%;
          left: 55%;
          transform: translate(-20%, -20%);
          pointer-events: none;
        }

        .compendium-panel {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 380px;
          background: #0f0f0f;
          padding: 80px 40px;
          z-index: 1020;
          color: white;
          border-left: 1px solid rgba(255,255,255,0.1);
          overflow-y: auto;
        }

        /* Fullscreen overlay is always dark — keep text light regardless of site theme */
        .compendium-panel h2 { color: #f4efe1; margin: 0; }
        .compendium-panel .subtitle { color: #b8ada0; margin: 4px 0 0; }

        .text-content h3 { color: var(--text); margin: 0; font-size: 1.4rem; }
        .text-content p { color: var(--text-secondary); margin: 4px 0; }

       .back-link {
          background: none;
          border: none;
          color: #d8cdbe;
          cursor: pointer;
          margin-bottom: 20px;
          padding: 0;
          font-weight: 600;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        .places-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .travel-place {
          font-size: 0.9rem;
          font-weight: 500;
          color: #e8dfd0;
        }

        .travel-place.has-image {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .travel-place-image {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 0;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .travel-place-name {
          display: block;
        }

        .close-btn {
          position: absolute;
          top: 30px;
          left: 30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: white;
          border: none;
          z-index: 1100;
          cursor: pointer;
        }

        .fullscreen-container {
          width: 100vw;
          height: 100vh;
          position: relative;
        }
      `}</style>
    </>
  );
}
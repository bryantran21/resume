"use client";

import { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { motion, AnimatePresence } from "framer-motion";

// 1. UPDATED DATA: Your actual travel list
const MY_TRAVEL_DATA = {
  "Texas": 
  { title: "Lone Star State", 
    links: [{ label: "Austin BBQ Guide", url: "#" }] },
  "New York": { title: "The Empire State", 
    links: [{ label: "NYC Skyline", url: "#" }] },
  "Illinois": { title: "The Prairie State", 
    links: [{ label: "Chicago Deep Dish", url: "#" }] },
  "Alabama": { title: "Yellowhammer State", 
    links: [{ label: "Gulf Shores", url: "#" }] },
  "Louisiana": { title: "Pelican State", 
    links: [{ label: "NOLA Jazz", url: "#" }] },
  "Florida": { title: "Sunshine State", 
    links: [{ label: "Miami Beach", url: "#" }] }
};

const VISITED_STATES = Object.keys(MY_TRAVEL_DATA);

export default function TravelCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [geoData, setGeoData] = useState({ features: [] });
  const globeRef = useRef<any>();

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
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            showAtmosphere={true}
            atmosphereColor="#3a7bd5"
            atmosphereDaylightAlpha={0.3}
          />
        </div>
      </motion.div>

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
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                  
                  // POLYGON FIXES
                  polygonsData={geoData.features}
                  polygonCapColor={d => 
                    VISITED_STATES.includes(d.properties.name) // Using lowercase .name
                      ? 'rgba(58, 123, 213, 0.8)' 
                      : 'rgba(255, 255, 255, 0.08)'
                  }
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
                    <p className="subtitle">{MY_TRAVEL_DATA[selectedLocation]?.title}</p>
                    <div className="links-list">
                      {MY_TRAVEL_DATA[selectedLocation]?.links.map((link, i) => (
                        <a key={i} href={link.url} className="travel-link">{link.label}</a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bento-card {
          width: 350px;
          height: 220px;
          background: #0a0a0a;
          border-radius: 28px;
          padding: 24px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .expanded-view {
          position: fixed;
          inset: 0;
          z-index: 1000;
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
          background: rgba(15, 15, 15, 0.9);
          backdrop-filter: blur(20px);
          padding: 80px 40px;
          z-index: 1020;
          color: white;
          border-left: 1px solid rgba(255,255,255,0.1);
        }

        .text-content h3 { color: white; margin: 0; font-size: 1.4rem; }
        .text-content p { color: rgba(255,255,255,0.6); margin: 4px 0; }

        .back-link {
          background: none;
          border: none;
          color: #3a7bd5;
          cursor: pointer;
          margin-bottom: 20px;
          padding: 0;
        }

        .travel-link {
          display: block;
          color: #3a7bd5;
          margin-top: 12px;
          text-decoration: none;
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
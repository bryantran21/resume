'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LineWaves({ color = '#9F55FF' }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const numLines = 50;
    const pointsPerLine = 100;
    const lines: THREE.Line[] = [];

    const material = new THREE.LineBasicMaterial({ 
      color: color, 
      transparent: true, 
      opacity: 0.2 
    });

    for (let i = 0; i < numLines; i++) {
      const points = [];
      for (let j = 0; j < pointsPerLine; j++) {
        points.push(new THREE.Vector3(j - pointsPerLine / 2, 0, i - numLines / 2));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
    }

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      lines.forEach((line, i) => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        for (let j = 0; j < pointsPerLine; j++) {
          const x = j - pointsPerLine / 2;
          const z = i - numLines / 2;
          positions[j * 3 + 1] = Math.sin(x * 0.2 + time) * Math.cos(z * 0.2 + time) * 2;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleScroll = () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    // Tilt the camera based on scroll
    camera.position.y = 15 - (scrollPercent * 10); 
    camera.lookAt(0, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll); // Add this
      cancelAnimationFrame(frame);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [color]);

// src/components/LineWaves.tsx
return (
  <div 
    ref={containerRef} 
    style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -10, // Sits behind everything
      pointerEvents: 'none',
      background: 'black'
    }} 
  />
);
}
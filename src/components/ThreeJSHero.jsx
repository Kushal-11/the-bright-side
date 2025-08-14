import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeJSHero = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const spheresRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cameraRef = useRef(null);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Check WebGL support
    if (!window.WebGLRenderingContext) {
      console.warn('WebGL not supported, skipping Three.js scene');
      return;
    }

    const width = mountRef.current?.clientWidth || 800;
    const height = mountRef.current?.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create glassy spheres
    const spheres = [];
    const sphereCount = 8;

    for (let i = 0; i < sphereCount; i++) {
      const geometry = new THREE.SphereGeometry(
        0.2 + Math.random() * 0.4, // Varying sizes
        32,
        32
      );

      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.7 + Math.random() * 0.3, 0.3, 0.8),
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.8,
        thickness: 0.5,
      });

      const sphere = new THREE.Mesh(geometry, material);
      
      // Random positioning
      sphere.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );

      // Store initial position and animation properties
      sphere.userData = {
        initialX: sphere.position.x,
        initialY: sphere.position.y,
        initialZ: sphere.position.z,
        offsetX: Math.random() * Math.PI * 2,
        offsetY: Math.random() * Math.PI * 2,
        offsetZ: Math.random() * Math.PI * 2,
        speedX: 0.01 + Math.random() * 0.02,
        speedY: 0.01 + Math.random() * 0.02,
        speedZ: 0.005 + Math.random() * 0.01,
      };

      scene.add(sphere);
      spheres.push(sphere);
    }

    spheresRef.current = spheres;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse movement handler
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Touch movement handler for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    // Tab visibility handler
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    // Add event listeners
    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
      mountRef.current.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (!isTabVisible) return; // Pause when tab is not visible

      const time = Date.now() * 0.001;

      // Animate spheres with Perlin noise-like movement
      spheres.forEach((sphere) => {
        const { userData } = sphere;
        
        sphere.position.x = userData.initialX + 
          Math.sin(time * userData.speedX + userData.offsetX) * 0.5;
        sphere.position.y = userData.initialY + 
          Math.cos(time * userData.speedY + userData.offsetY) * 0.3;
        sphere.position.z = userData.initialZ + 
          Math.sin(time * userData.speedZ + userData.offsetZ) * 0.2;

        // Gentle rotation
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.003;
      });

      // Camera movement based on mouse position
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('touchmove', handleTouchMove);
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js objects
      spheres.forEach((sphere) => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      
      renderer.dispose();
    };
  }, [isTabVisible]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeJSHero;

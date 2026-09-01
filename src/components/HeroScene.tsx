import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  onHoverCapability?: (cap: string | null) => void;
  activeCapability?: string | null;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ activeCapability }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting setup for luxury metallic surfaces
    const ambientLight = new THREE.AmbientLight(0x2a2824, 1.2);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xffecc2, 3.5);
    goldKeyLight.position.set(5, 6, 4);
    scene.add(goldKeyLight);

    const goldRimLight = new THREE.PointLight(0xd4af37, 4, 15);
    goldRimLight.position.set(-4, -2, 3);
    scene.add(goldRimLight);

    const metallicFillLight = new THREE.DirectionalLight(0x6b7c96, 1.2);
    metallicFillLight.position.set(-6, 3, -2);
    scene.add(metallicFillLight);

    // Master 3D Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Sculptural Branify Emblem Object
    // 1. Central Metallic Gyroid / Polyhedral Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x181920,
      metalness: 0.95,
      roughness: 0.18,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 2. Polished Champagne Gold Inner Lattice
    const latticeGeometry = new THREE.IcosahedronGeometry(1.35, 1);
    const latticeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c378,
      metalness: 0.98,
      roughness: 0.1,
      wireframe: true,
    });
    const latticeMesh = new THREE.Mesh(latticeGeometry, latticeMaterial);
    masterGroup.add(latticeMesh);

    // 3. Floating Orbital Torus 1 (Polished Champagne Gold)
    const torus1Geometry = new THREE.TorusGeometry(2.1, 0.045, 32, 100);
    const torus1Material = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.12,
    });
    const torus1 = new THREE.Mesh(torus1Geometry, torus1Material);
    torus1.rotation.x = Math.PI / 3;
    torus1.rotation.y = Math.PI / 6;
    masterGroup.add(torus1);

    // 4. Floating Orbital Torus 2 (Brushed Dark Titanium with Gold Nodes)
    const torus2Geometry = new THREE.TorusGeometry(2.5, 0.03, 32, 120);
    const torus2Material = new THREE.MeshStandardMaterial({
      color: 0x22242c,
      metalness: 0.9,
      roughness: 0.25,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.y = Math.PI / 3;
    masterGroup.add(torus2);

    // 5. Outer Architectural Orbital Ring with tick marks
    const torus3Geometry = new THREE.TorusGeometry(2.9, 0.015, 16, 120);
    const torus3Material = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.85,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const torus3 = new THREE.Mesh(torus3Geometry, torus3Material);
    torus3.rotation.z = Math.PI / 5;
    masterGroup.add(torus3);

    // 6. Floating Capability Nodes (Small Golden Satellites)
    const satelliteGroup = new THREE.Group();
    masterGroup.add(satelliteGroup);

    const satellitePositions = [
      { x: 2.8, y: 1.2, z: 0.5 },
      { x: -2.7, y: 1.6, z: -0.8 },
      { x: 2.2, y: -2.0, z: 1.0 },
      { x: -2.3, y: -1.7, z: -0.5 },
      { x: 0.4, y: 3.1, z: 0.2 },
      { x: -0.8, y: -2.9, z: 0.8 },
      { x: 3.2, y: -0.2, z: -1.2 },
    ];

    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.12);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffe89e,
      metalness: 0.99,
      roughness: 0.05,
      emissive: 0x4a3a14,
      emissiveIntensity: 0.6,
    });

    satellitePositions.forEach((pos) => {
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(pos.x, pos.y, pos.z);
      satelliteGroup.add(sat);
      satellites.push(sat);
    });

    // 7. Ambient Particle Field (Floating Luxury Dust & Light Beams)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleScales[i] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    // Particle Shader / Material
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Tracking for Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    setIsLoaded(true);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (cinematic low-drag)
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Parallax camera displacement
      camera.position.x = currentMouseX * 0.8;
      camera.position.y = currentMouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // Slow, majestic rotation of the sculpture
      masterGroup.rotation.y = elapsedTime * 0.12 + currentMouseX * 0.2;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + currentMouseY * 0.15;

      // Secondary orbital ring counter-rotations
      torus1.rotation.z = elapsedTime * 0.07;
      torus2.rotation.x = -elapsedTime * 0.09;
      torus3.rotation.y = elapsedTime * 0.05;

      // Core pulsing
      const coreScale = 1 + Math.sin(elapsedTime * 0.8) * 0.02;
      coreMesh.scale.set(coreScale, coreScale, coreScale);
      latticeMesh.rotation.y = -elapsedTime * 0.15;

      // Satellite gentle rotation
      satelliteGroup.rotation.y = elapsedTime * 0.08;
      satellites.forEach((sat, i) => {
        sat.rotation.x = elapsedTime * 0.5 + i;
        sat.rotation.y = elapsedTime * 0.4 + i;
      });

      // Subtle particle drift
      particleSystem.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      latticeGeometry.dispose();
      latticeMaterial.dispose();
      torus1Geometry.dispose();
      torus1Material.dispose();
      torus2Geometry.dispose();
      torus2Material.dispose();
      torus3Geometry.dispose();
      torus3Material.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    // Elegant fallback if WebGL is unsupported
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full border border-[#D4AF37]/30 bg-gradient-to-br from-[#1A1B22]/80 via-[#101116]/90 to-[#08090B] shadow-[0_0_80px_-10px_rgba(212,175,55,0.25)] flex items-center justify-center animate-pulse">
          <div className="w-3/4 h-3/4 rounded-full border border-[#E5C378]/20 flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full border border-[#D4AF37]/40 bg-radial from-[#D4AF37]/20 to-transparent flex items-center justify-center">
              <span className="font-display text-2xl font-bold tracking-widest text-[#FFF5DC]">BRANIFY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );
};

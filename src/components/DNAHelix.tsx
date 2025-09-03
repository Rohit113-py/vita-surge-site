import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

export const DNAHelix = () => {
  const helixRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y += 0.01;
      helixRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.005;
    }
  });

  // Create helix geometry
  const helixGeometry = () => {
    const curve = new THREE.CatmullRomCurve3([]);
    const points: THREE.Vector3[] = [];
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = Math.cos(t * Math.PI * 4) * 2;
      const y = (t - 0.5) * 8;
      const z = Math.sin(t * Math.PI * 4) * 2;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    curve.points = points;
    return new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
  };

  // Create complementary helix
  const helixGeometry2 = () => {
    const curve = new THREE.CatmullRomCurve3([]);
    const points: THREE.Vector3[] = [];
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = Math.cos(t * Math.PI * 4 + Math.PI) * 2;
      const y = (t - 0.5) * 8;
      const z = Math.sin(t * Math.PI * 4 + Math.PI) * 2;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    curve.points = points;
    return new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
  };

  // Create connecting bonds
  const createBonds = () => {
    const bonds = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x1 = Math.cos(t * Math.PI * 4) * 2;
      const z1 = Math.sin(t * Math.PI * 4) * 2;
      const x2 = Math.cos(t * Math.PI * 4 + Math.PI) * 2;
      const z2 = Math.sin(t * Math.PI * 4 + Math.PI) * 2;
      const y = (t - 0.5) * 8;
      
      bonds.push(
        <mesh key={i} position={[(x1 + x2) / 2, y, (z1 + z2) / 2]}>
          <cylinderGeometry args={[0.05, 0.05, Math.sqrt((x2-x1)**2 + (z2-z1)**2)]} />
          <meshStandardMaterial 
            color="#00D4AA" 
            emissive="#00D4AA" 
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      );
    }
    return bonds;
  };

  return (
    <group ref={helixRef}>
      {/* Main DNA strands */}
      <mesh>
        <primitive object={helixGeometry()} />
        <meshStandardMaterial 
          color="#4A90E2" 
          emissive="#4A90E2" 
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      <mesh>
        <primitive object={helixGeometry2()} />
        <meshStandardMaterial 
          color="#0066CC" 
          emissive="#0066CC" 
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Connecting bonds */}
      {createBonds()}

      {/* Floating particles around DNA */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 12
            ]}
          >
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial 
              color="#00D4AA"
              emissive="#00D4AA"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
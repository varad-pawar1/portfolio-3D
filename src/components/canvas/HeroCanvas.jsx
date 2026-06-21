import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Torus } from '@react-three/drei';

function AnimatedSphere() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <Sphere args={[1, 100, 200]}>
          <MeshDistortMaterial
            color="#7c3aed"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function Ring() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <mesh ref={ref}>
      <Torus args={[1.6, 0.04, 16, 100]}>
        <meshStandardMaterial color="#a78bfa" wireframe />
      </Torus>
    </mesh>
  );
}

function Ring2() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={ref}>
      <Torus args={[2.1, 0.03, 16, 100]}>
        <meshStandardMaterial color="#38bdf8" wireframe />
      </Torus>
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <pointLight position={[-3, -3, -3]} color="#7c3aed" intensity={2} />
        <pointLight position={[3, 3, 3]} color="#38bdf8" intensity={1} />
        <AnimatedSphere />
        <Ring />
        <Ring2 />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}

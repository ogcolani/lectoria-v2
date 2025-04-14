
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';

// Définition des couleurs pour différentes parties du personnage
const COLORS = {
  skin: {
    boy: new THREE.Color('#f8d5c2'),
    girl: new THREE.Color('#ffdbcc')
  },
  hair: {
    boy: new THREE.Color('#5c3a21'),
    girl: new THREE.Color('#ff6b43')
  },
  shirt: {
    boy: new THREE.Color('#4287f5'),
    girl: new THREE.Color('#f5e642')
  },
  glasses: new THREE.Color('#ffffff')
};

interface CharacterModelProps {
  gender: 'garçon' | 'fille';
  rotating?: boolean;
  hasGlasses?: boolean;
}

// Composant du modèle 3D du personnage
function CharacterModel({ gender, rotating = true, hasGlasses = false }: CharacterModelProps) {
  const ref = useRef<THREE.Group>(null);
  const [headColor] = useState(gender === 'fille' ? COLORS.skin.girl : COLORS.skin.boy);
  const [hairColor] = useState(gender === 'fille' ? COLORS.hair.girl : COLORS.hair.boy);
  const [shirtColor] = useState(gender === 'fille' ? COLORS.shirt.girl : COLORS.shirt.boy);

  // Animation de rotation
  useFrame((_, delta) => {
    if (rotating && ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={ref} position={[0, -1, 0]}>
      {/* Tête */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={headColor} />
      </mesh>

      {/* Cheveux */}
      {gender === 'garçon' ? (
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[0.55, 0.15, 0.55]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
      ) : (
        <>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.52, 0.6, 0.8, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </>
      )}

      {/* Lunettes (optionnel) */}
      {hasGlasses && (
        <group position={[0, 0.8, 0.3]}>
          <mesh position={[-0.2, 0, 0]}>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <torusGeometry args={[0.15, 0.03, 16, 32]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.03, 0.03]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
        </group>
      )}

      {/* Corps */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 32]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Bras */}
      <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Mains */}
      <mesh position={[-0.6, -0.15, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={headColor} />
      </mesh>
      <mesh position={[0.6, -0.15, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={headColor} />
      </mesh>
    </group>
  );
}

interface Character3DProps {
  gender?: 'garçon' | 'fille';
  hasGlasses?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

const Character3D: React.FC<Character3DProps> = ({
  gender = 'garçon',
  hasGlasses = false,
  height = '300px',
  width = '100%',
  className = '',
}) => {
  return (
    <div style={{ height, width }} className={`rounded-2xl overflow-hidden ${className}`}>
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 30 }}>
        <color attach="background" args={['#f8f9fa']} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />
        <Stage environment="city" intensity={0.5}>
          <CharacterModel gender={gender} hasGlasses={hasGlasses} />
        </Stage>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Character3D;

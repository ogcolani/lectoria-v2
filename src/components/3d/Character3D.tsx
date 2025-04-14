
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

// Définition des couleurs dans un style plus illustré, inspiré de l'image de référence
const COLORS = {
  skin: {
    boy: new THREE.Color('#f8c9a3'),  // Teinte plus chaude pour le visage
    girl: new THREE.Color('#ffd2be')   // Teinte légèrement rosée pour les filles
  },
  hair: {
    boy: new THREE.Color('#8b4513'),   // Brun doré comme sur l'image
    girl: new THREE.Color('#db7f4e')   // Roux-auburn comme option pour les filles
  },
  shirt: {
    boy: new THREE.Color('#4682b4'),   // Bleu comme sur l'image
    girl: new THREE.Color('#f0a566')   // Orange clair
  },
  hoodie: {
    boy: new THREE.Color('#e6a130'),   // Jaune-orange comme sur l'image
    girl: new THREE.Color('#d870a3')   // Rose-mauve pour les filles
  },
  face: new THREE.Color('#ffffff'),    // Blanc pour les yeux
  glasses: new THREE.Color('#787878')  // Gris foncé pour les lunettes
};

interface CharacterModelProps {
  gender: 'garçon' | 'fille';
  rotating?: boolean;
  hasGlasses?: boolean;
}

// Composant du modèle 3D du personnage dans un style illustré
function CharacterModel({ gender, rotating = true, hasGlasses = false }: CharacterModelProps) {
  const ref = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  
  const [skinColor] = useState(gender === 'fille' ? COLORS.skin.girl : COLORS.skin.boy);
  const [hairColor] = useState(gender === 'fille' ? COLORS.hair.girl : COLORS.hair.boy);
  const [shirtColor] = useState(gender === 'fille' ? COLORS.shirt.girl : COLORS.shirt.boy);
  const [hoodieColor] = useState(gender === 'fille' ? COLORS.hoodie.girl : COLORS.hoodie.boy);

  // Animation subtile pour donner vie au personnage
  useFrame((_, delta) => {
    if (rotating && ref.current) {
      ref.current.rotation.y += delta * 0.3; // Rotation plus lente et naturelle
    }
    
    // Animation subtile de la tête
    if (headRef.current) {
      headRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.03 + 0.8;
    }
  });

  return (
    <group ref={ref} position={[0, -1.1, 0]}>
      {/* Tête avec forme plus illustrative */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Visage expressif */}
      <group position={[0, 0.8, 0.3]}>
        {/* Yeux */}
        <mesh ref={eyeLeftRef} position={[-0.15, 0.05, 0.17]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={COLORS.face} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.15, 0.05, 0.17]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={COLORS.face} />
        </mesh>
        
        {/* Pupilles */}
        <mesh position={[-0.15, 0.05, 0.25]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.25]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        
        {/* Sourcils expressifs */}
        <mesh position={[-0.15, 0.18, 0.2]} rotation={[0, 0, Math.PI * 0.1]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[0.15, 0.18, 0.2]} rotation={[0, 0, -Math.PI * 0.1]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        
        {/* Sourire */}
        <mesh position={[0, -0.15, 0.2]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 16, 16, Math.PI]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
      </group>

      {/* Cheveux stylisés comme sur l'image */}
      {gender === 'garçon' ? (
        <>
          {/* Cheveux ébouriffés pour garçon, inspirés de l'image */}
          <mesh position={[0, 1.05, 0]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.48, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 1.05, -0.2]} rotation={[0.4, 0, 0]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[-0.25, 0.95, 0]} rotation={[0, 0, 0.4]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0.25, 0.95, 0]} rotation={[0, 0, -0.4]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </>
      ) : (
        <>
          {/* Cheveux plus longs pour fille */}
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.52, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 0.6, -0.1]}>
            <cylinderGeometry args={[0.5, 0.4, 0.6, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[-0.35, 0.75, 0]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0.35, 0.75, 0]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </>
      )}

      {/* Lunettes (optionnel) */}
      {hasGlasses && (
        <group position={[0, 0.8, 0.3]}>
          <mesh position={[-0.15, 0.05, 0.09]}>
            <torusGeometry args={[0.13, 0.02, 16, 32]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
          <mesh position={[0.15, 0.05, 0.09]}>
            <torusGeometry args={[0.13, 0.02, 16, 32]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
          <mesh position={[0, 0.05, 0.09]}>
            <boxGeometry args={[0.1, 0.02, 0.01]} />
            <meshStandardMaterial color={COLORS.glasses} />
          </mesh>
        </group>
      )}

      {/* Hoodie comme sur l'image */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.9, 32]} />
        <meshStandardMaterial color={hoodieColor} />
      </mesh>
      
      {/* T-shirt sous le hoodie */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.3, 0.35, 0.6, 32]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Col du hoodie */}
      <mesh position={[0, 0.5, 0.25]} rotation={[Math.PI * 0.3, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32, 1, true]} />
        <meshStandardMaterial color={hoodieColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Bras */}
      <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, -Math.PI * 0.15]}>
        <cylinderGeometry args={[0.08, 0.09, 0.6, 16]} />
        <meshStandardMaterial color={hoodieColor} />
      </mesh>
      <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, Math.PI * 0.15]}>
        <cylinderGeometry args={[0.08, 0.09, 0.6, 16]} />
        <meshStandardMaterial color={hoodieColor} />
      </mesh>

      {/* Mains */}
      <mesh position={[-0.6, -0.15, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      <mesh position={[0.6, -0.15, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Sac à dos (comme sur l'image) */}
      <mesh position={[0, 0, -0.4]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Sangles du sac */}
      <mesh position={[-0.3, 0.3, -0.05]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.05]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
      <mesh position={[0.3, 0.3, -0.05]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.05]} />
        <meshStandardMaterial color="#5C4033" />
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
        <color attach="background" args={['#ffb37c']} /> {/* Fond orangé comme dans l'image */}
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* Arrière-plan stylisé avec des nuages */}
        <group position={[0, 0, -10]}>
          <mesh position={[-3, 2, 0]}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#f8f8ff" />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#f8f8ff" />
          </mesh>
          <mesh position={[3, 2, 0]}>
            <sphereGeometry args={[1.8, 32, 32]} />
            <meshStandardMaterial color="#f8f8ff" />
          </mesh>
          
          {/* Lune stylisée */}
          <mesh position={[4, 4, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#FFF4C1" />
          </mesh>
        </group>
        
        <Stage environment="sunset" intensity={0.2}>
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

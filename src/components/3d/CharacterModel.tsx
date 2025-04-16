
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from './constants/colors';
import Face from './character-parts/Face';
import Hair from './character-parts/Hair';
import Body from './character-parts/Body';
import Glasses from './character-parts/Glasses';

interface CharacterModelProps {
  gender: 'garçon' | 'fille';
  rotating?: boolean;
  hasGlasses?: boolean;
}

const CharacterModel: React.FC<CharacterModelProps> = ({ 
  gender, 
  rotating = true, 
  hasGlasses = false 
}) => {
  const ref = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  const skinColor = gender === 'fille' ? COLORS.skin.girl : COLORS.skin.boy;
  const hairColor = gender === 'fille' ? COLORS.hair.girl : COLORS.hair.boy;

  useFrame((_, delta) => {
    if (rotating && ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
    
    if (headRef.current) {
      headRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.03 + 0.8;
    }
  });

  return (
    <group ref={ref} position={[0, -1.1, 0]}>
      {/* Tête */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      <Face gender={gender} hairColor={hairColor} />
      <Hair gender={gender} hairColor={hairColor} />
      {hasGlasses && <Glasses />}
      <Body gender={gender} skinColor={skinColor} />
    </group>
  );
};

export default CharacterModel;

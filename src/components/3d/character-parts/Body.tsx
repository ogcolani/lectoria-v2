
import React from 'react';
import { COLORS } from '../constants/colors';
import * as THREE from 'three';

interface BodyProps {
  gender: 'garçon' | 'fille';
  skinColor: THREE.Color;
}

const Body: React.FC<BodyProps> = ({ gender, skinColor }) => {
  const hoodieColor = gender === 'fille' ? COLORS.hoodie.girl : COLORS.hoodie.boy;
  const shirtColor = gender === 'fille' ? COLORS.shirt.girl : COLORS.shirt.boy;

  return (
    <>
      {/* Hoodie */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.9, 32]} />
        <meshStandardMaterial color={hoodieColor} />
      </mesh>
      
      {/* T-shirt */}
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
      
      {/* Sac à dos */}
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
    </>
  );
};

export default Body;

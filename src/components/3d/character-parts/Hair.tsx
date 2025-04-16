
import React from 'react';
import * as THREE from 'three';

interface HairProps {
  gender: 'garçon' | 'fille';
  hairColor: THREE.Color;
}

const Hair: React.FC<HairProps> = ({ gender, hairColor }) => {
  if (gender === 'garçon') {
    return (
      <>
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
    );
  }

  return (
    <>
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
  );
};

export default Hair;

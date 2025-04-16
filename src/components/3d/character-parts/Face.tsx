
import React, { useRef } from 'react';
import { COLORS } from '../constants/colors';
import * as THREE from 'three';

interface FaceProps {
  gender: 'garçon' | 'fille';
  hairColor: THREE.Color;
}

const Face: React.FC<FaceProps> = ({ gender, hairColor }) => {
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  return (
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
      
      {/* Sourcils */}
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
  );
};

export default Face;

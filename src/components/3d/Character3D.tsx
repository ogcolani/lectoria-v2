
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { COLORS } from './constants/colors';
import CharacterModel from './CharacterModel';

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
        <color attach="background" args={['#ffb37c']} />
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

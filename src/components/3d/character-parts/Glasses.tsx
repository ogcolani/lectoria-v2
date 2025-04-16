
import React from 'react';
import { COLORS } from '../constants/colors';

const Glasses: React.FC = () => {
  return (
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
  );
};

export default Glasses;

import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf');
  return (
    <group {...props} dispose={null} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.material_0} />
      </group>
    </group>
  );
}

useGLTF.preload('/scene.gltf');

import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import luvaImg from '../../assets/luva.jpg';

const Cubinho = ({ pos, cores, rot = { x: 0, y: 0, z: 0 }, modoLuva = false }) => {
    const textura = useLoader(THREE.TextureLoader, luvaImg);

    const corHex = (c) => {
        const map = { 'Y': '#f1c40f', 'W': '#ecf0f1', 'R': '#e74c3c', 'O': '#e67e22', 'G': '#2ecc71', 'B': '#3498db' };
        return map[c] || '#222';
    };

    const faces = ['right', 'left', 'up', 'down', 'front', 'back'];

    return (
        <mesh position={[pos.x, pos.y, pos.z]} rotation={[rot.x, rot.y, rot.z]} rotation-order="XYZ">
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            {faces.map((face, i) => {
                const cor = corHex(cores[face]);
                if (modoLuva && cores[face]) {
                    return <meshStandardMaterial attach={`material-${i}`} key={`${face}-luva`} map={textura} color={cor} />;
                }
                return <meshStandardMaterial attach={`material-${i}`} key={`${face}-solid`} color={cor} />;
            })}
        </mesh>
    );
};

export default Cubinho;
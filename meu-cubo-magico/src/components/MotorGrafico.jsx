import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Cubinho from './Cubinho';
import FaceContainer from './Face';
import ControleDeArraste from './ControleDeArraste';

const MotorGrafico = ({ pecas, animacao, onAnimacaoFim, onMovimento, modoLuva }) => {
  const estaAnimando = !!animacao;

  let pecasFace = [];
  let pecasResto = pecas;

  if (animacao) {
    pecasFace = pecas.filter(p => p.pos[animacao.eixo] === animacao.valorFixo);
    pecasResto = pecas.filter(p => p.pos[animacao.eixo] !== animacao.valorFixo);
  }

  return (
    <div style={{ width: '100%', height: '100vh', background: '#111' }}>
      <Canvas 
        camera={{ position: [6, 6, 6], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ControleDeArraste onMovimento={onMovimento} desabilitado={estaAnimando}>
          <group>
            {pecasResto.map((peca) => (
              <Cubinho 
                key={peca.id} 
                pos={peca.pos} 
                cores={peca.cores} 
                rot={peca.rot}
                modoLuva={modoLuva}
              />
            ))}

            {animacao && (
              <FaceContainer 
                rotacaoAlvo={animacao.rotacaoAlvo} 
                onAnimacaoFim={onAnimacaoFim}
              >
                {pecasFace.map((peca) => (
                  <Cubinho 
                    key={peca.id} 
                    pos={peca.pos} 
                    cores={peca.cores} 
                    rot={peca.rot}
                    modoLuva={modoLuva}
                  />
                ))}
              </FaceContainer>
            )}
          </group>
        </ControleDeArraste>

        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />

        <OrbitControls 
          mouseButtons={{ LEFT: null, MIDDLE: THREE.MOUSE.ROTATE, RIGHT: null }}
          enableDamping 
          dampingFactor={0.05} 
          minDistance={5} 
          maxDistance={15} 
        />
      </Canvas>
    </div>
  );
};

export default MotorGrafico;
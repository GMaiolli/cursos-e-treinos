import React, { useRef } from 'react';
import { useSpring, a } from '@react-spring/three';

const FaceContainer = ({ children, rotacaoAlvo, onAnimacaoFim }) => {
  const chamou = useRef(false);

  const { animRot } = useSpring({
    from: { animRot: [0, 0, 0] },
    to: { animRot: rotacaoAlvo },
    config: { tension: 170, friction: 20 },
    onRest: () => {
      if (!chamou.current) {
        chamou.current = true;
        onAnimacaoFim();
      }
    }
  });

  return (
    <a.group rotation={animRot}>
      {children}
    </a.group>
  );
};

export default FaceContainer;
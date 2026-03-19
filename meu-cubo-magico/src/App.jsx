import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Cubo from './classes/Cubo';
import MotorGrafico from './components/MotorGrafico';
import Interface from './components/Interface';
import luvaImg from '../assets/luva.jpg';
import recebaAudio from '../assets/receba.mp3';

function App() {
  const cuboInstancia = useMemo(() => new Cubo(), []);
  const [tick, setTick] = useState(0);
  const [animacao, setAnimacao] = useState(null);
  const movimentoPendente = useRef(null);
  const filaMovimentos = useRef([]);
  const foiEmbaralhadoRef = useRef(false);
  const [jumpscare, setJumpscare] = useState(false);
  const [modoLuva, setModoLuva] = useState(false);
  const audioRef = useRef(null);

  const iniciarAnimacao = useCallback((mov) => {
    const params = cuboInstancia.getParametrosMovimento(mov);
    if (!params) return;

    const { eixo, valorFixo, horario } = params;
    const realHorario = (valorFixo === 1) ? horario : !horario;
    const angulo = realHorario ? -Math.PI / 2 : Math.PI / 2;

    const rotacaoAlvo = [0, 0, 0];
    const eixoIdx = { x: 0, y: 1, z: 2 }[eixo];
    rotacaoAlvo[eixoIdx] = angulo;

    movimentoPendente.current = mov;
    setAnimacao({ eixo, valorFixo, rotacaoAlvo });
  }, [cuboInstancia]);

  const executarMovimento = useCallback((mov) => {
    if (animacao || filaMovimentos.current.length > 0 || jumpscare) return;
    if (!foiEmbaralhadoRef.current) foiEmbaralhadoRef.current = true;
    iniciarAnimacao(mov);
  }, [animacao, iniciarAnimacao, jumpscare]);

  const embaralhar = useCallback(() => {
    if (animacao || filaMovimentos.current.length > 0) return;
    foiEmbaralhadoRef.current = true;
    const sequencia = cuboInstancia.embaralhar(20);
    filaMovimentos.current = sequencia.slice(1);
    iniciarAnimacao(sequencia[0]);
  }, [animacao, cuboInstancia, iniciarAnimacao]);

  const verificarResolvido = useCallback(() => {
    if (!foiEmbaralhadoRef.current) return;
    if (cuboInstancia.isResolvido()) {
      foiEmbaralhadoRef.current = false;
      setJumpscare(true);

      const audio = new Audio(recebaAudio);
      audio.currentTime = 1;
      audioRef.current = audio;
      audio.play();
      audio.addEventListener('ended', () => {
        setModoLuva(true);
        setTick(t => t + 1);
        setTimeout(() => {
          setJumpscare(false);
          audioRef.current = null;
        }, 100);
      });
    }
  }, [cuboInstancia]);

  const onAnimacaoFim = useCallback(() => {
    if (movimentoPendente.current) {
      cuboInstancia.executar(movimentoPendente.current);
      movimentoPendente.current = null;
    }
    setAnimacao(null);
    setTick(t => t + 1);

    if (filaMovimentos.current.length > 0) {
      const proximo = filaMovimentos.current.shift();
      setTimeout(() => iniciarAnimacao(proximo), 0);
    } else {
      verificarResolvido();
    }
  }, [cuboInstancia, iniciarAnimacao, verificarResolvido]);

  const resetarCubo = () => {
    window.location.reload();
  };

  return (
    <div className="app-container">
      <div className="ui-layer">
        <h1>Rubik's Engine 3D</h1>
        <p>Gabriel Maiolli - Dev Trainee</p>
        <Interface onReset={resetarCubo} onEmbaralhar={embaralhar} />
      </div>

      <div className="canvas-layer">
        <MotorGrafico 
          pecas={cuboInstancia.pecas}
          animacao={animacao}
          onAnimacaoFim={onAnimacaoFim}
          onMovimento={executarMovimento}
          modoLuva={modoLuva}
        />
      </div>

      {jumpscare && (
        <div className="jumpscare-overlay">
          <img src={luvaImg} alt="RECEBA" />
        </div>
      )}
    </div>
  );
}

export default App;
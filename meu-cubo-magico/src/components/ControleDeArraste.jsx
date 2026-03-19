import React, { useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LIMIAR_ARRASTE = 0.03;

// Mapeia a normal da face clicada + direção do arraste → movimento do cubo
function determinarMovimento(faceNormal, direcaoArraste, posicaoPeca) {
    const fn = faceNormal;
    const da = direcaoArraste;

    // Qual componente do arraste é dominante?
    const abs = { x: Math.abs(da.x), y: Math.abs(da.y), z: Math.abs(da.z) };

    if (Math.abs(fn.x) > 0.9) {
        // Clicou na face right/left (normal ±X)
        if (abs.y > abs.z) {
            // Arrastou em Y → gira a camada Z da peça
            const valorFixo = Math.round(posicaoPeca.z);
            const horario = (fn.x > 0) ? (da.y < 0) : (da.y > 0);
            return { eixo: 'z', valorFixo, horario };
        } else {
            // Arrastou em Z → gira a camada Y da peça
            const valorFixo = Math.round(posicaoPeca.y);
            const horario = (fn.x > 0) ? (da.z > 0) : (da.z < 0);
            return { eixo: 'y', valorFixo, horario };
        }
    } else if (Math.abs(fn.y) > 0.9) {
        // Clicou na face up/down (normal ±Y)
        if (abs.x > abs.z) {
            // Arrastou em X → gira a camada Z da peça
            const valorFixo = Math.round(posicaoPeca.z);
            const horario = (fn.y > 0) ? (da.x > 0) : (da.x < 0);
            return { eixo: 'z', valorFixo, horario };
        } else {
            // Arrastou em Z → gira a camada X da peça
            const valorFixo = Math.round(posicaoPeca.x);
            const horario = (fn.y > 0) ? (da.z < 0) : (da.z > 0);
            return { eixo: 'x', valorFixo, horario };
        }
    } else if (Math.abs(fn.z) > 0.9) {
        // Clicou na face front/back (normal ±Z)
        if (abs.x > abs.y) {
            // Arrastou em X → gira a camada Y da peça
            const valorFixo = Math.round(posicaoPeca.y);
            const horario = (fn.z > 0) ? (da.x < 0) : (da.x > 0);
            return { eixo: 'y', valorFixo, horario };
        } else {
            // Arrastou em Y → gira a camada X da peça
            const valorFixo = Math.round(posicaoPeca.x);
            const horario = (fn.z > 0) ? (da.y > 0) : (da.y < 0);
            return { eixo: 'x', valorFixo, horario };
        }
    }

    return null;
}

// Converte {eixo, valorFixo, horario} → letra de movimento (R, r, L, l, etc.)
function paraLetraMovimento({ eixo, valorFixo, horario }) {
    const realHorario = (valorFixo === 1) ? horario : !horario;
    const mapa = {
        'x_1':  realHorario ? 'R' : 'r',
        'x_0':  realHorario ? 'M' : 'm',
        'x_-1': realHorario ? 'L' : 'l',
        'y_1':  realHorario ? 'U' : 'u',
        'y_0':  realHorario ? 'E' : 'e',
        'y_-1': realHorario ? 'D' : 'd',
        'z_1':  realHorario ? 'F' : 'f',
        'z_0':  realHorario ? 'S' : 's',
        'z_-1': realHorario ? 'B' : 'b',
    };
    return mapa[`${eixo}_${valorFixo}`];
}

const ControleDeArraste = ({ children, onMovimento, desabilitado }) => {
    const { camera, raycaster, gl } = useThree();
    const arrastando = useRef(false);
    const pontoInicial3D = useRef(null);
    const faceNormalRef = useRef(null);
    const posicaoPecaRef = useRef(null);
    const planoRef = useRef(null);

    const onPointerDown = useCallback((e) => {
        if (e.button !== 0 || desabilitado) return;
        if (!e.face) return;

        e.stopPropagation();
        arrastando.current = true;

        // Guardar o ponto 3D, a normal da face clicada, e a posição da peça
        pontoInicial3D.current = e.point.clone();
        faceNormalRef.current = e.face.normal.clone().transformDirection(e.object.matrixWorld).normalize();
        posicaoPecaRef.current = e.object.position.clone();

        // Criar um plano no ponto clicado para projetar o arraste
        planoRef.current = new THREE.Plane().setFromNormalAndCoplanarPoint(
            faceNormalRef.current, 
            e.point
        );

        gl.domElement.setPointerCapture(e.pointerId);
    }, [desabilitado, gl]);

    const onPointerMove = useCallback((e) => {
        if (!arrastando.current || !pontoInicial3D.current) return;

        // Projetar o mouse atual no plano 3D
        const ndc = new THREE.Vector2(
            (e.clientX / gl.domElement.clientWidth) * 2 - 1,
            -(e.clientY / gl.domElement.clientHeight) * 2 + 1
        );
        raycaster.setFromCamera(ndc, camera);
        const pontoAtual = new THREE.Vector3();
        if (!raycaster.ray.intersectPlane(planoRef.current, pontoAtual)) return;

        const delta = pontoAtual.clone().sub(pontoInicial3D.current);

        if (delta.length() > LIMIAR_ARRASTE) {
            arrastando.current = false;

            const resultado = determinarMovimento(
                faceNormalRef.current,
                delta.normalize(),
                posicaoPecaRef.current
            );

            if (resultado) {
                const letra = paraLetraMovimento(resultado);
                if (letra) onMovimento(letra);
            }

            pontoInicial3D.current = null;
        }
    }, [camera, raycaster, gl, onMovimento]);

    const onPointerUp = useCallback((e) => {
        arrastando.current = false;
        pontoInicial3D.current = null;
        gl.domElement.releasePointerCapture(e.pointerId);
    }, [gl]);

    return (
        <group 
            onPointerDown={onPointerDown} 
            onPointerMove={onPointerMove} 
            onPointerUp={onPointerUp}
        >
            {children}
        </group>
    );
};

export default ControleDeArraste;

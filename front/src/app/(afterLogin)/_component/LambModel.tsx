"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Fit camera ONCE when target is ready.
 * Prevents "target changes" (cloned vs pivotRef.current) causing drift.
 */
function FitCameraOnce({ target }: { target: THREE.Object3D | null }) {
    const { camera } = useThree();
    const didFitRef = useRef(false);

    useEffect(() => {
        if (!target) return;
        if (didFitRef.current) return;

        const box = new THREE.Box3().setFromObject(target);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        if (camera instanceof THREE.PerspectiveCamera) {
            const fov = THREE.MathUtils.degToRad(camera.fov);
            let dist = maxDim / (2 * Math.tan(fov / 2));

            // ✅ 화면에 더 크게 보이게: 값 작을수록 더 꽉 참
            dist *= 1.8;

            camera.position.set(0, maxDim * 0.12, dist);

            // ✅ 클리핑 방지
            camera.near = Math.max(0.01, dist / 1000);
            camera.far = dist * 1000;

            camera.updateProjectionMatrix();
            camera.lookAt(0, -50, 0);

            didFitRef.current = true;
        }
    }, [target, camera]);

    return null;
}

function Lamb({ hovered }: { hovered: boolean }) {
    const { scene } = useGLTF("/lamb_colored.glb");
    const cloned = useMemo(() => scene.clone(true), [scene]);

    const pivotRef = useRef<THREE.Group>(null);
    const yawRef = useRef<THREE.Group>(null);

    // pivotRef.current가 생겼을 때 FitCameraOnce에 전달하기 위한 상태
    const [pivotObj, setPivotObj] = useState<THREE.Object3D | null>(null);

    // ✅ pivotRef가 실제로 연결된 뒤에 state에 넣음
    useEffect(() => {
        if (pivotRef.current) setPivotObj(pivotRef.current);
    }, []);

    // ✅ "중앙이 안 맞는" 문제 해결: 회전 적용 → 그 상태로 다시 center 계산 → position 보정
    useEffect(() => {
        // 1) 먼저 원하는 자세/기울기 적용
        //    - X: 세우기
        //    - Y: (여기선 0) 방향은 yawRef가 담당
        //    - Z: 살짝 기울이기
        cloned.rotation.set(-Math.PI / 2, 0, -Math.PI / 8);

        // 2) 회전이 적용된 상태에서 박스 계산
        const box = new THREE.Box3().setFromObject(cloned);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // 3) 중앙 정렬
        cloned.position.sub(center);

        // 4) min 없이(네 요청) Y 보정: 필요에 따라 값 조절
        //    -size.y/2 는 "아래로 내림" 느낌이라 네가 쓰던 감성 유지
        cloned.position.y += -size.y / 2;

        // 5) 정면 방향(Yaw) 고정: 기본은 정면으로 돌려놓기
        if (yawRef.current) {
            yawRef.current.rotation.y = Math.PI; // 뒤통수 방지
            // ✅ 30도 오른쪽을 원하면 아래처럼:
            // yawRef.current.rotation.y = Math.PI + (Math.PI / 6);
        }
    }, [cloned]);

    // ✅ 아주 천천히 회전 (원하면 speed를 0으로)
    useFrame((_, delta) => {
        if (!pivotRef.current) return;
        const speed = 0.08; // 0.05~0.12 추천 (아주 천천히)
        pivotRef.current.rotation.y += delta * speed;
    });

    return (
        <group ref={pivotRef}>
            <FitCameraOnce target={pivotObj} />

            <group ref={yawRef}>
                <primitive object={cloned} />
            </group>
        </group>
    );
}

export default function LambModel({ hovered }: { hovered: boolean }) {
    return (
        <Canvas
            camera={{ position: [0, 0.8, 3.5], fov: 38 }}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
            gl={{
                alpha: true,
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.4,
            }}
        >
            <Environment preset="city" />
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 6, 4]} intensity={2.2} />
            <directionalLight position={[-3, 2, -2]} intensity={1.0} />

            <Suspense fallback={null}>
                <Lamb hovered={hovered} />
            </Suspense>
        </Canvas>
    );
}

useGLTF.preload("/lamb_colored.glb");

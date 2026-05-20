'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

function YinYangShaderMaterial({ state, mouse }: { state: OrbState; mouse: { x: number; y: number } }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uStateMix: { value: 0 },
      uColorA: { value: new THREE.Color('#ffffff') },
      uColorB: { value: new THREE.Color('#0a0a0f') },
      uAccent: { value: new THREE.Color('#a78bfa') },
      uAccent2: { value: new THREE.Color('#22d3ee') },
    }),
    []
  );

  useFrame((_, dt) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uTime.value += dt;
    u.uMouse.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.06);

    let target = 0;
    if (state === 'listening') target = 0.35;
    else if (state === 'thinking') target = 0.65;
    else if (state === 'speaking') target = 1;
    u.uStateMix.value += (target - u.uStateMix.value) * 0.06;
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uStateMix;

        // Simple 3D noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          float n = snoise(position * 1.4 + uTime * 0.25);
          float displacement = n * (0.08 + uStateMix * 0.12);
          vec3 displaced = position + normal * displacement;
          vPosition = displaced;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `}
      fragmentShader={`
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uStateMix;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uAccent;
        uniform vec3 uAccent2;

        void main() {
          // Spherical coordinates from position
          vec3 nPos = normalize(vPosition);

          // Rotate the yin-yang dividing plane over time
          float angle = uTime * 0.35;
          float ca = cos(angle);
          float sa = sin(angle);
          vec3 rotated = vec3(
            ca * nPos.x - sa * nPos.z,
            nPos.y,
            sa * nPos.x + ca * nPos.z
          );

          // S-curve divider: black/white halves
          float s = sin(rotated.y * 3.14159 * 0.5);
          float divider = smoothstep(-0.05, 0.05, rotated.x - 0.5 * s);

          vec3 baseColor = mix(uColorB, uColorA, divider);

          // Inner "dots" — counter-color spots near top/bottom
          float topDot = smoothstep(0.12, 0.08, distance(rotated, vec3(0.5 * 0.5, 0.5, 0.0)));
          float botDot = smoothstep(0.12, 0.08, distance(rotated, vec3(-0.5 * 0.5, -0.5, 0.0)));
          baseColor = mix(baseColor, uColorA, topDot);
          baseColor = mix(baseColor, uColorB, botDot);

          // Fresnel rim light
          float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);

          // Accent color shifts with state
          vec3 accent = mix(uAccent, uAccent2, 0.5 + 0.5 * sin(uTime * 0.8));
          vec3 rim = accent * fresnel * (0.8 + uStateMix * 1.4);

          // Pulse intensifies with state
          float pulse = 0.5 + 0.5 * sin(uTime * 2.5);
          vec3 finalColor = baseColor + rim + accent * 0.05 * pulse * uStateMix;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `}
    />
  );
}

function OrbMesh({ state, mouse }: { state: OrbState; mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.15;
    // gentle tilt toward mouse
    const targetX = mouse.y * 0.4;
    const targetZ = mouse.x * 0.4;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.4, 64]} />
          <YinYangShaderMaterial state={state} mouse={mouse} />
        </mesh>
      </Float>

      {/* Outer translucent halo */}
      <mesh scale={1.7}>
        <icosahedronGeometry args={[1.4, 16]} />
        <MeshDistortMaterial
          color="#a78bfa"
          transparent
          opacity={0.06}
          distort={0.3}
          speed={1.5}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export default function YinYangOrb({
  state = 'idle',
  size = 'lg',
}: {
  state?: OrbState;
  size?: 'sm' | 'md' | 'lg';
}) {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const sizeClass =
    size === 'sm' ? 'h-40 w-40' : size === 'md' ? 'h-72 w-72' : 'h-[28rem] w-[28rem]';

  return (
    <div
      className={`relative ${sizeClass} mx-auto`}
      onPointerMove={handlePointerMove}
    >
      {/* Backdrop glow */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 ${
          state === 'speaking'
            ? 'bg-accent-violet/40 opacity-100'
            : state === 'thinking'
              ? 'bg-accent-cyan/30 opacity-80'
              : state === 'listening'
                ? 'bg-accent-rose/30 opacity-70'
                : 'bg-accent-violet/15 opacity-60'
        }`}
      />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#a78bfa" />
        <Suspense fallback={null}>
          <OrbMesh state={state} mouse={mouseRef.current} />
        </Suspense>
      </Canvas>
    </div>
  );
}

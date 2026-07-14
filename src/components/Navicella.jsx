import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";

function Shipspa() {
  const group = useRef();
  const { scene } = useGLTF("/3D/bridge.glb");

  return <primitive ref={group} object={scene} scale={1} />;
}

function Navicella({ panels = [] }) {
  return (
    <div className="navicella">
      <Canvas camera={{ position: [0, 0, 8], fov: 80 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          <Shipspa />

          {panels.map((p, i) => (
            <Html key={i} position={p.position} distanceFactor={10}>
              {p.content}
            </Html>
          ))}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Navicella;

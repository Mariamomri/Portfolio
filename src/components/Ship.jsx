import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

function Shipspa() {
  const group = useRef();
  const { scene, animations } = useGLTF("/3D/phoenix_bird.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    firstAction?.play();
  }, [actions]);

  return <primitive ref={group} object={scene} scale={1} />;
}

function Ship() {
  return (
    <div className="ship">
      <Canvas camera={{ position: [0, 0, 800], fov: 800 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          <Shipspa />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Ship;

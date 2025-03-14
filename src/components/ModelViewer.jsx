import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { createSampleCube } from '../utils/cadUtils';

function Model({ geometry }) {
  if (!geometry) return null;
  
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={geometry.vertices.length / 3}
          array={geometry.vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={geometry.indices}
          count={geometry.indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

export default function ModelViewer() {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const cubeGeometry = await createSampleCube();
      setGeometry(cubeGeometry);
    };
    
    loadModel();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model geometry={geometry} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { createSampleCube } from '../utils/cadUtils';
import * as THREE from 'three';

function Model({ geometry, onFaceClick }) {
  const { camera, raycaster } = useThree();
  
  const handleClick = useCallback((event) => {
    // Prevent event from propagating to OrbitControls
    event.stopPropagation();
    
    // Get normalized click coordinates
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    
    // Check for intersections
    const intersects = raycaster.intersectObject(event.object, true);
    
    if (intersects.length > 0) {
      const faceIndex = Math.floor(intersects[0].faceIndex / 2); // Divide by 2 because OpenCascade triangulates faces
      onFaceClick(faceIndex);
    }
  }, [camera, raycaster, onFaceClick]);

  if (!geometry) return null;
  
  return (
    <mesh onClick={handleClick}>
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
  const [selectedFace, setSelectedFace] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const cubeGeometry = await createSampleCube();
      setGeometry(cubeGeometry);
    };
    
    loadModel();
  }, []);

  const handleFaceClick = useCallback((faceIndex) => {
    setSelectedFace(faceIndex);
    console.log('Selected face:', faceIndex);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model geometry={geometry} onFaceClick={handleFaceClick} />
        <OrbitControls makeDefault />
      </Canvas>
      {selectedFace !== null && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Selected Face: {selectedFace}
        </div>
      )}
    </div>
  );
}

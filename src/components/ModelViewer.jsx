import { useEffect, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { createSampleCube, getFaceInfo } from '../utils/threeUtils';
import * as THREE from 'three';

function Model({ geometry, onFaceClick, selectedFace }) {
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
      onFaceClick(intersects[0].faceIndex);
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
      <meshStandardMaterial 
        color={selectedFace !== null ? "#4a90e2" : "#808080"}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
}

export default function ModelViewer({ onFaceSelect }) {
  const [geometry, setGeometry] = useState(null);
  const [selectedFace, setSelectedFace] = useState(null);

  useEffect(() => {
    const cubeGeometry = createSampleCube();
    setGeometry(cubeGeometry);
  }, []);

  const handleFaceClick = useCallback((faceIndex) => {
    const faceInfo = getFaceInfo(faceIndex);
    setSelectedFace(faceIndex);
    onFaceSelect?.(faceInfo);
  }, [onFaceSelect]);

  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Model geometry={geometry} onFaceClick={handleFaceClick} selectedFace={selectedFace} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <gridHelper args={[20, 20, '#888888', '#444444']} />
      </Canvas>
      {selectedFace !== null && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'white',
          padding: '12px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px'
        }}>
          {getFaceInfo(selectedFace).name}
        </div>
      )}
    </div>
  );
}

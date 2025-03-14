import { useState, useCallback } from 'react'
import './App.css'
import ModelViewer from './components/ModelViewer'

function App() {
  const [selectedFace, setSelectedFace] = useState(null);

  const handleFaceSelect = useCallback((faceInfo) => {
    console.log('Selected face:', faceInfo);
    setSelectedFace(faceInfo);
  }, []);

  return (
    <div className="app-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>TextCAD</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1' }}>
          <ModelViewer onFaceSelect={handleFaceSelect} />
        </div>
        <div style={{
          width: '300px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>Selected Face Info</h2>
          {selectedFace ? (
            <div>
              <p><strong>Name:</strong> {selectedFace.name}</p>
              <p><strong>ID:</strong> {selectedFace.id}</p>
              <p><strong>Normal:</strong> [{selectedFace.normal.join(', ')}]</p>
            </div>
          ) : (
            <p style={{ color: '#666' }}>Click on a face to view its information</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

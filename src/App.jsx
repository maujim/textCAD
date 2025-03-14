import { useState, useCallback } from 'react'
import './App.css'
import ModelViewer from './components/ModelViewer'
import ChatWindow from './components/ChatWindow'
import ThinkingBox from './components/ThinkingBox'
import RevisionDropdown from './components/RevisionDropdown'

function App() {
  const [reasoning, setReasoning] = useState('');
  const [revisions, setRevisions] = useState([]);
  const [selectedFace, setSelectedFace] = useState(null);

  const handleModelUpdate = useCallback((action, parameters) => {
    // Create a new revision
    const newRevision = {
      action,
      parameters,
      timestamp: new Date().toISOString(),
      description: `${action} on face ${selectedFace}`
    };

    setRevisions(prev => [...prev, newRevision]);
  }, [selectedFace]);

  const handleRevisionSelect = useCallback((revision) => {
    // TODO: Apply the selected revision to the model
    console.log('Selected revision:', revision);
  }, []);

  const handleFaceSelect = useCallback((faceIndex) => {
    setSelectedFace(faceIndex);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ModelViewer onFaceSelect={handleFaceSelect} />
      <RevisionDropdown revisions={revisions} onSelect={handleRevisionSelect} />
      <ThinkingBox reasoning={reasoning} />
      <ChatWindow
        selectedFace={selectedFace}
        onUpdateModel={handleModelUpdate}
        onUpdateReasoning={setReasoning}
      />
    </div>
  )
}

export default App

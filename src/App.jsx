import { useState } from 'react'
import './App.css'
import ModelViewer from './components/ModelViewer'
import ChatWindow from './components/ChatWindow'
import ThinkingBox from './components/ThinkingBox'
import RevisionDropdown from './components/RevisionDropdown'

function App() {
  const [reasoning, setReasoning] = useState('');
  const [revisions, setRevisions] = useState([]);

  const handleRevisionSelect = (revision) => {
    // TODO: Handle revision selection
    console.log('Selected revision:', revision);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ModelViewer />
      <RevisionDropdown revisions={revisions} onSelect={handleRevisionSelect} />
      <ThinkingBox reasoning={reasoning} />
      <ChatWindow />
    </div>
  )
}

export default App

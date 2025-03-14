import { useState, useEffect } from 'react';

export default function ThinkingBox({ reasoning }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reasoning) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [reasoning]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      bottom: '20px',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '15px',
    }}>
      <div style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>AI Reasoning</span>
        <button
          onClick={() => setVisible(false)}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ×
        </button>
      </div>
      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333',
      }}>
        {reasoning}
      </div>
    </div>
  );
}

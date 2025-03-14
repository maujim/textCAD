import { useState } from 'react';

export default function RevisionDropdown({ revisions = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = revision => {
    onSelect?.(revision);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '200px',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Revisions</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {revisions.length === 0 ? (
            <div style={{ padding: '8px', color: '#666', textAlign: 'center' }}>No revisions yet</div>
          ) : (
            revisions.map((revision, index) => (
              <button
                key={index}
                onClick={() => handleSelect(revision)}
                style={{
                  width: '100%',
                  padding: '8px',
                  textAlign: 'left',
                  border: 'none',
                  borderBottom: index < revisions.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '14px' }}>{revision.description}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{new Date(revision.timestamp).toLocaleString()}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

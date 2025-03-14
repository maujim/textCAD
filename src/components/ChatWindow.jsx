import { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    // TODO: Handle AI response
  };

  return (
    <div className="chat-window" style={{
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div className="chat-header" style={{
        padding: '10px',
        borderBottom: '1px solid #eee',
        fontWeight: 'bold',
      }}>
        CAD Assistant
      </div>
      
      <div className="messages" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#007AFF' : '#E9ECEF',
              color: msg.sender === 'user' ? 'white' : 'black',
              padding: '8px 12px',
              borderRadius: '12px',
              maxWidth: '80%',
              wordBreak: 'break-word',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{
        padding: '10px',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '8px',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

import { useState, useCallback } from 'react';
import { processCommand } from '../utils/aiUtils';

export default function ChatWindow({ selectedFace, onUpdateModel, onUpdateReasoning }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (!input.trim() || isProcessing) return;

      const userMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsProcessing(true);

      try {
        const response = await processCommand(input, selectedFace);

        // Update reasoning in ThinkingBox
        onUpdateReasoning?.(response.reasoning);

        // Update the model based on the AI response
        onUpdateModel?.(response.action, response.parameters);

        // Add AI response to chat
        const aiMessage = {
          text: response.reasoning,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        // Add error message to chat
        const errorMessage = {
          text: `Error: ${error.message}`,
          sender: 'system',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsProcessing(false);
      }
    },
    [input, selectedFace, onUpdateModel, onUpdateReasoning, isProcessing],
  );

  return (
    <div
      className="chat-window"
      style={{
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
      }}
    >
      <div
        className="chat-header"
        style={{
          padding: '10px',
          borderBottom: '1px solid #eee',
          fontWeight: 'bold',
        }}
      >
        CAD Assistant
      </div>

      <div
        className="messages"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
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

      <form
        onSubmit={handleSubmit}
        style={{
          padding: '10px',
          borderTop: '1px solid #eee',
          display: 'flex',
          gap: '8px',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
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

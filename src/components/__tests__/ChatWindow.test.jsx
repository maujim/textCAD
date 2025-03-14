import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from '../ChatWindow';

// Mock the AI utils
vi.mock('../../utils/aiUtils', () => ({
  processCommand: vi.fn().mockResolvedValue({
    action: 'add_hole',
    parameters: { radius: 5 },
    reasoning: 'Adding a hole with radius 5'
  })
}));

describe('ChatWindow', () => {
  const mockProps = {
    selectedFace: 1,
    onUpdateModel: vi.fn(),
    onUpdateReasoning: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ChatWindow {...mockProps} />);
    expect(screen.getByPlaceholderText(/Type your message/)).toBeInTheDocument();
  });

  it('handles user input correctly', () => {
    render(<ChatWindow {...mockProps} />);
    const input = screen.getByPlaceholderText(/Type your message/);
    fireEvent.change(input, { target: { value: 'Add a hole' } });
    expect(input.value).toBe('Add a hole');
  });

  it('submits messages and processes AI response', async () => {
    render(<ChatWindow {...mockProps} />);
    
    // Type and submit a message
    const input = screen.getByPlaceholderText(/Type your message/);
    const submitButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Add a hole' } });
    fireEvent.click(submitButton);

    // Check if message appears in chat
    expect(screen.getByText('Add a hole')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(mockProps.onUpdateModel).toHaveBeenCalledWith(
        'add_hole',
        { radius: 5 }
      );
      expect(mockProps.onUpdateReasoning).toHaveBeenCalledWith(
        'Adding a hole with radius 5'
      );
    });
  });

  it('handles errors gracefully', async () => {
    // Mock AI processing to throw an error
    vi.mock('../../utils/aiUtils', () => ({
      processCommand: vi.fn().mockRejectedValue(new Error('API Error'))
    }));

    render(<ChatWindow {...mockProps} />);
    
    const input = screen.getByPlaceholderText(/Type your message/);
    const submitButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Add a hole' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument();
    });
  });
});

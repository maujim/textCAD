import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock the AI utils
vi.mock('../../utils/aiUtils', () => ({
  processCommand: vi.fn()
}));

// Mock OpenCascade.js utils
vi.mock('../../utils/cadUtils', () => ({
  createSampleCube: vi.fn().mockResolvedValue({
    vertices: new Float32Array([0, 0, 0, 1, 1, 1]),
    indices: new Uint32Array([0, 1, 2])
  })
}));

// Mock Three.js and react-three-fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useThree: () => ({
    camera: {},
    raycaster: {
      setFromCamera: vi.fn(),
      intersectObject: () => [{
        faceIndex: 2
      }]
    }
  })
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />
}));

describe('App Integration', () => {
  const mockAIResponse = {
    action: 'add_hole',
    parameters: { radius: 5 },
    reasoning: 'Adding a hole with radius 5'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset AI mock to successful response
    vi.mocked(processCommand).mockResolvedValue(mockAIResponse);
  });

  it('tests complete command flow: face selection → command → model update', async () => {
    render(<App />);

    // 1. Select a face
    const canvas = screen.getByTestId('canvas');
    fireEvent.click(canvas);

    // Verify face selection is displayed
    expect(screen.getByText(/Selected Face:/)).toBeInTheDocument();

    // 2. Enter and submit a command
    const input = screen.getByPlaceholderText(/Type your message/);
    const submitButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Add a hole here' } });
    fireEvent.click(submitButton);

    // 3. Verify command appears in chat
    expect(screen.getByText('Add a hole here')).toBeInTheDocument();

    // 4. Wait for AI response and verify updates
    await waitFor(() => {
      expect(screen.getByText('Adding a hole with radius 5')).toBeInTheDocument();
    });

    // 5. Verify revision is created
    const revisionsButton = screen.getByText('Revisions');
    fireEvent.click(revisionsButton);
    expect(screen.getByText(/add_hole on face/)).toBeInTheDocument();
  });

  it('tests revision history functionality', async () => {
    render(<App />);

    // 1. Make a modification
    const canvas = screen.getByTestId('canvas');
    fireEvent.click(canvas);

    const input = screen.getByPlaceholderText(/Type your message/);
    const submitButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Add a hole here' } });
    fireEvent.click(submitButton);

    // 2. Wait for revision to be created
    await waitFor(() => {
      const revisionsButton = screen.getByText('Revisions');
      fireEvent.click(revisionsButton);
      expect(screen.getByText(/add_hole on face/)).toBeInTheDocument();
    });

    // 3. Select the revision
    fireEvent.click(screen.getByText(/add_hole on face/));

    // 4. Verify model updates (through mock)
    expect(createSampleCube).toHaveBeenCalled();
  });

  it('tests error handling scenarios', async () => {
    // Mock AI processing to fail
    vi.mocked(processCommand).mockRejectedValue(new Error('Invalid modification'));
    
    render(<App />);

    // 1. Select a face
    const canvas = screen.getByTestId('canvas');
    fireEvent.click(canvas);

    // 2. Submit a command that will fail
    const input = screen.getByPlaceholderText(/Type your message/);
    const submitButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Make an impossible modification' } });
    fireEvent.click(submitButton);

    // 3. Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/Error: Invalid modification/)).toBeInTheDocument();
    });
  });

  it('tests user acceptance scenarios with sample commands', async () => {
    const commands = [
      'Add a screw hole',
      'Move this part up',
      'Make this face larger'
    ];

    render(<App />);

    // Select a face
    const canvas = screen.getByTestId('canvas');
    fireEvent.click(canvas);

    // Test each command
    for (const command of commands) {
      const input = screen.getByPlaceholderText(/Type your message/);
      const submitButton = screen.getByText('Send');
      
      fireEvent.change(input, { target: { value: command } });
      fireEvent.click(submitButton);

      // Verify command is processed
      await waitFor(() => {
        expect(processCommand).toHaveBeenCalledWith(command, expect.any(Number));
      });
    }
  });
});

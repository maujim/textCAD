import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModelViewer from '../ModelViewer';

// Mock Three.js and react-three-fiber since they're not compatible with jsdom
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useThree: () => ({
    camera: {},
    raycaster: {
      setFromCamera: vi.fn(),
      intersectObject: () => [
        {
          faceIndex: 2,
        },
      ],
    },
  }),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

describe('ModelViewer', () => {
  it('renders without crashing', () => {
    render(<ModelViewer />);
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('renders orbit controls', () => {
    render(<ModelViewer />);
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument();
  });

  it('displays selected face indicator when a face is selected', () => {
    render(<ModelViewer />);
    const selectedFaceText = screen.queryByText(/Selected Face:/);
    expect(selectedFaceText).toBeNull();

    // Simulate face selection
    const canvas = screen.getByTestId('canvas');
    fireEvent.click(canvas);

    const updatedSelectedFaceText = screen.getByText(/Selected Face:/);
    expect(updatedSelectedFaceText).toBeInTheDocument();
  });
});

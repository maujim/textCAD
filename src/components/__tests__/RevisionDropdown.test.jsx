import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RevisionDropdown from '../RevisionDropdown';

describe('RevisionDropdown', () => {
  const mockRevisions = [
    {
      action: 'add_hole',
      parameters: { radius: 5 },
      timestamp: '2025-03-14T12:00:00Z',
      description: 'add_hole on face 1',
    },
    {
      action: 'extrude',
      parameters: { height: 10 },
      timestamp: '2025-03-14T12:01:00Z',
      description: 'extrude on face 2',
    },
  ];

  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RevisionDropdown revisions={[]} onSelect={mockOnSelect} />);
    expect(screen.getByText('Revisions')).toBeInTheDocument();
  });

  it('shows "No revisions yet" when revisions array is empty', () => {
    render(<RevisionDropdown revisions={[]} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Revisions'));
    expect(screen.getByText('No revisions yet')).toBeInTheDocument();
  });

  it('displays revision list when clicked', () => {
    render(<RevisionDropdown revisions={mockRevisions} onSelect={mockOnSelect} />);

    // Click to open dropdown
    fireEvent.click(screen.getByText('Revisions'));

    // Check if revisions are displayed
    expect(screen.getByText('add_hole on face 1')).toBeInTheDocument();
    expect(screen.getByText('extrude on face 2')).toBeInTheDocument();
  });

  it('calls onSelect when a revision is clicked', () => {
    render(<RevisionDropdown revisions={mockRevisions} onSelect={mockOnSelect} />);

    // Open dropdown and click a revision
    fireEvent.click(screen.getByText('Revisions'));
    fireEvent.click(screen.getByText('add_hole on face 1'));

    expect(mockOnSelect).toHaveBeenCalledWith(mockRevisions[0]);
  });

  it('closes dropdown after selecting a revision', () => {
    render(<RevisionDropdown revisions={mockRevisions} onSelect={mockOnSelect} />);

    // Open dropdown and select a revision
    fireEvent.click(screen.getByText('Revisions'));
    fireEvent.click(screen.getByText('add_hole on face 1'));

    // Check if the dropdown is closed
    expect(screen.queryByText('add_hole on face 1')).not.toBeInTheDocument();
  });

  it('displays timestamps in a readable format', () => {
    render(<RevisionDropdown revisions={mockRevisions} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('Revisions'));

    // Check if timestamps are formatted correctly
    const timestamp = new Date(mockRevisions[0].timestamp).toLocaleString();
    expect(screen.getByText(timestamp)).toBeInTheDocument();
  });
});

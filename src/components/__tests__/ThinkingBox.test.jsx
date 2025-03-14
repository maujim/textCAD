import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThinkingBox from '../ThinkingBox';

describe('ThinkingBox', () => {
  it('renders nothing when no reasoning is provided', () => {
    render(<ThinkingBox reasoning="" />);
    const box = screen.queryByText('AI Reasoning');
    expect(box).not.toBeInTheDocument();
  });

  it('renders with reasoning text', () => {
    const reasoning = 'Adding a hole to the selected face';
    render(<ThinkingBox reasoning={reasoning} />);
    
    expect(screen.getByText('AI Reasoning')).toBeInTheDocument();
    expect(screen.getByText(reasoning)).toBeInTheDocument();
  });

  it('can be closed', () => {
    const reasoning = 'Adding a hole to the selected face';
    render(<ThinkingBox reasoning={reasoning} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('AI Reasoning')).not.toBeInTheDocument();
  });

  it('handles long text with scrolling', () => {
    const longReasoning = 'A'.repeat(1000); // Long text that should trigger scrolling
    render(<ThinkingBox reasoning={longReasoning} />);
    
    const textContainer = screen.getByText(longReasoning).parentElement;
    expect(textContainer).toHaveStyle({ maxHeight: '200px', overflowY: 'auto' });
  });

  it('updates when reasoning changes', () => {
    const { rerender } = render(<ThinkingBox reasoning="Initial reasoning" />);
    expect(screen.getByText('Initial reasoning')).toBeInTheDocument();
    
    rerender(<ThinkingBox reasoning="Updated reasoning" />);
    expect(screen.getByText('Updated reasoning')).toBeInTheDocument();
  });
});

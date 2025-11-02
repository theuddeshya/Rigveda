import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../src/components/layout/Sidebar';

// Mock verse data
const mockVerses = [
  { id: 'RV.1.1.1', mandala: 1, sukta: 1, verse: 1, metadata: { deity: { primary: 'Agni' } } },
  { id: 'RV.1.1.2', mandala: 1, sukta: 1, verse: 2, metadata: { deity: { primary: 'Agni' } } },
  { id: 'RV.2.1.1', mandala: 2, sukta: 1, verse: 1, metadata: { deity: { primary: 'Indra' } } },
];

// Mock the data and store
vi.mock('../src/hooks/useVerses', () => ({
  useVerses: vi.fn(() => ({
    verses: mockVerses,
    loading: false,
    error: null,
  })),
}));

vi.mock('../src/store/uiStore', () => ({
  useUIStore: vi.fn(() => ({
    sidebarOpen: true,
    setSidebarOpen: vi.fn(),
  })),
}));

// Mock verseLoader to prevent loading real JSON files
vi.mock('../src/utils/verseLoader', () => ({
  loadMandala: vi.fn((mandalaNumber: number) => {
    // Return only verses for the requested mandala from mock data
    const verses = mockVerses.filter(v => v.mandala === mandalaNumber);
    return Promise.resolve(verses);
  }),
  loadVerses: vi.fn(() => Promise.resolve(mockVerses)),
}));

// Wrap component with router for Link components (use MemoryRouter in tests)
const SidebarWithRouter = () => (
  <MemoryRouter>
    <Sidebar />
  </MemoryRouter>
);

describe('Sidebar', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Reset hash
    window.location.hash = '';
  });

  it('opens correct mandala and sukta from URL hash', () => {
    // Set URL with verse hash (ensure leading #)
    window.location.hash = '#verse-RV.2.1.1';

    render(<SidebarWithRouter />);

    // Mandala 2 and its sukta should be visible
    expect(screen.getByText('Mandala 2')).toBeInTheDocument();
    expect(screen.getByText('RV.2.1.1 — Indra')).toBeInTheDocument();
  });

  it('supports keyboard navigation between mandala buttons', () => {
    render(<SidebarWithRouter />);
  const mandala1 = screen.getByText('Mandala 1').closest('button');
  const mandala2 = screen.getByText('Mandala 2').closest('button');

    if (!mandala1 || !mandala2) throw new Error('Mandala buttons not found');

    // Start with focus on first mandala
    mandala1.focus();
    expect(document.activeElement).toBe(mandala1);

    // Arrow down should move to next mandala
    fireEvent.keyDown(mandala1, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(mandala2);

    // Arrow up should move back
    fireEvent.keyDown(mandala2, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(mandala1);
  });

  it('opens/closes mandalas with Enter/Space', async () => {
    render(<SidebarWithRouter />);
    const mandala1 = screen.getByText('Mandala 1').closest('button');
    if (!mandala1) throw new Error('Mandala 1 button not found');

    // Start closed
    expect(screen.queryByText('Sukta 1')).not.toBeInTheDocument();

    // Press Enter to open
    mandala1.focus();
    fireEvent.keyDown(mandala1, { key: 'Enter' });

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Sukta 1')).toBeInTheDocument();
    });

    // Press Space to close
    fireEvent.keyDown(mandala1, { key: ' ', code: 'Space' });
    await waitFor(() => {
      expect(screen.queryByText('Sukta 1')).not.toBeInTheDocument();
    });
  });
});
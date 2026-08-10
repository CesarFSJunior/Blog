import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from '@/components/drop_down/page';
import { EstadoProvider, useEstadoGlobal } from '@/components/state_provider/page';

const mockPathname = { current: '/' };

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname.current,
}));

// Test-only helper to drive the shared `valor` state from outside DropDown,
// the same way Header's menu-toggle would in the real app.
function OpenMenuButton() {
  const { setValor } = useEstadoGlobal();
  return <button onClick={() => setValor(true)}>open menu</button>;
}

function renderDropDown() {
  return render(
    <EstadoProvider>
      <OpenMenuButton />
      <DropDown />
    </EstadoProvider>
  );
}

describe('DropDown', () => {
  beforeEach(() => {
    mockPathname.current = '/';
  });

  it('starts closed', () => {
    renderDropDown();

    expect(screen.getByTestId('dropdown-menu')).toHaveClass('opacity-0');
  });

  it('stays open when re-rendered with the same pathname', () => {
    const { rerender } = renderDropDown();

    fireEvent.click(screen.getByText('open menu'));
    expect(screen.getByTestId('dropdown-menu')).toHaveClass('opacity-100');

    rerender(
      <EstadoProvider>
        <OpenMenuButton />
        <DropDown />
      </EstadoProvider>
    );

    expect(screen.getByTestId('dropdown-menu')).toHaveClass('opacity-100');
  });

  it('closes when the pathname changes', () => {
    const { rerender } = renderDropDown();

    fireEvent.click(screen.getByText('open menu'));
    expect(screen.getByTestId('dropdown-menu')).toHaveClass('opacity-100');

    mockPathname.current = '/about';
    rerender(
      <EstadoProvider>
        <OpenMenuButton />
        <DropDown />
      </EstadoProvider>
    );

    expect(screen.getByTestId('dropdown-menu')).toHaveClass('opacity-0');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react'; // Импортируем useState из React
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

// Обертка для тестирования контролируемого инпута
const ControlledInputWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      placeholder="Search..." 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
};

describe('Input', () => {
  it('отображает плейсхолдер и вводимый текст', async () => {
    const user = userEvent.setup();
    render(<ControlledInputWrapper />);
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('вызывает onClear при клике на крестик', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Input value="test" onClear={onClear} onChange={() => {}} />);
    
    const clearBtn = screen.getByRole('button');
    await user.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './index';
import { useMovieStore } from '../../entities/movie/store';

// Мокаем хук API, чтобы он не делал реальных запросов
vi.mock('../../entities/movie/api', () => ({
  useAnimeSearch: () => ({ data: null, isLoading: false }),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    useMovieStore.setState({ searchQuery: '', filter: 'all', theme: 'dark' });
  });

  it('обновляет поисковый запрос при нажатии Enter', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    const input = screen.getByPlaceholderText('Search anime...');
    await user.type(input, 'Bleach{enter}');
    
    expect(useMovieStore.getState().searchQuery).toBe('Bleach');
  });

  it('меняет фильтр при клике на таб', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    const moviesTab = screen.getByRole('button', { name: /movies/i });
    await user.click(moviesTab);
    
    expect(useMovieStore.getState().filter).toBe('movie');
  });
});

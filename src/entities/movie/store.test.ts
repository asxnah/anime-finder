import { describe, it, expect, beforeEach } from 'vitest';
import { useMovieStore } from './store';

describe('Movie Store', () => {
  beforeEach(() => {
    useMovieStore.setState({
      searchQuery: '',
      filter: 'all',
      theme: 'dark',
      isScrolled: false,
    });
  });

  it('переключает тему', () => {
    expect(useMovieStore.getState().theme).toBe('dark');
    useMovieStore.getState().toggleTheme();
    expect(useMovieStore.getState().theme).toBe('light');
  });

  it('меняет фильтр', () => {
    useMovieStore.getState().setFilter('movie');
    expect(useMovieStore.getState().filter).toBe('movie');
  });

  it('обновляет поисковый запрос', () => {
    useMovieStore.getState().setSearchQuery('Naruto');
    expect(useMovieStore.getState().searchQuery).toBe('Naruto');
  });
});

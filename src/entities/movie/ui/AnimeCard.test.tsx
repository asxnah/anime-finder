import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimeCard } from './AnimeCard';
import { type AniListMedia } from '../model';

const mockAnime: AniListMedia = {
  id: 1,
  title: { romaji: 'Naruto', english: 'Naruto', native: 'ナルト' },
  coverImage: { extraLarge: 'test-image.jpg' },
  averageScore: 85,
  startDate: { year: 2002 },
  description: 'A story about a ninja.',
  genres: ['Action', 'Adventure', 'Comedy', 'Drama'],
  format: 'TV',
  episodes: 220,
  duration: 23,
  status: 'FINISHED',
  studios: { nodes: [{ name: 'Pierrot' }] },
};

describe('AnimeCard', () => {
  it('рендерит заголовок, год и рейтинг', () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />);
    
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('2002')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('вызывает onClick при клике на карточку', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AnimeCard anime={mockAnime} onClick={handleClick} />);
    
    // Кликаем по заголовку, так как он находится внутри кликабельного контейнера
    await user.click(screen.getByText('Naruto'));
    expect(handleClick).toHaveBeenCalledWith(mockAnime);
  });
});

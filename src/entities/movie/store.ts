import { create } from 'zustand';

export type FilterType = 'all' | 'movie' | 'tv';

interface MovieStore {
  searchQuery: string;
  filter: FilterType;
  theme: 'dark' | 'light';
  isScrolled: boolean;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: FilterType) => void;
  toggleTheme: () => void;
  setIsScrolled: (isScrolled: boolean) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  searchQuery: '',
  filter: 'all',
  theme: 'dark',
  isScrolled: false,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilter: (filter) => set({ filter }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setIsScrolled: (isScrolled) => set({ isScrolled }),
}));

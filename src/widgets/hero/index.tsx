import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui/Input';
import { useMovieStore, type FilterType } from '@/entities/movie/store';
import { Button } from '@/shared/ui/Button';
import { useDebounce } from '@/shared/lib/useDebounce';
import clsx from 'clsx';

export const Hero = () => {
  const { searchQuery, setSearchQuery, filter, setFilter, theme, isScrolled } = useMovieStore();
  const isDark = theme === 'dark';

  // Локальный стейт для инпута
  const [inputValue, setInputValue] = useState(searchQuery);

  // Дебаунсим значение (задержка 500мс)
  const debouncedSearch = useDebounce(inputValue, 500);

  // Синхронизируем дебаунс с глобальным стейтом
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearch = () => setSearchQuery(inputValue);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };
  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
  };

  const tabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'movie', label: 'Movies' },
    { id: 'tv', label: 'Series' },
  ];

  return (
    <div
      className="grid items-center w-full max-w-[1200px] mx-auto px-6 relative z-10 transition-all duration-500 ease-in-out"
      style={{
        gridTemplateColumns: isScrolled
          ? 'minmax(0, 0fr) minmax(0, 1fr)'
          : 'minmax(0, 5fr) minmax(0, 7fr)',
        gap: isScrolled ? '0px' : '32px',
        paddingTop: isScrolled ? '32px' : '40px',
        paddingBottom: isScrolled ? '32px' : '40px',
      }}
    >
      <div
        className={clsx(
          'transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap',
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'
        )}
      >
        <h1
          className={clsx(
            'text-[52px] font-bold leading-[1.1] transition-colors',
            isDark ? 'text-[#F3F4F6]' : 'text-[#1f1f2d]'
          )}
        >
          Find your next <br />
          favorite{' '}
          <span className="text-primary inline-flex items-center gap-2">
            anime
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-2">
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="#B399F3"
              />
              <path
                d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z"
                fill="#B399F3"
              />
            </svg>
          </span>
        </h1>
        <p
          className={clsx(
            'mt-5 text-[17px] leading-relaxed transition-colors',
            isDark ? 'text-[#9CA3AF]' : 'text-gray-600'
          )}
        >
          Search movies and anime, explore details,
          <br /> and discover something new
        </p>
      </div>

      <div
        className={clsx(
          'w-full flex flex-col transition-all duration-500 ease-in-out',
          isScrolled ? 'max-w-[800px] mx-auto' : 'max-w-full'
        )}
      >
        <div className="flex gap-3 w-full">
          <Input
            placeholder="Search anime..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
          />
          <Button onClick={handleSearch} className="h-[52px] px-8 shrink-0 rounded-[16px]">
            Search
          </Button>
        </div>

        <div
          className={clsx(
            'flex gap-2 transition-all duration-500 ease-in-out overflow-hidden',
            isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-[50px] opacity-100 mt-5'
          )}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={clsx(
                'inline-flex items-center justify-center h-[38px] pt-[2px] px-6 rounded-full text-[13px] font-medium leading-none transition-colors border',
                filter === tab.id
                  ? isDark
                    ? 'bg-[#B399F3] text-[#1f1f2d] border-transparent'
                    : 'bg-[#C9B5FF] text-[#1f1f2d] border-transparent'
                  : isDark
                    ? 'bg-[#34334A] text-white border-[#34334A] hover:bg-[#3D3A54]'
                    : 'bg-[#EBE5FF] text-[#1f1f2d] border-[#EBE5FF] hover:bg-[#DCD1F7]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

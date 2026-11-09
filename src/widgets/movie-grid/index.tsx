import { useRef, useState, useEffect, useCallback } from 'react';
import { useAnimeSearch } from '../../entities/movie/api';
import { AnimeCard } from '../../entities/movie/ui/AnimeCard';
import { SkeletonCard } from '../../shared/ui/Skeleton';
import { type AniListMedia } from '../../entities/movie/model';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { useMovieStore } from '../../entities/movie/store';

interface Props {
  onSelectAnime: (anime: AniListMedia) => void;
}

export const MovieGrid = ({ onSelectAnime }: Props) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useAnimeSearch();
  const { isScrolled, setIsScrolled } = useMovieStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    if (scrollTop > 40 && !isScrolled) setIsScrolled(true);
    if (scrollTop <= 40 && isScrolled) setIsScrolled(false);

    setShowTopFade(scrollTop > 10);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 10);
  }, [isScrolled, setIsScrolled]);

  useEffect(() => {
    handleScroll();
  }, [data, handleScroll]);

  if (isError) return <div className="text-center py-20 text-red-400">Failed to load data.</div>;
  
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const animeList = data?.pages.flatMap((page) => page.media) || [];
  if (animeList.length === 0) return <div className="text-center py-20 text-text-muted">No results found.</div>;

  // Используем rgba(0,0,0,0.15) для 15% видимости вместо 0% (transparent)
  const fadeOpacity = 'rgba(0, 0, 0, 0.15)';
  const maskTop = showTopFade ? fadeOpacity : 'black';
  const maskBottom = showBottomFade ? fadeOpacity : 'black';
  
  const fadeSize = '80px';
  const maskImage = `linear-gradient(to bottom, ${maskTop} 0%, black ${fadeSize}, black calc(100% - ${fadeSize}), ${maskBottom} 100%)`;

  return (
    <div className="flex flex-col h-full relative">
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pr-2 pb-6"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} onClick={onSelectAnime} />
          ))}
        </div>
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-4 shrink-0 z-20 relative">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="px-24 gap-3">
            <RefreshCw size={20} className={isFetchingNextPage ? "animate-spin" : ""} />
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};

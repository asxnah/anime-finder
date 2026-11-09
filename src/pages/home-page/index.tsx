import { useState, useEffect, useMemo } from 'react';
import { Header } from '../../widgets/header';
import { Hero } from '../../widgets/hero';
import { MovieGrid } from '../../widgets/movie-grid';
import { MovieDetails } from '../../widgets/movie-details';
import { type AniListMedia } from '../../entities/movie/model';
import { useMovieStore } from '../../entities/movie/store';
import clsx from 'clsx';

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  isSparkle: boolean;
}

export const HomePage = () => {
  const [selectedAnime, setSelectedAnime] = useState<AniListMedia | null>(null);
  const { theme } = useMovieStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }
  }, [isDark]);

  const stars = useMemo<StarData[]>(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      const size = Math.random() * 19 + 1;
      const isSparkle = size > 6;

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: Math.random() * 0.6 + 0.2,
        isSparkle,
      };
    });
  }, []);

  const bgStyle = isDark ? {
    backgroundColor: '#1A192A',
    backgroundImage: `
      radial-gradient(ellipse at 50% 0%, #171626 0%, transparent 40%),
      radial-gradient(ellipse at 50% 100%, #232039 0%, transparent 40%),
      radial-gradient(ellipse at 0% 0%, #332D53 0%, transparent 45%),
      radial-gradient(ellipse at 0% 50%, #2B2746 0%, transparent 40%),
      radial-gradient(ellipse at 0% 100%, #514183 0%, transparent 45%),
      radial-gradient(ellipse at 100% 0%, #27233F 0%, transparent 45%),
      radial-gradient(ellipse at 100% 50%, #231F3A 0%, transparent 40%),
      radial-gradient(ellipse at 100% 100%, #1E1A31 0%, transparent 45%)
    `
  } : {};

  return (
    <div 
      className={clsx("h-screen flex flex-col relative overflow-hidden transition-colors duration-500", !isDark && "bg-[#F9F8FC]")}
      style={bgStyle}
    >
      
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 70%)'
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          >
            {star.isSparkle ? (
              <svg 
                className={clsx("w-full h-full", isDark ? "text-[#B399F3]" : "text-[#C9B5FF]")} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
              </svg>
            ) : (
              <div className={clsx("w-full h-full rounded-full", isDark ? "bg-white" : "bg-[#B399F3]")} />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <Hero />
        
        {/* main занимает остаток экрана, без скролла. Добавлен pb-8 для отступа снизу */}
        <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pb-8 flex flex-col overflow-hidden">
          <MovieGrid onSelectAnime={setSelectedAnime} />
        </main>

        <MovieDetails 
          anime={selectedAnime} 
          onClose={() => setSelectedAnime(null)} 
        />
      </div>
    </div>
  );
};

import { memo } from 'react';
import { Star } from 'lucide-react';
import { type AniListMedia } from '../model';
import { useMovieStore } from '../store';
import clsx from 'clsx';

interface Props {
  anime: AniListMedia;
  onClick: (anime: AniListMedia) => void;
}

export const AnimeCard = memo(({ anime, onClick }: Props) => {
  const { theme } = useMovieStore();
  const isDark = theme === 'dark';

  const displayTitle = anime.title.english || anime.title.romaji;
  
  const cleanDescription = anime.description 
    ? anime.description.replace(/<[^>]*>?/gm, '')
    : 'No description available.';

  return (
    <div 
      onClick={() => onClick(anime)}
      className={clsx(
        "group rounded-2xl overflow-hidden transition-colors cursor-pointer flex flex-col h-full border",
        isDark 
          ? "bg-[#1A192A] border-[#34334A] hover:border-[#B399F3]/50" 
          : "bg-white border-gray-200 hover:border-[#B399F3]/50 shadow-sm"
      )}
    >
      <div className={clsx("relative w-full h-[230px] shrink-0 overflow-hidden", isDark ? "bg-[#1C2030]" : "bg-gray-100")}>
        <img 
          src={anime.coverImage.extraLarge} 
          alt={displayTitle} 
          loading="lazy" // <--- СЕНЬОРСКАЯ ОПТИМИЗАЦИЯ
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-t via-transparent to-transparent", 
          isDark ? "from-[#1A192A]" : "from-white"
        )} />
        
        {anime.averageScore && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold text-white">
            <Star size={12} className="text-[#FBBF24] fill-[#FBBF24]" />
            {(anime.averageScore / 10).toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className={clsx("font-bold text-[16px] leading-[1.3] line-clamp-2 mb-1 transition-colors", isDark ? "text-[#F3F4F6] group-hover:text-[#B399F3]" : "text-gray-900 group-hover:text-[#B399F3]")}>
          {displayTitle}
        </h3>
        
        <span className={clsx("text-[13px] mb-2 shrink-0", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>
          {anime.startDate?.year || 'Unknown year'}
        </span>
        
        <p className={clsx("text-[13px] leading-relaxed line-clamp-3 mb-auto", isDark ? "text-[#9CA3AF]" : "text-gray-600")}>
          {cleanDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-4 shrink-0">
          {anime.genres.slice(0, 3).map((genre) => (
            <span 
              key={genre} 
              className={clsx(
                "px-3 py-1 rounded-full text-[11px] font-medium border",
                isDark 
                  ? "bg-[#1f1f2d] border-[#34334A] text-[#9CA3AF]" 
                  : "bg-gray-50 border-gray-200 text-gray-600"
              )}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

AnimeCard.displayName = 'AnimeCard'; // Хороший тон для React DevTools

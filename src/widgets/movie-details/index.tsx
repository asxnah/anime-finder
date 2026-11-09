import * as Dialog from '@radix-ui/react-dialog';
import { Star, Calendar, X, User, Users } from 'lucide-react';
// Используем алиасы @/ для чистоты импортов
import { type AniListMedia } from '@/entities/movie/model';
import { useMovieStore } from '@/entities/movie/store';
import clsx from 'clsx';

interface Props {
  anime: AniListMedia | null;
  onClose: () => void;
}

export const MovieDetails = ({ anime, onClose }: Props) => {
  const { theme } = useMovieStore();
  const isDark = theme === 'dark';

  if (!anime) return null;

  const displayTitle = anime.title.english || anime.title.romaji;
  const studio = anime.studios.nodes[0]?.name || 'Unknown Studio';
  const duration = anime.duration ? `${anime.duration} min` : 'Unknown';
  const metaText = `${anime.startDate?.year || 'Unknown year'} • ${anime.episodes ? `${anime.episodes} eps • ` : ''}${duration}`;

  const cleanDescription = anime.description 
    ? anime.description.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>?/gm, '')
    : 'No description available.';

  return (
    <Dialog.Root open={!!anime} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" />
        
        <Dialog.Content className={clsx(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl flex flex-col md:flex-row shadow-2xl focus:outline-none border transition-colors",
          isDark ? "bg-[#151924] border-[#232B3D]" : "bg-white border-gray-200"
        )}>
          
          <Dialog.Close asChild>
            <button className={clsx("absolute top-4 right-4 p-2 z-50 transition-colors rounded-full backdrop-blur-md", isDark ? "text-[#9CA3AF] hover:text-[#F3F4F6] bg-[#151924]/50 hover:bg-[#151924]" : "text-gray-500 hover:text-gray-900 bg-white/50 hover:bg-white")}>
              <X size={20} />
            </button>
          </Dialog.Close>

          <div className="w-full md:w-[320px] shrink-0 p-6 md:p-8">
            <img 
              src={anime.coverImage.extraLarge} 
              alt={displayTitle} 
              loading="lazy" // <--- СЕНЬОРСКАЯ ОПТИМИЗАЦИЯ
              className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="flex-1 flex flex-col p-6 md:p-8 md:pl-0 overflow-y-auto">
            <Dialog.Title className={clsx("text-2xl font-bold mb-2 pr-8 transition-colors", isDark ? "text-[#F3F4F6]" : "text-gray-900")}>
              {displayTitle}
            </Dialog.Title>
            
            <div className={clsx("text-sm mb-4", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>
              {metaText}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-[#FBBF24] fill-[#FBBF24]" />
              <span className={clsx("text-lg font-bold", isDark ? "text-[#F3F4F6]" : "text-gray-900")}>
                {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : '?'}/10
              </span>
              <span className={clsx("text-xs ml-1", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>(AniList rating)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <span key={genre} className={clsx(
                  "px-3 py-1 border rounded-full text-xs font-medium",
                  isDark ? "bg-[#1C2030] border-[#232B3D] text-[#9CA3AF]" : "bg-gray-100 border-gray-200 text-gray-700"
                )}>
                  {genre}
                </span>
              ))}
            </div>

            <Dialog.Description className={clsx("text-sm leading-relaxed mb-6", isDark ? "text-[#9CA3AF]" : "text-gray-600")}>
              {cleanDescription}
            </Dialog.Description>

            <div className={clsx("w-full h-px mb-6 shrink-0", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />

            <div className="flex flex-col gap-4 pb-2">
              <div className="flex items-start gap-3">
                <Calendar size={18} className={clsx("mt-0.5 shrink-0", isDark ? "text-[#9CA3AF]" : "text-gray-400")} />
                <div>
                  <p className={clsx("text-xs mb-0.5", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>Release Date</p>
                  <p className={clsx("text-sm font-medium", isDark ? "text-[#F3F4F6]" : "text-gray-900")}>{anime.startDate?.year || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User size={18} className={clsx("mt-0.5 shrink-0", isDark ? "text-[#9CA3AF]" : "text-gray-400")} />
                <div>
                  <p className={clsx("text-xs mb-0.5", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>Studio</p>
                  <p className={clsx("text-sm font-medium", isDark ? "text-[#F3F4F6]" : "text-gray-900")}>{studio}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={18} className={clsx("mt-0.5 shrink-0", isDark ? "text-[#9CA3AF]" : "text-gray-400")} />
                <div>
                  <p className={clsx("text-xs mb-0.5", isDark ? "text-[#9CA3AF]" : "text-gray-500")}>Format</p>
                  <p className={clsx("text-sm font-medium", isDark ? "text-[#F3F4F6]" : "text-gray-900")}>{anime.format || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import { useMovieStore } from '../../entities/movie/store';
import clsx from 'clsx';

export const SkeletonCard = () => {
  const { theme } = useMovieStore();
  const isDark = theme === 'dark';

  return (
    <div className={clsx(
      "border rounded-2xl overflow-hidden animate-pulse flex flex-col h-[420px]",
      isDark ? "bg-[#1C1B2A] border-[#34334A]" : "bg-white border-gray-200"
    )}>
      <div className={clsx("w-full h-[230px] shrink-0", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
      
      <div className="p-4 flex flex-col flex-1">
        <div className={clsx("h-[38px] rounded w-full mb-1 shrink-0", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
        <div className={clsx("h-[16px] rounded w-1/4 mb-2 shrink-0", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
        
        <div className="flex flex-col gap-1.5 mb-3">
          <div className={clsx("h-[10px] rounded w-full", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
          <div className={clsx("h-[10px] rounded w-4/5", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
        </div>
        
        <div className="flex gap-1.5 mt-auto shrink-0">
          <div className={clsx("h-[24px] rounded-full w-14", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
          <div className={clsx("h-[24px] rounded-full w-14", isDark ? "bg-[#232B3D]" : "bg-gray-200")} />
        </div>
      </div>
    </div>
  );
};

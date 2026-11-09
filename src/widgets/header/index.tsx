import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useMovieStore } from "../../entities/movie/store";

export const Header = () => {
  const { theme, toggleTheme } = useMovieStore();
  const isDark = theme === "dark";

  return (
    <header className="flex items-center justify-between py-6 max-w-[1200px] mx-auto w-full px-6 relative z-10">
      <div className="flex items-center gap-3 cursor-pointer">
        <svg
          width="30"
          height="30"
          viewBox="0 -0.5 17 17"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-[#A78BFA] fill-current"
        >
          <g transform="translate(1.000000, 0.000000)">
            <path d="M1.042,7.954 L15.958,4.431 L14.978,0.375 L0.063,3.898 L1.042,7.954 L1.042,7.954 Z M12.55,4.357 L11.102,2.045 L13.112,1.559 L14.561,3.871 L12.55,4.357 L12.55,4.357 Z M9.199,5.167 L7.75,2.855 L9.759,2.37 L11.209,4.682 L9.199,5.167 L9.199,5.167 Z M5.848,5.977 L4.4,3.665 L6.41,3.18 L7.859,5.492 L5.848,5.977 L5.848,5.977 Z M2.498,6.787 L1.049,4.475 L3.058,3.99 L4.507,6.302 L2.498,6.787 L2.498,6.787 Z" />
            <path d="M1.021,8.037 L16,8.037 L16,15.987 L1.021,15.987 L1.021,8.037 L1.021,8.037 Z" />
          </g>
        </svg>
        <span
          className={clsx(
            "text-[18px] font-medium tracking-normal transition-colors",
            isDark ? "text-white" : "text-[#1f1f2d]",
          )}
        >
          AnimeFinder
        </span>
      </div>

      {/* Ширина уменьшена до 64px, ход ползунка 32px */}
      <button
        onClick={toggleTheme}
        className={clsx(
          "relative flex items-center w-[64px] h-[32px] p-1 rounded-full transition-colors focus-visible:outline-none border-none",
          isDark
            ? "bg-[#34334A] hover:bg-[#3D3A54]"
            : "bg-[#E2E1E8] hover:bg-[#D4D4DB]",
        )}
      >
        <Sun
          size={16}
          className={clsx(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-colors",
            isDark ? "text-white/40" : "text-[#1f1f2d]",
          )}
        />
        <Moon
          size={16}
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-colors",
            isDark ? "text-white" : "text-[#1f1f2d]/40",
          )}
        />

        <div
          className={clsx(
            "absolute top-1 left-1 w-6 h-6 rounded-full shadow-sm transition-transform duration-300 ease-in-out z-0",
            isDark
              ? "bg-[#5B587A] translate-x-[32px]"
              : "bg-white translate-x-0",
          )}
        />
      </button>
    </header>
  );
};

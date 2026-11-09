import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMovieStore } from '../../entities/movie/store';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, ...props }, ref) => {
    const { theme } = useMovieStore();
    const isDark = theme === 'dark';

    return (
      <button
        ref={ref}
        className={twMerge(
          'inline-flex items-center justify-center shrink-0 h-[46px] text-[15px] font-medium rounded-[16px] transition-colors border-none px-6',
          isDark 
            ? 'bg-[#B399F3] text-[#1f1f2d] hover:bg-[#A78BFA]' 
            : 'bg-[#DCD1F7] text-[#1f1f2d] hover:bg-[#C9B5FF]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Search, X } from 'lucide-react';
import { useMovieStore } from '../../entities/movie/store';
import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, onClear, ...props }, ref) => {
    const { theme } = useMovieStore();
    const isDark = theme === 'dark';

    return (
      <div className="relative w-full flex items-center">
        <Search className={clsx("absolute left-4 z-10", isDark ? "text-[#9CA3AF]" : "text-gray-500")} size={20} />
        <input
          ref={ref}
          className={twMerge(
            'w-full h-[52px] text-[15px] rounded-[16px] pl-12 pr-12 focus:outline-none transition-all',
            // Добавили красивый outline (ring) для фокуса
            'focus:ring-2 focus:ring-[#B399F3] focus:ring-offset-2',
            isDark 
              ? 'text-white placeholder:text-[#9CA3AF] focus:ring-offset-[#1A192A]' 
              : 'text-gray-900 placeholder:text-gray-500 focus:ring-offset-[#F9F8FC]',
            className
          )}
          style={{
            border: '1px solid transparent',
            background: isDark 
              ? 'linear-gradient(#34334A, #34334A) padding-box, linear-gradient(to top right, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.25) 100%) border-box'
              : 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to top right, rgba(179, 153, 243, 0.1) 0%, rgba(179, 153, 243, 0.5) 100%) border-box'
          }}
          {...props}
        />
        {props.value && onClear && (
          <button 
            type="button" 
            onClick={onClear} 
            className={clsx("absolute right-4 p-1 rounded-full transition-colors z-10", isDark ? "text-[#9CA3AF] hover:text-white" : "text-gray-500 hover:text-gray-900")}
          >
            <X size={18} />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
